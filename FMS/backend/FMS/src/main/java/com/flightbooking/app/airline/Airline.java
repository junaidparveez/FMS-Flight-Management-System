package com.flightbooking.app.airline;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Airline extends BaseEntityFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer airlineId;
    private String airlineName;
    private Long contactNumber;
    private String operatingRegion;

    @OneToMany(mappedBy = "airline")
    @JsonManagedReference
    private List<Flight> flights;
    
}
