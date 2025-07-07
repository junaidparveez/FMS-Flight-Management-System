package com.flightbooking.app.airport;

import com.flightbooking.app.util.BaseEntityFields;

import lombok.Data;

@Data
public class AirportDto extends BaseEntityFields{
	 private Integer airportCode;
	    private String airportName;
	    private String location;
	    private String facility;
}
