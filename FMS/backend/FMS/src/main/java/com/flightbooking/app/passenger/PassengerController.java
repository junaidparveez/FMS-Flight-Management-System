package com.flightbooking.app.passenger;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/passengers")
public class PassengerController {
    @Autowired
    private PassengerService passengerService;

    @GetMapping
    public List<PassengerDTO> getAllPassengers() {
        return passengerService.getAllPassengers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PassengerDTO> getPassengerById(@PathVariable Integer id) {
        Optional<PassengerDTO> passenger = passengerService.getPassengerById(id);
        return passenger.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public PassengerDTO createPassenger(@RequestBody PassengerDTO passengerDTO) {
        return passengerService.savePassenger(passengerDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePassenger(@PathVariable Integer id) {
        passengerService.deletePassenger(id);
        return ResponseEntity.noContent().build();
    }
}

