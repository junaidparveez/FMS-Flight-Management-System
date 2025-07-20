package com.flightbooking.app.flight;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/flights")
public class FlightController {
    @Autowired
    private FlightService flightService;

    @GetMapping
    public List<FlightDTO> getAllFlights() {
        return flightService.getAllFlights();
    }

    @GetMapping("count")
    public Integer getTotalFlights() {
        return flightService.flightSize();
    }
    @GetMapping("/{id}")
    public ResponseEntity<FlightDTO> getFlightById(@PathVariable Integer id) {
        Optional<FlightDTO> flight = flightService.getFlightById(id);
        return flight.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public FlightDTO createFlight(@RequestBody FlightDTO flightDTO) {
        return flightService.saveFlight(flightDTO);
    }

    @PutMapping("/{id}")
    public FlightDTO updateFlight(@PathVariable Integer id,@RequestBody FlightDTO flightDTO) {
        return flightService.updateFlight(flightDTO,id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Integer id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/search")
    public List<FlightDTO> getFlightsByLocationAndTime(@RequestBody BookingPayload payload) {
        return flightService.getFlightsByCriteria(payload);
    }

    
}

