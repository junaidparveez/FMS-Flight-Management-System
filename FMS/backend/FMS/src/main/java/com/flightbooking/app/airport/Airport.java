package com.flightbooking.app.airport;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.flightbooking.app.flight.Flight;
import com.flightbooking.app.util.BaseEntityFields;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
@Entity
@Data
public class Airport extends BaseEntityFields {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer airportCode;
    private String airportName;
    private String location;
    private String facility;

    @OneToMany(mappedBy = "airport")
    @JsonManagedReference
    private List<Flight> flights;




}

