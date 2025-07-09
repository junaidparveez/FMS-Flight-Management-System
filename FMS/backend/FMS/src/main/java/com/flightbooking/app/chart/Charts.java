package com.flightbooking.app.chart;

import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.flightbooking.app.booking.BookingDTO;
import com.flightbooking.app.booking.BookingService;
import com.flightbooking.app.payment.PaymentDTO;
import com.flightbooking.app.payment.PaymentService;
@RestController
@RequestMapping("/charts")
public class Charts {

	@Autowired
	 private  BookingService bookingService;
	
	@Autowired
	PaymentService paymentService;
	@GetMapping("/booking")
	public List<Map<String, Object>> getBookingChart() {
	    List<PaymentDTO> payments = paymentService.getAllPayments();

	    Map<Integer, Long> grouped = payments.stream()
	        .filter(b -> b.getCreatedOn() != null)
	        .collect(Collectors.groupingBy(
	            b -> b.getCreatedOn().getMonthValue(), // get month number (1-12)
	            TreeMap::new,
	            Collectors.counting()
	        ));

	    List<Map<String, Object>> result = new ArrayList<>();
	    for (Map.Entry<Integer, Long> entry : grouped.entrySet()) {
	        int monthNumber = entry.getKey();
	        String monthName = Month.of(monthNumber).getDisplayName(TextStyle.FULL, Locale.ENGLISH);

	        Map<String, Object> row = new HashMap<>();
	        row.put("monthNumber", monthNumber);        // e.g., 1 for Jan
	        row.put("monthName", monthName);            // e.g., "January"
	        row.put("value", entry.getValue());         // booking count
	        result.add(row);
	    }

	    return result;
	}

	@GetMapping("/payment")
	public List<Map<String, Object>> getPaymentChart() {
	    List<BookingDTO> bookings = bookingService.getAllBookings();

	    Map<Integer, Long> grouped = bookings.stream()
	        .filter(b -> b.getCreatedOn() != null)
	        .collect(Collectors.groupingBy(
	            b -> b.getCreatedOn().getMonthValue(), // get month number (1-12)
	            TreeMap::new,
	            Collectors.counting()
	        ));

	    List<Map<String, Object>> result = new ArrayList<>();
	    for (Map.Entry<Integer, Long> entry : grouped.entrySet()) {
	        int monthNumber = entry.getKey();
	        String monthName = Month.of(monthNumber).getDisplayName(TextStyle.FULL, Locale.ENGLISH);

	        Map<String, Object> row = new HashMap<>();
	        row.put("monthNumber", monthNumber);        // e.g., 1 for Jan
	        row.put("monthName", monthName);            // e.g., "January"
	        row.put("value", entry.getValue());         // booking count
	        result.add(row);
	    }

	    return result;
	}
}
