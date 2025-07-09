//package com.flightbooking.app.config;
//
//import java.time.format.DateTimeFormatter;
//
//import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.stereotype.Component;
//
//import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
//import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
//@Component
//public class AppConfig {
//	 @Bean
//	    public Jackson2ObjectMapperBuilderCustomizer customizer() {
//	        return builder -> builder
//	            .serializers(new LocalDateTimeSerializer(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
//	            .deserializers(new LocalDateTimeDeserializer(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
//	    }
//}
