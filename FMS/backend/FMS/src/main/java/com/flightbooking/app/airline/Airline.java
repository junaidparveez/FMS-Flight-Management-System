package com.flightbooking.app.airline;

import com.flightbooking.app.flight.Flight;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer airlineId;
    private String airlineName;
    private Long contactNumber;
    private String operatingRegion;

    @OneToMany(mappedBy = "airline")
    private List<Flight> flights;
    
}
