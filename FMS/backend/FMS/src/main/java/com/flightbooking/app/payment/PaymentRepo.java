package com.flightbooking.app.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepo extends JpaRepository<Payment, Integer>{
}
