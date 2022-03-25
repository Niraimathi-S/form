package com.ideas2it.form.userForm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"model"})
public class UserFormApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserFormApplication.class, args);
	}

}
