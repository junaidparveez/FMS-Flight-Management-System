package com.flightbooking.app.flight;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.flightbooking.app.airline.Airline;
import com.flightbooking.app.airport.Airport;
import com.flightbooking.app.booking.Booking;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Flight extends BaseEntityFields{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer flightID;
	private Integer FlightNumber;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime DepartureDateTime=LocalDateTime.now();;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime ArrivalDateTime=LocalDateTime.now();
	private String originalAirportCode;
	private String destinationAirportCode;
	private int availableSeats;
	@OneToMany
	@JsonIgnore
	private List<Booking> bookings;
	@JoinColumn(name = "airportCode")
	@ManyToOne
	@JsonIgnore
	private Airport airport;
	@JoinColumn(name = "airlineId")
	@ManyToOne
	@JsonIgnore
	private Airline airline;

}
