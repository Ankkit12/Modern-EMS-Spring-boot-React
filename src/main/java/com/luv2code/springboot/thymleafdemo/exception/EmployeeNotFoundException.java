package com.luv2code.springboot.thymleafdemo.exception;

public class EmployeeNotFoundException extends RuntimeException {


    public EmployeeNotFoundException(String message){
        super(message);
    }
}
