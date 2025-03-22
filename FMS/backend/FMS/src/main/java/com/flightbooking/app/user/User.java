package com.flightbooking.app.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Entity(name="FL_USER")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String firstName;
    private String lastName;
    private String emailId;
    private String passportNumber;
    private String userName;
    private String password;


}