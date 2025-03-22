package com.flightbooking.app.passenger;

import com.flightbooking.app.booking.Booking;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Passenger {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer passengerId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String passportNumber;

    @OneToMany(mappedBy = "passenger")
    private List<Booking> bookings ;
}
