package com.luv2code.springboot.thymleafdemo.controller;

import com.luv2code.springboot.thymleafdemo.entity.Employee;
import com.luv2code.springboot.thymleafdemo.service.EmployeeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/employee")

@Tag(
        name = "Employee REST APIs",
        description = "CRUD operations for Employee Management"
)
public class EmployeeRestController {

    private EmployeeService employeeService;

    public EmployeeRestController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Operation(summary = "Get all employees")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved employee list")
    @GetMapping
    public List<Employee> findAll() {
        return employeeService.findAll();
    }

    @Operation(summary = "Get employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee found"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @GetMapping("/{id}")
    public Employee findById(@PathVariable int id) {
        return employeeService.findById(id);
    }

    @Operation(summary = "Add new employee")
    @ApiResponse(responseCode = "200", description = "Employee added successfully")
    @PostMapping
    public Employee save(@RequestBody Employee employee) {

        employee.setId(0);

        employeeService.save(employee);

        return employee;
    }

    @Operation(summary = "Delete employee by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Employee deleted"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {

        employeeService.deleteById(id);

        return "Deleted employee id = " + id;
    }


    @Operation(summary = "Update an existing employee")
    @PutMapping
    public Employee updateEmployee(@RequestBody Employee employee) {

        employeeService.save(employee);

        return employee;
    }

    @GetMapping("/page")
    public Page<Employee> getEmployeePaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "0" ) int size){
        return employeeService.findPaginated(page, size);
    }

    @GetMapping("/search")
    public List<Employee> searchEmployees(
            @RequestParam String keyword) {

        return employeeService.searchEmployees(keyword);
    }

}