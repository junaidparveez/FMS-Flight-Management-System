package com.flightbooking.app.booking;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.flight.FlightRepo;
import com.flightbooking.app.passenger.Passenger;
import com.flightbooking.app.passenger.PassengerRepo;
import com.flightbooking.app.payment.Payment;
import com.flightbooking.app.payment.PaymentRepo;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepo repo;
 
    @Autowired
    private PassengerRepo passengerRepo;

    @Autowired
    private FlightRepo flightRepo;
    @Autowired
	private  PaymentRepo paymentRepo;
    @Autowired
    public BookingServiceImpl(BookingRepo repo) {
        this.repo = repo;
       
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return repo.findAll()
                   .stream()
                   .map(entity -> convertToDTO(entity))
                   .collect(Collectors.toList());
    }

    @Override
    public Optional<BookingDTO> getBookingById(Integer id) {
        return repo.findById(id)
                   .map(entity -> convertToDTO(entity));
    }

    @Override
    public BookingDTO saveBooking(BookingDTO dto) {
        // Convert DTO to Entity
        Booking entity = convertToEntity(dto);

        // Set passenger and flight manually
        Passenger passenger = passengerRepo.findById(dto.getPassengerId())
            .orElseThrow(() -> new RuntimeException("Passenger not found"));
        entity.setPassenger(passenger);

        Flight flight = flightRepo.findById(dto.getFlightId())
            .orElseThrow(() -> new RuntimeException("Flight not found"));
        entity.setFlight(flight);

        Payment payment =  paymentRepo.findById(dto.getPaymentId())
        	    .orElseThrow(() -> new RuntimeException("Payment not found"));
        entity.setPayment(payment);
        Booking saved = repo.save(entity);

        // Convert Entity back to DTO
        return convertToDTO(saved);
    }

    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        booking.setBookingId(dto.getBookingId());
        booking.setPaymentStatus(dto.getPaymentStatus());
        // Don't set passenger or flight here; handled separately
        return booking;
    }

    private BookingDTO convertToDTO(Booking entity) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(entity.getBookingId());
        dto.setPaymentStatus(entity.getPaymentStatus());

        if (entity.getPassenger() != null)
            dto.setPassengerId(entity.getPassenger().getPassengerId());

        if (entity.getFlight() != null)
            dto.setFlightId(entity.getFlight().getFlightID());

        if (entity.getPayment() != null)
            dto.setPaymentId(entity.getPayment().getPaymentId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedOn(entity.getCreatedOn());
        return dto;
    }
    @Override
    public void deleteBooking(Integer id) {
        repo.deleteById(id);
    }
}
