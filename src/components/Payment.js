import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import './Payment.css';
function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    try {
      axios.get("https://azureTravel.onrender.com/api/v1/config").then(async (response) => {
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      });
    } catch (error) {
      console.error("Failed to load Stripe configuration:", error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.post("https://azureTravel.onrender.com/api/v1/create-payment-intent", {}).then(async (response) => {
        var { clientSecret } = response.data;
        setClientSecret(clientSecret);
      });
    } catch (error) {
      console.error("Failed to create payment intent:", error);
    }
  }, []);

  return (
    <>
      <h1 className="payH1">Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;