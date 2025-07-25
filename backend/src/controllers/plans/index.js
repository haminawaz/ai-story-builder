const Stripe = require("stripe");
const Plan = require("../../models/plans/model");
const Payment = require("../../models/payment/model");
const Subscription = require("../../models/subscription/model");
const User = require("../../models/users/model");
const { configurations } = require("../../configs/config");
const { sendMail } = require("../../utils/send-mail");
const { checkoutSuccessEmail } = require("../../data/emails");

const stripe = Stripe(configurations.stripeSecretKey);

const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ price: 1 });
    if (plans.length === 0) {
      return res.status(404).json({
        message: "No plans found",
        response: null,
        error: "No plans found",
      });
    }

    return res.status(200).json({
      message: "All plans fetched successfully",
      response: plans,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      response: null,
      error: error.message,
    });
  }
};

const createCheckout = async (req, res) => {
  const { id: userId, email } = req.decoded;
  const { planId } = req.body;

  const plan = await Plan.findById(planId);
  if (!plan) {
    return res.status(404).json({
      message: "Plan not found",
      data: null,
      error: "Plan not found",
    });
  }
  
  const existingSubscription = await Subscription.findOne({
    userId,
    expiryDate: { $gte: new Date() },
    status: "paid",
  });
  if (existingSubscription) {
    return res.status(409).json({
      message: "You already have an active subscription",
      data: null,
      error: "You already have an active subscription",
    });
  }

  const amount = plan.price;
  const billingCycle = plan.billingCycle
  
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  let expiryDate = new Date(startDate);
  if (billingCycle === 'monthly') {
    expiryDate?.setDate(expiryDate.getDate() + 30);
  } else if (billingCycle === 'yearly') {
    expiryDate?.setFullYear(expiryDate.getFullYear() + 1);
  }

  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: plan.name + " - " + plan.type,
        },
        unit_amount: Math.round(amount * 100),
      },
      quantity: 1,
    },
  ];
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    customer_email: email,
    metadata: {
      userId: userId,
      planId: plan._id.toString(),
      startDate: startDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    },
    success_url: `${configurations.frontendBaseUrl}/plans?success=true`,
    cancel_url: `${configurations.frontendBaseUrl}/plans?success=false`,
  });

  const data = { id: session.id };
  return res.status(200).json({
    message: "Cards has been retrieved successfully",
    data: data,
    error: null,
  });
};

const checkoutComplete = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const body = req.body;

  if (!sig) {
    console.log("No stripe-signature header value was provided.");
    return res
      .status(400)
      .send("No stripe-signature header value was provided.");
  }

  try {
    if (body.type === "checkout.session.completed") {
      const transactionId = body.data.object.id;
      const dateCreated = new Date(body.data.object.created * 1000);

      const existingTransaction = await Payment.findOne({ transactionId });
      if (existingTransaction) {
        return res.status(409).json({
          message: "Transaction already processed",
          data: null,
          error: "Transaction already processed",
        });
      }

      const session = await stripe.checkout.sessions.retrieve(transactionId, {
        expand: ["line_items"],
      });

      const { userId, planId, startDate, expiryDate } =
        session.metadata;

      const amount = session.amount_total / 100;
      const status = session.payment_status;

      const payment = await Payment.create({
        userId,
        transactionId,
        amount,
        status,
        dateCreated,
      });

      const existingSubscription = await Subscription.findOne({ userId });
      if(!existingSubscription){
        await Subscription.create({
          userId,
          planId,
          paymentId: payment._id,
          startDate: new Date(startDate),
          expiryDate: new Date(expiryDate),
          status,
        });
      } else {
        existingSubscription.planId = planId;
        existingSubscription.paymentId = payment._id;
        existingSubscription.startDate = new Date(startDate);
        existingSubscription.expiryDate = new Date(expiryDate);
        existingSubscription.status = status;
        await existingSubscription.save();
      }

      const user = await User.findById(userId);
      const email = user.email;

      const plan = await Plan.findById(planId);
      const planName = plan.name + " - " + plan.type;

      const dynamicData = {
        subject: "Plan activated successfully",
        to_email: email,
      };
      const emailTemplate = await checkoutSuccessEmail(planName, startDate, expiryDate);
      await sendMail(emailTemplate, dynamicData);

      return res.status(201).json({
        message: "User subscription has been added",
        data: null,
        error: null,
      });
    }
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({
      message: error.message,
      data: null,
      error: error,
    });
  }
};

module.exports = {
  getAllPlans,
  createCheckout,
  checkoutComplete,
};
