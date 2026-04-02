import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return Response.json({ error: "Amount required" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Chauffeur Booking" },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://my-website-dun-xi.vercel.app/success",
      cancel_url: "https://my-website-dun-xi.vercel.app",
    });

    return Response.json({ url: session.url });

  } catch (error) {
    return Response.json({ error: "Payment failed" }, { status: 500 });
  }
}