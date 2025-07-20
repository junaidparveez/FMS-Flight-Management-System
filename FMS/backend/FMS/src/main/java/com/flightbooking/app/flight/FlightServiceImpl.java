package com.flightbooking.app.flight;


import com.flightbooking.app.airline.Airline;
import com.flightbooking.app.airline.AirlineRepo;
import com.flightbooking.app.airport.Airport;
import com.flightbooking.app.airport.AirportRepo;
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
    @Autowired
    private AirportRepo airportRepo;
    @Autowired
    private  AirlineRepo airlineRepo;
    @Override
     public List<FlightDTO> getAllFlights() {
        return flightRepository.findTop10ByOrderByFlightIDDesc().stream()
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
        dto.setAirportId(flight.getAirport().getAirportCode());
        dto.setAirlineId(flight.getAirline().getAirlineId());
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
        flight.setAirport(airportRepo.findById( dto.getAirportId()).get());
        flight.setAirline(airlineRepo.findById(dto.getAirlineId()).get() );
        return flight;
    }

	@Override
	public List<FlightDTO> getFlightsByCriteria(BookingPayload payload) {
		
		return flightRepository.
				findByOriginalAirportCodeAndDestinationAirportCodeAndAvailableSeatsGreaterThan(payload.getSourceAirport(),payload.getDestinationAirport(),0).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
		
	}

	@Override
	public FlightDTO updateFlight(FlightDTO flightDTO,Integer id) {
		  Flight flight = convertToEntity(flightDTO);
		  flight.setFlightID(id);
	        return convertToDTO(flightRepository.save(flight));
	}
}
