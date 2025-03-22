package com.flightbooking.app.payment;



import com.flightbooking.app.payment.Payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepo paymentRepository;

    @Override
    public List<PaymentDTO> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PaymentDTO> getPaymentById(int id) {
        return paymentRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public PaymentDTO savePayment(PaymentDTO paymentDTO) {
        Payment payment = convertToEntity(paymentDTO);
        return convertToDTO(paymentRepository.save(payment));
    }

    @Override
    public void deletePayment(int id) {
        paymentRepository.deleteById(id);
    }

    private PaymentDTO convertToDTO(Payment payment) {
        PaymentDTO dto = new PaymentDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setPaymentMethod(payment.getPaymentMethod());
        dto.setAmount(payment.getAmount());
        dto.setTransactionDateTime(payment.getTransactionDateTime());
        dto.setBooking(payment.getBooking());
        return dto;
    }

    private Payment convertToEntity(PaymentDTO dto) {
        Payment payment = new Payment();
        payment.setPaymentId(dto.getPaymentId());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setAmount(dto.getAmount());
        payment.setTransactionDateTime(dto.getTransactionDateTime());
        payment.setBooking(dto.getBooking());
        return payment;
    }
}
