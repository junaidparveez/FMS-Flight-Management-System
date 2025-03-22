package com.flightbooking.app.passenger;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PassengerServiceImpl implements PassengerService {
    @Autowired
    private PassengerRepo passengerRepository;

    @Override
    public List<PassengerDTO> getAllPassengers() {
        return passengerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PassengerDTO> getPassengerById(Integer id) {
        return passengerRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public PassengerDTO savePassenger(PassengerDTO passengerDTO) {
        Passenger passenger = convertToEntity(passengerDTO);
        return convertToDTO(passengerRepository.save(passenger));
    }

    @Override
    public void deletePassenger(Integer id) {
        passengerRepository.deleteById(id);
    }

    private PassengerDTO convertToDTO(Passenger passenger) {
        PassengerDTO dto = new PassengerDTO();
        dto.setPassengerId(passenger.getPassengerId());
        dto.setFirstName(passenger.getFirstName());
        dto.setLastName(passenger.getLastName());
        dto.setEmailId(passenger.getEmailId());
        dto.setPassportNumber(passenger.getPassportNumber());
        dto.setBookings(passenger.getBookings());
        return dto;
    }

    private Passenger convertToEntity(PassengerDTO dto) {
        Passenger passenger = new Passenger();
        passenger.setPassengerId(dto.getPassengerId());
        passenger.setFirstName(dto.getFirstName());
        passenger.setLastName(dto.getLastName());
        passenger.setEmailId(dto.getEmailId());
        passenger.setPassportNumber(dto.getPassportNumber());
        passenger.setBookings(dto.getBookings());
        return passenger;
    }
}
