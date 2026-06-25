import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { hiringId, lawyerServiceId, lawyerName, fee, lawyerSpecialization } =
      await req.json();

    if (!hiringId || !lawyerServiceId || !fee) {
      return NextResponse.json(
        { error: "Missing required payment fields." },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Consultation with ${lawyerName}`,
            },
            unit_amount: Math.round(parseFloat(fee) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_intent_data: {
        metadata: {
          hiringId,
          lawyerServiceId,
        },
      },
      metadata: {
        specialization: lawyerSpecialization,
        lawyerServiceId,
        hiringId,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&hiringId=${hiringId}&lawyerServiceId=${lawyerServiceId}`,
      cancel_url: `${origin}/dashboard/user/hiring-history`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
