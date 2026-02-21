export const STRIPE_CONFIG = {
  monthlyPriceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
  yearlyPriceId: process.env.STRIPE_YEARLY_PRICE_ID!,
  currency: "czk" as const,
  locale: "cs" as const,
};

export const PLANS = [
  {
    id: "monthly",
    name: "Měsíční",
    price: 199,
    currency: "CZK",
    interval: "month" as const,
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID!,
    features: [
      "Neomezený přístup ke všem lekcím",
      "Všechny úrovně obtížnosti",
      "Sledování pokroku",
      "XP a úrovně",
    ],
  },
  {
    id: "yearly",
    name: "Roční",
    price: 1490,
    currency: "CZK",
    interval: "year" as const,
    priceId: process.env.STRIPE_YEARLY_PRICE_ID!,
    popular: true,
    savings: "Ušetříte 38 %",
    trialDays: 7,
    features: [
      "Vše z měsíčního plánu",
      "7 dní zdarma na vyzkoušení",
      "Ušetříte 898 Kč ročně",
      "Prioritní podpora",
    ],
  },
];
