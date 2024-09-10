import { stripePromise } from '../lib/stripe';
import axios from 'axios';

export const processPayment = async (items: Array<{ price: number; quantity: number; name: string }>) => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  console.log('Sending request to create-checkout-session with items:', items);

  try {
    const response = await axios.post('/api/create-checkout-session', {
      items,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/cancel`,
    });

    console.log('Response status:', response.status);
    console.log('Session:', response.data);

    if (response.data.statusCode === 500) {
      throw new Error(response.data.message);
    }

    const result = await stripe.redirectToCheckout({
      sessionId: response.data.id,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
      throw new Error(`HTTP error! status: ${error.response?.status}`);
    }
    throw error;
  }
};