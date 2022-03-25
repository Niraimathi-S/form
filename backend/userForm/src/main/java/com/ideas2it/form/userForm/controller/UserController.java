package com.ideas2it.form.userForm.controller;

import java.util.ArrayList;
import java.util.List;

import com.ideas2it.form.userForm.model.User;
import com.ideas2it.form.userForm.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    
    @Autowired
    UserService userService;

    @PostMapping("/create")
    public void createCustomer(@RequestBody User user) {
        System.out.println("user" + user);
        try {
            user = userService.createUser(user);
            // resp = new ResponseEntity<String>(
            //         "customer created" + customerDTO,
            //         HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            // resp = new ResponseEntity<String>(
            //         "customer not created .Exception" + e,
            //         HttpStatus.NOT_IMPLEMENTED);
        }
        System.out.println("created");
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers(){
        List<User> users = new ArrayList<User>();
        try {
            users = userService.getAllUsers();
        } catch (Exception e) {
            e.printStackTrace();
            // resp = new ResponseEntity<String>(
            //         "customer not created .Exception" + e,
            //         HttpStatus.NOT_IMPLEMENTED);
        }  
        return users;  
    }
}
