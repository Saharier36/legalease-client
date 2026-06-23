import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");
    const { lawyerId, lawyerName, fee, lawyerUserId, lawyerSpecialization } =
      await req.json();

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
      metadata: {
        specialization: lawyerSpecialization,
        lawyerServiceId: lawyerId,
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}&lawyerServiceId=${lawyerId}&lawyerUserId=${lawyerUserId}`,
      cancel_url: `${origin}/browse-lawyers/${lawyerId}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
