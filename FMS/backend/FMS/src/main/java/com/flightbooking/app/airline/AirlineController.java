package com.flightbooking.app.airline;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("airlines")
public class AirlineController {

	@Autowired
	 private AirlineService airlineService;

	    @GetMapping
	    public List<Airline> getAllAirlines() {
	        return airlineService.getAllAirline();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Airline> getAirlineById(@PathVariable Integer id) {
	        Airline airline = airlineService.getAirlineById(id);
	        return (ResponseEntity.ok(airline));
	    }

	    @PostMapping
	    public Airline createAirline(@RequestBody Airline airline) {
	        return airlineService.saveAirline(airline);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteAirline(@PathVariable Integer id) {
	    	System.out.println("Hello Id "+id);
	        airlineService.deleteAirlineById(id);
	        return ResponseEntity.noContent().build();
	    }



}
