package com.flightbooking.app.flight;


import java.util.List;
import java.util.Optional;

public interface FlightService {
    List<FlightDTO> getAllFlights();
    Optional<FlightDTO> getFlightById(Integer id);
    FlightDTO saveFlight(FlightDTO flightDTO);
    void deleteFlight(Integer id);
	List<FlightDTO> getFlightsByCriteria(BookingPayload payload);
	FlightDTO updateFlight(FlightDTO flightDTO,Integer id);
}

