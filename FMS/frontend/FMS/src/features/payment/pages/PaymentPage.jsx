import React from "react";
import PaymentForm from "../components/PaymentForm";
import PaymentSummary from "../components/PaymentSummary";

const PaymentPage = () => {
  return (
    <div className="payment-page">
      <h2>Complete Your Payment</h2>
      <PaymentSummary />
      <PaymentForm />
    </div>
  );
};

export default PaymentPage;
