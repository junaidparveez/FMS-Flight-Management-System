package com.flightbooking.app.airport;

import com.flightbooking.app.flight.Flight;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer airportCode;
    private String airportName;
    private String location;
    private String facility;

    @OneToMany(mappedBy = "airport")
    private List<Flight> flights;




}

