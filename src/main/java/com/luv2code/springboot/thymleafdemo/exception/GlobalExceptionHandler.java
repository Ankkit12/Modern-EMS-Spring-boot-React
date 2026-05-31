package com.luv2code.springboot.thymleafdemo.exception;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler
    public String handleException(Exception exc, Model model) {

        // add error message to model
        model.addAttribute("errorMessage", exc.getMessage());

        // return Thymeleaf error page
        return "error-page";
    }
}