package com.flightbooking.app.booking;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepo repo;
    private final ModelMapper modelMapper;

    @Autowired
    public BookingServiceImpl(BookingRepo repo, ModelMapper modelMapper) {
        this.repo = repo;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        return repo.findAll()
                   .stream()
                   .map(entity -> modelMapper.map(entity, BookingDTO.class))
                   .collect(Collectors.toList());
    }

    @Override
    public Optional<BookingDTO> getBookingById(Integer id) {
        return repo.findById(id)
                   .map(entity -> modelMapper.map(entity, BookingDTO.class));
    }

    @Override
    public BookingDTO saveBooking(BookingDTO dto) {
        // DTO → Entity
        Booking entity = modelMapper.map(dto, Booking.class);
        // Persist
        Booking saved = repo.save(entity);
        // Entity → DTO
        return modelMapper.map(saved, BookingDTO.class);
    }

    @Override
    public void deleteBooking(Integer id) {
        repo.deleteById(id);
    }
}
