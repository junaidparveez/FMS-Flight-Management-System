package com.flightbooking.app.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.flightbooking.app.security.UserPrincipal;

@Component
public class AuditorAwareImpl implements AuditorAware<Integer> {
  @Override
  public Optional<Integer> getCurrentAuditor() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    if (auth == null || !auth.isAuthenticated()) {
      return Optional.empty();
    }
    UserPrincipal userDetails = (UserPrincipal) auth.getPrincipal();
    return Optional.of(userDetails.getUserId());
  }
}
