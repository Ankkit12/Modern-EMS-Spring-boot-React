package com.luv2code.springboot.thymleafdemo.service;

import com.luv2code.springboot.thymleafdemo.entity.Employee;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService {

    List<Employee> findAll();

    Page<Employee> findPaginated(int pageNo, int PageSize);

    Employee findById(int theId);

    Employee save(Employee theEmployee);

    void deleteById(int theId);

    List<Employee> searchEmployees(String keyword);
}
