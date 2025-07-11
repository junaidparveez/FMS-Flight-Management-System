import axios from "axios";
import apiClient from '../../../common/services/apiClient';

export const createPayment = async (payment) => {
  const res = await apiClient.post('/payments', payment);
  return res.data;
};