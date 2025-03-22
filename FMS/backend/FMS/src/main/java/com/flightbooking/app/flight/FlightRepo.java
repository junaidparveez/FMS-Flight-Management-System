package com.flightbooking.app.flight;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepo extends JpaRepository<Flight,Integer> {

}
