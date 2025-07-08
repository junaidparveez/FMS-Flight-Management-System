package com.flightbooking.app.booking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @JoinColumn(name="flightId")
    private Flight flight;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="passengerId")
    private Passenger passenger;
    
    @OneToOne
    @JsonIgnore
    @JoinColumn(name="paymentId")
    private Payment payment;

}
