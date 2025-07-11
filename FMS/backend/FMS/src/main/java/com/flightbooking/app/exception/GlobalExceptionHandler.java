package com.flightbooking.app.exception;


import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.flightbooking.app.util.CardInfo;

import java.util.List;

//@RestControllerAdvice
public class GlobalExceptionHandler {

//    @ExceptionHandler(DataAccessException.class)
//    public ResponseEntity<List<CardInfo>> handleDbError(DataAccessException ex) {
//        var errorCard = new CardInfo("DB Error", "Failed to read data", "fa-database", "danger");
//        return ResponseEntity.status(500).body(List.of(errorCard));
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<List<CardInfo>> handleGenericError(Exception ex) {
//        var errorCard = new CardInfo("Error", "Internal server error", "fa-exclamation-triangle", "danger");
//        return ResponseEntity.status(500).body(List.of(errorCard));
//    }
}