package com.flightbooking.app.airline;

import java.util.List;


public interface AirlineService {
        Airline saveAirline(Airline airline);
    Airline updateAirline(Airline airline,Integer aid);
    Airline getAirlineById( Integer aid);
   List<Airline>  getAllAirline();

   void deleteAirlineById(Integer aid);
}
