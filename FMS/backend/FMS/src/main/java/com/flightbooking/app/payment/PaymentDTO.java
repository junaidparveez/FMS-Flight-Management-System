package com.flightbooking.app.payment;



import com.flightbooking.app.booking.Booking;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDTO {
    private int paymentId;
    private String paymentMethod;
    private double amount;
    private LocalDateTime transactionDateTime;
    private Booking booking;
}
