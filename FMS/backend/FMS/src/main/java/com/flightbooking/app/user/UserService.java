package com.flightbooking.app.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface UserService {

    User saveUser(User user);
     List<User> getAllUser();
   User  deleteUserById(Integer uid);
   List<User>findAllUser();
   User findUserById(Integer uid);
   User updateUser(User user ,Integer uid);

   Map<String, Object> authenticateUser(String userName,String password);


}