package com.flightbooking.app.flight;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.flightbooking.app.airline.Airline;
import com.flightbooking.app.airport.Airport;
import com.flightbooking.app.booking.Booking;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class FlightDTO {
    private Integer flightID;
    private Integer flightNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime departureDateTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime arrivalDateTime;
    private String originalAirportCode;
    private String destinationAirportCode;
    private int availableSeats;
    private List<Booking> bookings;
    private Integer airportId;
    private Integer airlineId;
}
