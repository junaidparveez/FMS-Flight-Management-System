package com.flightbooking.app.airline;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AirlineServiceImpl implements AirlineService{

    @Autowired
    AirlineRepo airlineRepo;

    @Override
    public Airline saveAirline(Airline airline) {
        return airlineRepo.save(airline);
    }

    @Override
    public Airline updateAirline(Airline airline, Integer aid) {
        Airline existingAirline= airlineRepo.findById(aid).orElse(null);
        if(existingAirline!=null)
        {
            existingAirline.setAirlineName(airline.getAirlineName());
            existingAirline.setFlights(airline.getFlights());
            existingAirline.setContactNumber(airline.getContactNumber());
            existingAirline.setOperatingRegion(airline.getOperatingRegion());
            return  airlineRepo.save(existingAirline);
        }
        return null;
    }

    @Override
    public Airline getAirlineById(Integer aid) {
        Airline existingAirline= airlineRepo.findById(aid).orElse(null);
        return existingAirline;
    }

    @Override
    public List<Airline> getAllAirline() {
        return airlineRepo.findAll();
    }

    @Override
    public void deleteAirlineById(Integer aid) {
      Airline existinfAirline=  airlineRepo.findById(aid).orElse(null);
      if(existinfAirline != null){
          airlineRepo.deleteById(aid);
      }

    }


}
