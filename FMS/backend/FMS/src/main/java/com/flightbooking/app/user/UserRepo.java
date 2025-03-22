package com.flightbooking.app.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Integer> {

   
	User findByUserName(String userName);
}