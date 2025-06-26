package com.flightbooking.app.booking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.passenger.Passenger;
import com.flightbooking.app.payment.Payment;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "Booking")
public class Booking extends BaseEntityFields{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;
    private String paymentStatus;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="flightId")
    private Flight flight;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="passengerId")
    private Passenger passenger;
    @JsonManagedReference
    @OneToOne(mappedBy = "booking")
    private Payment payment;

}
