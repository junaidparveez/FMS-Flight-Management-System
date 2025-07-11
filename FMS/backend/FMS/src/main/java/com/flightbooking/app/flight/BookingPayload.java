package com.flightbooking.app.flight;

import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;

@Data
public class BookingPayload {

	private String sourceAirport;
	private String destinationAirport;
	private LocalDate bookingDate;
}
