import { NextResponse } from 'next/server';
import stripe from '../../../server/stripe';

interface LineItem {
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { items, success_url, cancel_url } = await request.json();

    const lineItems = items.map((item: LineItem) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url,
      cancel_url,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ statusCode: 500, message: 'Error creating checkout session' }, { status: 500 });
  }
}