# Base Java image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy the generated JAR
COPY target/cruddemo-0.0.1-SNAPSHOT.jar app.jar


# Expose Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]