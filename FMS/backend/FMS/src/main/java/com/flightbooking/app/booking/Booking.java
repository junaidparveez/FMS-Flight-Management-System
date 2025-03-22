package com.flightbooking.app.booking;

import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.passenger.Passenger;
import com.flightbooking.app.payment.Payment;
import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "Booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookingId;
    private String paymentStatus;

    @ManyToOne
    @JoinColumn(name="flightId")
    private Flight flight;

    @ManyToOne
    @JoinColumn(name="passengerId")
    private Passenger passenger;

    @OneToOne(mappedBy = "booking")
    private Payment payment;

}
