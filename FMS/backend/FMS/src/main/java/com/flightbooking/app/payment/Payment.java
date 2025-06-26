package com.flightbooking.app.payment;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.flightbooking.app.booking.Booking;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Entity
@Data
public class Payment extends BaseEntityFields{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int paymentId;
//    private int bookingId;
    private String paymentMethod;
    private double amount;
    private LocalDateTime transactionDateTime;

    @JoinColumn(name = "bookingId")
    @OneToOne
    @JsonBackReference
    private Booking booking;

}
