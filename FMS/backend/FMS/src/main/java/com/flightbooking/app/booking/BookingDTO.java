package com.flightbooking.app.booking;

import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.passenger.Passenger;
import com.flightbooking.app.payment.Payment;
import com.flightbooking.app.util.BaseEntityFields;

import lombok.Data;

@Data
public class BookingDTO extends BaseEntityFields{
	 private Integer bookingId;
	    private String paymentStatus;
	    private Integer flightId;
	    private Integer passengerId;
	    private Integer paymentId;
	    }

