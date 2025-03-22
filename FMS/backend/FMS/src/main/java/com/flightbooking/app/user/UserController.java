package com.flightbooking.app.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    @Autowired
    public UserController (UserService userService){
        this.userService=userService;
    }
    @PostMapping("/register")
    public User saveUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    
    
    @PutMapping("/update")
    public User updateUser(@RequestParam(name="userId") Integer userId, @RequestBody User user){
        return userService.updateUser(user,userId);
    }


    @GetMapping("/login")
    public String logUser(@RequestParam String userName,@RequestParam String password){

        return userService.authenticateUser(userName,password);
    }
    
    @GetMapping("/")
    public User getUserById(@RequestParam Integer userId){
        return userService.findUserById(userId);
    }
    
    @GetMapping("/all")
    public List<User> getAllUser(){

        return userService.findAllUser();
    }



}