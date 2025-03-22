package com.flightbooking.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.flightbooking.app.user.User;
import com.flightbooking.app.user.UserRepo;
@Service
public class AppUserDetailService implements UserDetailsService {
	
	@Autowired
	UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user=userRepo.findByUserName(username);
		if(user==null)
		{
			throw new UsernameNotFoundException("user Not Found");
		}
		return new UserPrincipal(user);
	}

}
