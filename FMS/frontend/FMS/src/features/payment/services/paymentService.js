import axios from "axios";

export const initiatePayment = async (bookingId, amount) => {
  return axios.post("/api/payment/initiate", { bookingId, amount })
    .then(res => res.data);
};

export const confirmPayment = async (paymentId, gatewayResponse) => {
  return axios.post("/api/payment/confirm", { paymentId, gatewayResponse })
    .then(res => res.data);
};

export const refundPayment = async (transactionId, amount) => {
  return axios.post("/api/payment/refund", { transactionId, amount })
    .then(res => res.data);
};
