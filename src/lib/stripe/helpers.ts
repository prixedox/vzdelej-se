import { stripe } from "./client";
import { db } from "@/lib/db";
import { users } from "@/lib/db/tables";
import { eq } from "drizzle-orm";

export async function getOrCreateStripeCustomer(userId: string): Promise<string> {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    metadata: {
      userId: user.id,
    },
  });

  await db
    .update(users)
    .set({ stripeCustomerId: customer.id })
    .where(eq(users.id, userId));

  return customer.id;
}

export function isSubscriptionActive(user: {
  subscriptionStatus: string | null;
  stripeCurrentPeriodEnd: Date | string | null;
  role?: string | null;
}): boolean {
  // Admins always have full access
  if (user.role === "admin") return true;

  if (user.subscriptionStatus === "active" || user.subscriptionStatus === "trialing") {
    if (user.stripeCurrentPeriodEnd) {
      const endTime = user.stripeCurrentPeriodEnd instanceof Date
        ? user.stripeCurrentPeriodEnd.getTime()
        : new Date(user.stripeCurrentPeriodEnd).getTime();
      return endTime > Date.now();
    }
    return true;
  }
  return false;
}
