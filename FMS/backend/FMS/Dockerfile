# ─── Stage 1: Build ────────────────────────────────────────
FROM maven:3.9.2-eclipse-temurin-17 AS builder
WORKDIR /workspace
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# ─── Stage 2: Run ──────────────────────────────────────────
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /workspace/target/FMS-1.0.jar FMS-1.0.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","FMS-1.0.jar"]
