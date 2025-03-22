package com.flightbooking.app.booking;
import com.flightbooking.app.booking.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepo bookingRepository;

    @Override
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<BookingDTO> getBookingById(Integer id) {
        return bookingRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public BookingDTO saveBooking(BookingDTO bookingDTO) {
        Booking booking = convertToEntity(bookingDTO);
        return convertToDTO(bookingRepository.save(booking));
    }

    @Override
    public void deleteBooking(Integer id) {
        bookingRepository.deleteById(id);
    }

    private BookingDTO convertToDTO(Booking booking) {
        BookingDTO dto = new BookingDTO();
        dto.setBookingId(booking.getBookingId());
        dto.setPaymentStatus(booking.getPaymentStatus());
        dto.setFlight(booking.getFlight());
        dto.setPassenger(booking.getPassenger());
        dto.setPayment(booking.getPayment() != null ? booking.getPayment() : null);
        return dto;
    }

    private Booking convertToEntity(BookingDTO dto) {
        Booking booking = new Booking();
        booking.setBookingId(dto.getBookingId());
        booking.setPaymentStatus(dto.getPaymentStatus());
        return booking;
    }
}

