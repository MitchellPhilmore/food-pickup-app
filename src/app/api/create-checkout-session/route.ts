import { NextResponse } from 'next/server';
import stripe from '../../../server/stripe';

export async function POST(request: Request) {
  try {
    const { items, success_url, cancel_url } = await request.json();

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price 
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: success_url,
      cancel_url: cancel_url,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ statusCode: 500, message: 'Error creating checkout session' }, { status: 500 });
  }
}