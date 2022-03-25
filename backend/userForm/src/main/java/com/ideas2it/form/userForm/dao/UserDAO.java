package com.ideas2it.form.userForm.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.springframework.stereotype.Repository;

import java.util.List;

import com.ideas2it.form.userForm.model.User;

@Repository
public class UserDAO {
    
    public User createUser(User user) {
        Session session = new Configuration().configure().buildSessionFactory().openSession();
        Transaction transaction = null;
        int userId = 0;
        try{
            transaction = session.beginTransaction();
            userId = (Integer) session.save(user);
            user.setId(userId);
            transaction.commit();

        } catch(Exception exception) {
                if (null != transaction) {
                    transaction.rollback();
                    System.out.println("transaction roll backed");
                }
            exception.printStackTrace();
        }

        return user;
    }

    public List<User> getAllUsers() {
        Session session = new Configuration().configure().buildSessionFactory().openSession();
        Transaction transaction = null;
        // int userId = 0;
        List<User> users = null;
        try{
            transaction = session.beginTransaction();
            users = session.createQuery("from User").list();
            // user.setId(userId);
            transaction.commit();

        } catch(Exception exception) {
                if (null != transaction) {
                    transaction.rollback();
                }
            exception.printStackTrace();
        }

        return users;
    }
}
