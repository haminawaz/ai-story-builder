import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Check, Star, Zap, Crown } from "lucide-react";
import { handleSessionExpiry } from "@/utils/handleSessionExpiry";
const serverBaseUrl = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL;
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

interface PricingPlan {
  _id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  features: string[];
  featured: boolean;
  description?: string;
  badge?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  setAlertMessage: (message: string) => void;
}

const PricingCard = ({ plan, setAlertMessage }: PricingCardProps) => {
  const handleCheckout = async (planId: string) => {
    if (!stripePublicKey) {
      setAlertMessage("Stripe public key is missing");
      return;
    }
    const stripe = await loadStripe(stripePublicKey);
    if (!stripe) {
      setAlertMessage("Stripe failed to initialize");
      return;
    }

    const token = localStorage.getItem("token");
    const body = { planId };
    try {
      const response = await fetch(
        `${serverBaseUrl}/plans/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        if (handleSessionExpiry(responseData.message, setAlertMessage)) return;
        const msg = responseData.message || "Failed to fetch plans";
        setAlertMessage(msg);
      } else {
        const session = responseData?.data;
        await stripe.redirectToCheckout({
          sessionId: session.id,
        });
      }
    } catch (error) {
      const err = error as Error;
      setAlertMessage(err.message || "An error occurred");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  const getCardIcon = () => {
    switch (plan.type) {
      case "DIY":
        return <Star className="w-5 h-5" />;
      case "DWY":
        return <Zap className="w-5 h-5" />;
      case "DFY":
        return <Crown className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getGradient = () => {
    if (plan.featured) {
      return "bg-gradient-to-br from-[#457B9D] to-[#1D3557]";
    }
    switch (plan.type) {
      case "DIY":
        return "bg-gradient-to-br from-[#457B9D] to-[#565353]";
      case "DFY":
        return "bg-gradient-to-br from-[#1D3557] to-[#565353]";
      default:
        return "bg-gradient-to-br from-[#565353] to-[#457B9D]";
    }
  };

  return (
    <div
      className={`relative group transform transition-all duration-500 hover:scale-105 ${
        plan.featured ? "scale-105 z-10" : ""
      } w-full sm:max-w-[360px]`}
    >
      <div
        className={`absolute -inset-1 ${getGradient()} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
      ></div>
      <div
        className={`relative ${
          plan.featured
            ? `${getGradient()} text-white shadow-2xl border-0`
            : "bg-white/80 backdrop-blur-xl text-gray-800 border border-gray-200/50 shadow-xl"
        } rounded-2xl transition-all duration-300`}
      >
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
            <div
              className={`px-6 py-2 rounded-full text-xs font-bold shadow-lg ${
                plan.featured
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900"
                  : "bg-gradient-to-r from-[#457B9D] to-[#1D3557] text-white"
              }`}
            >
              {plan.badge}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 text-center flex flex-col h-full">
          <div className="mb-6">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                plan.featured
                  ? "bg-white/20 text-white backdrop-blur-sm"
                  : `${getGradient()} text-white`
              }`}
            >
              {getCardIcon()}
              {plan.type}
            </div>

            <h3
              className={`text-xl sm:text-2xl font-bold mb-2 ${
                plan.featured ? "text-white" : "text-[#1D3557]"
              }`}
            >
              {plan.name}
            </h3>

            {plan.description && (
              <p
                className={`text-sm ${
                  plan.featured ? "text-blue-100" : "text-[#565353]"
                }`}
              >
                {plan.description}
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-2">
              {plan.originalPrice && (
                <span
                  className={`text-lg line-through mr-2 ${
                    plan.featured ? "text-blue-200" : "text-[#565353]"
                  }`}
                >
                  ${plan.originalPrice}
                </span>
              )}
              <span
                className={`text-sm ${
                  plan.featured ? "text-blue-100" : "text-[#565353]"
                }`}
              >
                $
              </span>
              <span className="text-4xl sm:text-5xl font-bold">
                {plan.price}
              </span>
            </div>
            <div
              className={`text-sm ${
                plan.featured ? "text-blue-100" : "text-[#565353]"
              }`}
            >
              per month
            </div>
          </div>

          <div className="space-y-4 mb-8 flex-grow h-[120px] overflow-y-auto">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start text-left">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                    plan.featured
                      ? "bg-white/20 text-white"
                      : "bg-[#457B9D] text-white"
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
                <span
                  className={`text-sm leading-relaxed ${
                    plan.featured ? "text-white" : "text-[#565353]"
                  }`}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            className={`w-60 mx-auto absolute translate-x-[25%] rounded-full bottom-[-25px] left-0 py-4 px-6 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              plan.featured
                ? "bg-white text-[#457B9D] hover:bg-[#E8F1F2] hover:text-[#1D3557] shadow-white/20 z-20"
                : `${getGradient()} text-white hover:shadow-2xl z-20`
            }`}
            onClick={() => {
              console.log("plan:", plan);
              handleCheckout(plan._id);
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Choose {plan.name}
              <Zap className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
