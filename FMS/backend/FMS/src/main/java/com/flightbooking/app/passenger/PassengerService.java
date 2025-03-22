package com.flightbooking.app.passenger;

import java.util.List;
import java.util.Optional;

public interface PassengerService {
    List<PassengerDTO> getAllPassengers();
    Optional<PassengerDTO> getPassengerById(Integer id);
    PassengerDTO savePassenger(PassengerDTO passengerDTO);
    void deletePassenger(Integer id);
}

