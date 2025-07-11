package com.flightbooking.app.payment;



import com.flightbooking.app.booking.Booking;
import com.flightbooking.app.util.BaseEntityFields;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDTO extends BaseEntityFields{
    private int paymentId;
    private String paymentMethod;
    private double amount;
    private LocalDateTime transactionDateTime;
    private Booking booking;
}
