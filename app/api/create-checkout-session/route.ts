import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { planId, userId } = await request.json()

    if (!planId || !userId) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Define pricing for different plans
    const planPricing = {
      pro: {
        price: 1900, // $19.00 in cents
        name: "Plan Pro",
        description: "Applications illimitées avec fonctionnalités avancées",
      },
      enterprise: {
        price: 9900, // $99.00 in cents
        name: "Plan Enterprise",
        description: "Solution complète pour les grandes équipes",
      },
    }

    const selectedPlan = planPricing[planId as keyof typeof planPricing]

    if (!selectedPlan) {
      return NextResponse.json({ error: "Invalid plan selected" }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: selectedPlan.name,
              description: selectedPlan.description,
              images: ["https://your-domain.com/logo.png"],
            },
            unit_amount: selectedPlan.price,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      metadata: {
        userId: userId.toString(),
        planId: planId,
      },
      customer_email: undefined, // Will be filled by Stripe
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: {
        enabled: true,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      checkoutUrl: session.url,
    })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}

// Handle Stripe webhooks
export async function PUT(request: NextRequest) {
  try {
    const sig = request.headers.get("stripe-signature")
    const body = await request.text()

    if (!sig) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 })
    }

    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        const { userId, planId } = session.metadata!

        // Update user's plan in database
        console.log(`User ${userId} upgraded to ${planId}`)

        // Here you would update the user's plan in your database
        // await updateUserPlan(userId, planId)

        break

      case "invoice.payment_succeeded":
        // Handle successful recurring payment
        console.log("Payment succeeded for subscription")
        break

      case "invoice.payment_failed":
        // Handle failed payment
        console.log("Payment failed for subscription")
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 })
  }
}
