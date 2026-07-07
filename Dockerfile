# ---------- Build Stage ----------
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy pom.xml first and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/cruddemo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]