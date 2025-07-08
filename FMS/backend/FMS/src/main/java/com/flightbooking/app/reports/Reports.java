package com.flightbooking.app.reports;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightbooking.app.booking.BookingDTO;
import com.flightbooking.app.booking.BookingService;
import com.flightbooking.app.flight.FlightDTO;
import com.flightbooking.app.flight.FlightService;
import com.flightbooking.app.passenger.PassengerDTO;
import com.flightbooking.app.passenger.PassengerService;
import com.flightbooking.app.payment.PaymentDTO;
import com.flightbooking.app.payment.PaymentService;

@RestController
@RequestMapping("/reports")
public class Reports {

    private final BookingService bookingService;
    private final FlightService   flightService;
    private final PassengerService passengerService;
    private final PaymentService   paymentService;
@Autowired
    public Reports(BookingService bookingService,
                             FlightService flightService,
                             PassengerService passengerService,
                             PaymentService paymentService) {
        this.bookingService   = bookingService;
        this.flightService    = flightService;
        this.passengerService = passengerService;
        this.paymentService   = paymentService;
    }

    @GetMapping("/booking")
    public List<Map<String, Object>> getBookingsReport() {
        // 1) Get all bookings (flat DTOs with IDs)
        List<BookingDTO> bookings = bookingService.getAllBookings();

        // 2) Collect needed IDs
        Set<Integer> flightIds    = bookings.stream()
                                             .map(BookingDTO::getFlightId)
                                             .collect(Collectors.toSet());
        Set<Integer> passengerIds = bookings.stream()
                                             .map(BookingDTO::getPassengerId)
                                             .collect(Collectors.toSet());
        Set<Integer> paymentIds   = bookings.stream()
                                             .map(BookingDTO::getPaymentId)
                                             .filter(Objects::nonNull)
                                             .collect(Collectors.toSet());

        // 3) Fetch all flights/passengers/payments and build maps
        Map<Integer, FlightDTO>     flightMap    = flightService.getAllFlights().stream()
            .filter(f -> flightIds.contains(f.getFlightID()))
            .collect(Collectors.toMap(FlightDTO::getFlightID, f -> f));

        Map<Integer, PassengerDTO>  passengerMap = passengerService.getAllPassengers().stream()
            .filter(p -> passengerIds.contains(p.getPassengerId()))
            .collect(Collectors.toMap(PassengerDTO::getPassengerId, p -> p));

        Map<Integer, PaymentDTO>    paymentMap   = paymentService.getAllPayments().stream()
            .filter(p -> paymentIds.contains(p.getPaymentId()))
            .collect(Collectors.toMap(PaymentDTO::getPaymentId, p -> p));

        // 4) Build the trimmed report
        List<Map<String,Object>> report = new ArrayList<>(bookings.size());
        for (BookingDTO b : bookings) {
            Map<String,Object> row = new LinkedHashMap<>();
            row.put("bookingId",     b.getBookingId());
            row.put("paymentStatus", b.getPaymentStatus());

            FlightDTO  f = flightMap.get(b.getFlightId());
            if (f != null) {
            	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                row.put("departureDateTime", f.getDepartureDateTime().format(formatter));
                row.put("flightNumber",      f.getFlightNumber());
           
            }

            PassengerDTO p = passengerMap.get(b.getPassengerId());
            if (p != null) {
                row.put("passengerName", p.getFirstName() + " " + p.getLastName());
            }

            if (b.getPaymentId() != null) {
                PaymentDTO pay = paymentMap.get(b.getPaymentId());
                if (pay != null) {
                    row.put("paymentAmount", pay.getAmount());
                }
            }

            report.add(row);
        }

        return report;
    }
}
