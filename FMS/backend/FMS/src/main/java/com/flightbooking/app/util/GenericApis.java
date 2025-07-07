package com.flightbooking.app.util;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightbooking.app.airport.AirportRepo;
import com.flightbooking.app.booking.BookingRepo;
import com.flightbooking.app.flight.FlightRepo;
import com.flightbooking.app.payment.PaymentRepo;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/generic")
public class GenericApis {

    private final AirportRepo  airportRepo;
    private final FlightRepo   flightRepo;
    private final BookingRepo  bookingRepo;
    private final PaymentRepo  paymentRepo;

    public GenericApis(AirportRepo a,
                       FlightRepo f,
                       BookingRepo b,
                       PaymentRepo p) {
        this.airportRepo = a;
        this.flightRepo  = f;
        this.bookingRepo = b;
        this.paymentRepo = p;
    }

    @GetMapping("/cardsinfo")
    public ResponseEntity<List<CardInfo>> fetchAll() {
        try {
            // safely fetch all lists (repos will never return null)
            List<?> airports = airportRepo.findAll();
            List<?> flights  = flightRepo.findAll();
            List<?> bookings = bookingRepo.findAll();
            List<?> payments = paymentRepo.findAll();

            // sum payment amounts as doubles
            double totalPayments = payments.stream()
                .collect(Collectors.summingDouble(p -> ((com.flightbooking.app.payment.Payment)p).getAmount()));

            List<CardInfo> cards = List.of(
                new CardInfo("Total Bookings",
                             String.valueOf(bookings.size()),
                             "fa-plane", "primary"),
                new CardInfo("Flights Available",
                             String.valueOf(flights.size()),
                             "fa-calendar-day", "success"),
                new CardInfo("Total Payments",
                             String.format("$%,.2f", totalPayments),
                             "fa-credit-card", "info"),
                new CardInfo("Total Airports",
                             String.valueOf(airports.size()),
                             "fa-exclamation-triangle", "warning")
            );

            return ResponseEntity.ok(cards);

        } catch (DataAccessException dae) {
            log.error("Database error while fetching card info", dae);
            // 500 Internal Server Error with generic message
            return ResponseEntity
                  .status(500)
                  .body(List.of(new CardInfo("Error",
                                            "Unable to load data",
                                            "fa-exclamation-circle",
                                            "danger")));
        } catch (Exception ex) {
            log.error("Unexpected error in /generic/cardsinfo", ex);
            // 500 Internal Server Error
            return ResponseEntity
                  .status(500)
                  .body(List.of(new CardInfo("Error",
                                            "Something went wrong",
                                            "fa-exclamation-circle",
                                            "danger")));
        }
    }

}
