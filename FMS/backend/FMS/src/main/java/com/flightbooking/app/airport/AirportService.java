package com.flightbooking.app.airport;

import java.util.List;
import java.util.Optional;

public interface AirportService {
	
	 List<AirportDto> getAllAirports();
	 Optional<AirportDto> getAirportById(Integer id);
	 AirportDto saveAirport(AirportDto airportDTO);
	 void deleteAirport(Integer id);
	List<AirportOption> getOptions();
}
