package com.flightbooking.app.flight;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepo extends JpaRepository<Flight,Integer> {
	
	
	List<Flight> findByOriginalAirportCodeAndDestinationAirportCodeAndAvailableSeatsGreaterThan(
            String originalAirportCode,
            String destinationAirportCode,
            int minSeats   // pass 0 to mean “≠ 0”
    );
	List<Flight> findTop10ByOrderByFlightIdDesc();

}
