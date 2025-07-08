package com.flightbooking.app.reports;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightbooking.app.booking.BookingRepo;
import com.flightbooking.app.flight.FlightRepo;
import com.flightbooking.app.passenger.PassengerRepo;
import com.flightbooking.app.payment.PaymentRepo;

@RestController
@RequestMapping("/reports")
public class Reports {
	
	BookingRepo bookingRepo;
	FlightRepo flightRepo;
	PassengerRepo passengerRepo;
	PaymentRepo paymentRepo;
	
	
	@Autowired
	public Reports(BookingRepo bookingRepo, FlightRepo flightRepo, PassengerRepo passengerRepo,
			PaymentRepo paymentRepo) {
		super();
		this.bookingRepo = bookingRepo;
		this.flightRepo = flightRepo;
		this.passengerRepo = passengerRepo;
		this.paymentRepo = paymentRepo;
	}



	@GetMapping("/booking")
	List<Map<String, Object>> getBookingsReport()
	{
		bookingRepo.findAll();
		
		return null;
		
	}

}
