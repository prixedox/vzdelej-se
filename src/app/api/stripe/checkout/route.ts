import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/config";
import { stripe } from "@/lib/stripe/client";
import { getOrCreateStripeCustomer } from "@/lib/stripe/helpers";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { priceId } = body;

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  try {
    const customerId = await getOrCreateStripeCustomer(session.user.id);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/predplatne?success=true`,
      cancel_url: `${appUrl}/cenik?canceled=true`,
      locale: "cs",
      currency: "czk",
      metadata: {
        userId: session.user.id,
      },
      subscription_data: {
        trial_period_days: priceId === process.env.STRIPE_YEARLY_PRICE_ID ? 7 : undefined,
        metadata: {
          userId: session.user.id,
        },
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Nepodařilo se vytvořit platební relaci" },
      { status: 500 }
    );
  }
}
