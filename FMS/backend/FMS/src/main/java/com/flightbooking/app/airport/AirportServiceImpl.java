package com.flightbooking.app.airport;
import com.flightbooking.app.airport.Airport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AirportServiceImpl implements AirportService{
	
	 @Autowired
	    private AirportRepo airportRepository;

	    @Override
	    public List<AirportDto> getAllAirports() {
	    	
	        return airportRepository.findAll().stream()
	                .map(this::convertToDTO)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public Optional<AirportDto> getAirportById(Integer id) {
	        return airportRepository.findById(id).map(this::convertToDTO);
	    }

	    @Override
	    public AirportDto saveAirport(AirportDto airportDTO) {
	        Airport airport = convertToEntity(airportDTO);
			Airport savedAirport = airportRepository.save(airport);
	        return convertToDTO(savedAirport);
	    }

	    @Override
	    public void deleteAirport(Integer id) {
	        airportRepository.deleteById(id);
	    }

	    private AirportDto convertToDTO(Airport airport) {
	    	AirportDto dto = new AirportDto();
	        dto.setAirportCode(airport.getAirportCode());
	        dto.setAirportName(airport.getAirportName());
	        dto.setLocation(airport.getLocation());
	        dto.setFacility(airport.getFacility());
	        return dto;
	    }

	    private Airport convertToEntity(AirportDto dto) {
	        Airport airport = new Airport();
//	        airport.setAirportCode(dto.getAirportCode());
	        airport.setAirportName(dto.getAirportName());
	        airport.setLocation(dto.getLocation());
	        airport.setFacility(dto.getFacility());
	        return airport;
	    }

		@Override
		public List<AirportOption> getOptions() {
			return airportRepository.findAll().stream()
            .map(a -> new AirportOption(
                a.getAirportCode(),      // value
                a.getLocation()          // label
            ))
            .collect(Collectors.toList());
		}
}
