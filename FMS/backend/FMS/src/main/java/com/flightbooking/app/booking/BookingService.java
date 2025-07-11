package com.flightbooking.app.booking;

import com.flightbooking.app.flight.Flight;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    List<BookingDTO> getAllBookings();
    Optional<BookingDTO> getBookingById(Integer id);
    BookingDTO saveBooking(BookingDTO Booking);
    void deleteBooking(Integer id);
}