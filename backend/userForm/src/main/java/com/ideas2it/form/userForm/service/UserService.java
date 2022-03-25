package com.ideas2it.form.userForm.service;

import java.util.List;

import com.ideas2it.form.userForm.dao.UserDAO;
import com.ideas2it.form.userForm.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserDAO userDAO;

    public User createUser(User user) {
        user = userDAO.createUser(user);
        return user;
    }

    public List<User> getAllUsers(){
        return userDAO.getAllUsers();
    }

}
