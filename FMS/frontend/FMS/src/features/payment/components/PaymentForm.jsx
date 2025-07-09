// import React, { useState } from "react";
// import { initiatePayment, confirmPayment } from "../services/paymentService";

// const PaymentForm = () => {
//   const [cardNumber, setCardNumber] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [expiry, setExpiry] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const gatewayResponse = { cardNumber, cvv, expiry }; 
//     const res = await initiatePayment("booking123", 2000);
//     await confirmPayment(res.paymentId, gatewayResponse);
//     alert("Payment processed successfully");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="payment-form">
//       <input
//         type="text"
//         placeholder="Card Number"
//         value={cardNumber}
//         onChange={(e) => setCardNumber(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="CVV"
//         value={cvv}
//         onChange={(e) => setCvv(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Expiry (MM/YY)"
//         value={expiry}
//         onChange={(e) => setExpiry(e.target.value)}
//       />
//       <button type="submit">Pay Now</button>
//     </form>
//   );
// };

// export default PaymentForm;
import React, { useState } from 'react';
import { TextField, MenuItem, Typography, Stack, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { createPayment } from '../services/paymentService';

export default function PaymentForm({ onSuccess }) {
  const [payment, setPayment] = useState({
    paymentId: '',
    paymentMethod: 'CARD',
    amount: ''
  });

  const paymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => onSuccess(data),
  });

  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const payload = {
      ...payment,
      transactionDateTime: new Date().toISOString(),
    };
    paymentMutation.mutate(payload);
  };

  return (
    <Stack spacing={2} sx={{ minWidth: 300 }}>
      <Typography variant="h6" fontWeight={600} mb={1}>Payment Details</Typography>

      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={payment.amount}
        onChange={handleChange}
        fullWidth
        required
        sx={{ bgcolor: '#fafafa', borderRadius: 1 }}
      />

      <TextField
        label="Payment Method"
        name="paymentMethod"
        select
        value={payment.paymentMethod}
        onChange={handleChange}
        fullWidth
        required
        sx={{ bgcolor: '#fafafa', borderRadius: 1 }}
      >
        {['CARD', 'UPI', 'CASH'].map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={paymentMutation.isLoading}
        sx={{ fontWeight: 600, borderRadius: 2 }}
      >
        {paymentMutation.isLoading ? 'Processing…' : 'Save Payment'}
      </Button>
    </Stack>
  );
}
