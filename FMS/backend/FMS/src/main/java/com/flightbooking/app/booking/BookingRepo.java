package com.flightbooking.app.booking;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking,Integer> {

}
