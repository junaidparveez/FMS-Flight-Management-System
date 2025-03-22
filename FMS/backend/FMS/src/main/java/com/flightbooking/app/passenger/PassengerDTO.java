package com.flightbooking.app.passenger;



import com.flightbooking.app.booking.Booking;
import lombok.Data;
import java.util.List;

@Data
public class PassengerDTO {
    private Integer passengerId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String passportNumber;
    private List<Booking> bookings;
}

