package com.flightbooking.app.passenger;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.flightbooking.app.booking.Booking;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Passenger extends BaseEntityFields{
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
