package com.flightbooking.app.flight;


import com.flightbooking.app.airline.Airline;
import com.flightbooking.app.airport.Airport;
import com.flightbooking.app.booking.Booking;
import com.flightbooking.app.flight.Flight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FlightServiceImpl implements FlightService {
    @Autowired
    private FlightRepo flightRepository;

    @Override
    public List<FlightDTO> getAllFlights() {
        return flightRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<FlightDTO> getFlightById(Integer id) {
        return flightRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public FlightDTO saveFlight(FlightDTO flightDTO) {
        Flight flight = convertToEntity(flightDTO);
        return convertToDTO(flightRepository.save(flight));
    }

    @Override
    public void deleteFlight(Integer id) {
        flightRepository.deleteById(id);
    }

    private FlightDTO convertToDTO(Flight flight) {
        FlightDTO dto = new FlightDTO();
        dto.setFlightID(flight.getFlightID());
        dto.setFlightNumber(flight.getFlightNumber());
        dto.setDepartureDateTime(flight.getDepartureDateTime());
        dto.setArrivalDateTime(flight.getArrivalDateTime());
        dto.setOriginalAirportCode(flight.getOriginalAirportCode());
        dto.setDestinationAirportCode(flight.getDestinationAirportCode());
        dto.setAvailableSeats(flight.getAvailableSeats());
        dto.setBookings(flight.getBookings());
        dto.setAirport(flight.getAirport());
        dto.setAirline(flight.getAirline());
        return dto;
    }

    private Flight convertToEntity(FlightDTO dto) {
        Flight flight = new Flight();
        flight.setFlightID(dto.getFlightID());
        flight.setFlightNumber(dto.getFlightNumber());
        flight.setDepartureDateTime(dto.getDepartureDateTime());
        flight.setArrivalDateTime(dto.getArrivalDateTime());
        flight.setOriginalAirportCode(dto.getOriginalAirportCode());
        flight.setDestinationAirportCode(dto.getDestinationAirportCode());
        flight.setAvailableSeats(dto.getAvailableSeats());
        flight.setBookings(dto.getBookings());
        flight.setAirport(dto.getAirport());
        flight.setAirline(dto.getAirline());
        return flight;
    }
}
