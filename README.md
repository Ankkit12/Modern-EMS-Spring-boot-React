🚀 Employee Management System (Full-Stack)

A full-stack Employee Management System built using Spring Boot, Spring Security, JWT Authentication, React, MySQL, and Thymeleaf.

This project evolved from a basic CRUD system into a secure, production-style full-stack application with stateless authentication and role-based access control.

✨ Features
🧑‍💼 Employee Management
- Create, Read, Update, Delete (CRUD) employees
- Search employees by keyword
- Pagination & Sorting
- RESTful API architecture
  
🔐 Security & Authentication
- Spring Security integration
- JDBC-based authentication with MySQL
- Role-Based Access Control (ADMIN / MANAGER / EMPLOYEE)
- JWT (JSON Web Token) Authentication
- Stateless authentication using Bearer tokens

💡 Example:

Authorization: Bearer <JWT_TOKEN>

🎨 Frontend (React)
- Login page with JWT authentication
- Dashboard UI
- Employee management interface
- Integration with secure backend APIs
- Responsive and modern UI
  
📘 API Documentation
- Swagger / OpenAPI for API testing and documentation

⚠️ Exception Handling
- Global exception handling for clean API responses
  
🛠 Tech Stack

Backend:

- Java
- Spring Boot
- Spring MVC
- Spring Security
- Spring Data JPA
- JWT
- JDBC Authentication

Frontend:

- React.js

Database:

- MySQL

Tools & Others:

- Swagger/OpenAPI
- Maven

📡 REST API Endpoints
Employee APIs
- GET /v1/employee
- GET /v1/employee/{id}
- POST /v1/employee
- PUT /v1/employee/{id}
- DELETE /v1/employee/{id}

Search & Pagination
- GET /v1/employee/search?keyword={keyword}
- GET /v1/employee/page?page=0&size=5

Authentication
- POST /auth/login

🔐 Security Flow
1. User logs in using credentials (JDBC + MySQL)
2. Spring Security validates user
3. JWT token is generated on successful authentication4
4. Frontend stores token
5.All protected APIs require:

Authorization: Bearer <JWT_TOKEN>

👨‍💻 Demo Credentials (if enabled)

ADMIN

Username: susan
Password: fun123

USER

Username: john
Password: fun123

🧠 Key Learnings
- Spring Security filter chain architecture
- Session-based vs JWT-based authentication
- Stateless authentication in REST APIs
- JDBC authentication with MySQL
- Full-stack integration (React + Spring Boot)
- Role-based authorization in real applications
- API security using Bearer tokens
 
📸 Screenshots

<img width="1907" height="632" alt="Screenshot 2026-06-28 215155" src="https://github.com/user-attachments/assets/43193db5-60e7-4fbc-a63c-1a9587f2f171" />


🚀 Future Enhancements
- Docker containerization 🐳
- Cloud deployment (AWS / Render / Railway)

📊 Project Status

👉 Evolving from a learning project into a production-style full-stack application

⭐ Tech Tags

#SpringBoot #ReactJS #JWT #SpringSecurity #MySQL #FullStack #Java #BackendDevelopment #SystemDesign #SoftwareEngineering
