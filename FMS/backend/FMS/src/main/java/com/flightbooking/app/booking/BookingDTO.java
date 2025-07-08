package com.flightbooking.app.booking;

import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.passenger.Passenger;
import com.flightbooking.app.payment.Payment;

import lombok.Data;

@Data
public class BookingDTO {
	 private Integer bookingId;
	    private String paymentStatus;
	    private Integer flightId;
	    private Integer passengerId;
	    private Integer paymentId;
	    }

