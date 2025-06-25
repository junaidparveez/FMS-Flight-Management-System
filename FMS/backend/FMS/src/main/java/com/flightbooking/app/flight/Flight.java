package com.flightbooking.app.flight;

import com.flightbooking.app.airline.Airline;
import com.flightbooking.app.airport.Airport;
import com.flightbooking.app.booking.Booking;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Flight {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer flightID;
	private Integer FlightNumber;
	private LocalDateTime DepartureDateTime;
	private LocalDateTime ArrivalDateTime;
	private String OriginalAirportCode;
	private String DestinationAirportCode;
	private int AvailableSeats;
	@OneToMany
	private List<Booking> bookings;
	@JoinColumn(name = "airportCode")
	@ManyToOne
	private Airport airport;
	@JoinColumn(name = "airlineId")
	@ManyToOne
	private Airline airline;

}
