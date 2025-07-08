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

    Object principal = auth.getPrincipal();

    if (principal instanceof UserPrincipal) {
      return Optional.of(((UserPrincipal) principal).getUserId());
    }

    // When it's an anonymous user or just a String (e.g., during registration)
    return Optional.empty();
  }
}
