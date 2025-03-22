package com.flightbooking.app.payment;

import java.util.List;
import java.util.Optional;

public interface PaymentService {
    List<PaymentDTO> getAllPayments();
    Optional<PaymentDTO> getPaymentById(int id);
    PaymentDTO savePayment(PaymentDTO paymentDTO);
    void deletePayment(int id);
}
