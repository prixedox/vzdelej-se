# Stripe Integration

## Key Files

- Client: `src/lib/stripe/client.ts` (lazy singleton via Proxy pattern)
- Config: `src/lib/stripe/config.ts` (plans, prices, currency: CZK)
- Helpers: `src/lib/stripe/helpers.ts` (getOrCreateStripeCustomer, isSubscriptionActive)
- Webhook: `src/app/api/stripe/webhook/route.ts`
- Checkout: `src/app/api/stripe/checkout/route.ts`
- Portal: `src/app/api/stripe/portal/route.ts`

## Plans

- Monthly: 199 CZK, no trial
- Yearly: 1490 CZK (38% savings), 7-day free trial

## Subscription Status Values

`free` (default) | `active` | `canceled` | `past_due` | `trialing`

## isSubscriptionActive() Logic

Returns true if: role === "admin" OR (status is "active"|"trialing" AND stripeCurrentPeriodEnd > now)

## Webhook Events Handled

1. `checkout.session.completed` — new subscription
2. `customer.subscription.updated` — plan changes, trial end
3. `customer.subscription.deleted` — cancellation
4. `invoice.payment_succeeded` — renewal (updates period_end)
5. `invoice.payment_failed` — sets status to "past_due"

## Checkout Flow

Auth check → getOrCreateStripeCustomer → create checkout session (trial only for yearly priceId) → redirect to Stripe. Success URL: `/subscription?success=true`. Cancel: `/pricing?canceled=true`.

## Gotchas

- `current_period_end` from Stripe is unix seconds — multiply by 1000 for JS Date
- Metadata userId is the only link between Stripe objects and users
- getOrCreateStripeCustomer has no idempotency guard — concurrent calls can create duplicate customers
- Stripe client uses Proxy to avoid build-time initialization
