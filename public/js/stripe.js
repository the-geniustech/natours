/* eslint-disable */
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51O2rd7DwKFlWYiJiclr9AfnEdqZ2HHzdf2EukRL5BiOYEwiIfk1oDJs2lwCHYTTVg7ZY6NBFus3Rnx2sBYpn4xd000vKHRg79s',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + chance credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
