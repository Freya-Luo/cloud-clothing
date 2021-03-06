import { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotalPrice } from "../../store/cart/cart-selector";
import { selectCurrentUser } from "../../store/user/user-selector";
import Button from "../button/button";
import "./payment-form.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const totalPrice = useSelector(selectCartTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
  const [processing, setProcessing] = useState(false);

  const paymentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    // send payment request, ".netlify" - netlify way
    const response = await fetch("/.netlify/functions/create-stripe-payment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ totalPrice: totalPrice * 100 }),
    }).then((res) => {
      return res.json();
    });

    // check if card is a valid card
    const paidCard = elements.getElement(CardElement);
    if (paidCard == null) {
      return;
    }
    // make actual payment process
    const secret = response.payment.client_secret;
    const paymentResult = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: paidCard,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Freya Luo",
        },
      },
    });

    setProcessing(false);
    // get payment result
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful!");
      }
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Information:</h2>
        <CardElement />
        <Button className="payment-button">{processing ? <div className="loading"></div> : "Pay Now"}</Button>
      </form>
    </div>
  );
};
export default PaymentForm;
