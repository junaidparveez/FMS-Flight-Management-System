package com.flightbooking.app.payment;

import com.flightbooking.app.booking.Booking;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;
//    private int bookingId;
    private String paymentMethod;
    private double amount;
    private LocalDateTime transactionDateTime;

    @JoinColumn(name = "bookingId")
    @OneToOne
    private Booking booking;

}
