# Use an official JDK image as the base image
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/adress-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your service runs on
EXPOSE 8003

# Run the JAR file
ENTRYPOINT ["java", "-jar", "app.jar"]
