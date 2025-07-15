import PricingCard from "@/components/ui/PricingCard";

const PricingSection = () => {
  const plans = [
    {
      id: "diy",
      name: "Plan A",
      type: "DIY",
      price: 20,
      features: ["75 Free Stories"],
      featured: false,
    },
    {
      id: "dwy",
      name: "Plan B",
      type: "DWY",
      price: 50,
      features: ["75 Free Stories", "12 week workshop"],
      featured: true,
    },
    {
      id: "dfy",
      name: "Plan C",
      type: "DFY",
      price: 80,
      features: [
        "75 Free Stories",
        "12 week workshop",
        "Complete guide in story publishing",
      ],
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="p-10 relative z-10 bg-[url('/assets/letter-image.png')]">
        <div className="relative flex bg-[#F1FAEE] rounded-2xl pb-15 flex-col items-center justify-center min-h-screen">
          <div className="bg-[url('/assets/letter-image.png')] rounded-t-2xl w-full h-[250px] bg-cover bg-center flex justify-center items-center">
            <div className="text-center text-white px-4 py-12">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 font-[Cormorant_Garamond]">
                How do you want to continue?
              </h1>
              <p className="text-lg sm:text-xl text-white/90">
                Choose which plan is right for you
              </p>
            </div>
          </div>

          {/* Pricing Cards Flexbox */}
          <div className="flex flex-wrap justify-center gap-15 lg:10 xl:gap-5 w-full mt-12 max-w-full px-6 md:px-0">
            {plans.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
