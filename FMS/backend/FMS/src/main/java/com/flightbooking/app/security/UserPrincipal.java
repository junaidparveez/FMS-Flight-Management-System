package com.flightbooking.app.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.flightbooking.app.user.User;

public class UserPrincipal implements UserDetails {
	
	User user;
	
	UserPrincipal(User user)
	{
		this.user=user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return user.getUserName();
	}

	
	public Integer getUserId() {
		// TODO Auto-generated method stub
		return user.getUserId();
	}

}
