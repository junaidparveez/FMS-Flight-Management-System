package com.flightbooking.app.user;

import org.springframework.stereotype.Service;

import java.util.List;

public interface UserService {

    User saveUser(User user);
     List<User> getAllUser();
   User  deleteUserById(Integer uid);
   List<User>findAllUser();
   User findUserById(Integer uid);
   User updateUser(User user ,Integer uid);

   String authenticateUser(String userName,String password);


}