import React, { useState } from "react";
import { initiatePayment, confirmPayment } from "../services/paymentService";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const gatewayResponse = { cardNumber, cvv, expiry }; // Simulated response
    const res = await initiatePayment("booking123", 2000);
    await confirmPayment(res.paymentId, gatewayResponse);
    alert("Payment processed successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry (MM/YY)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
