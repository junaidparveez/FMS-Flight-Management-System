package com.flightbooking.app.passenger;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PassengerRepo extends JpaRepository<Passenger,Integer> {
}
