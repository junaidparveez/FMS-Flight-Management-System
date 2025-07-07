package com.flightbooking.app.util;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO representing a single dashboard card.
 */
@Data
@AllArgsConstructor
public class CardInfo {
    private String title;
    private String value;
    private String icon;
    private String color;
}
