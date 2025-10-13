## 🗺️ Índice

- [💻 Microservice Entity](#-microservice-vista-alegre-servicepoint-ms)
- [📄 Requirements](#-requirements)
- [🚀 Installation](#-installation)
- [📖 Project Structure](#-project-structure)
- [📄 Environment Variables](#-environment-variables)
- [🛠️ Scripts Disponibles](#️-scripts-disponibles)
- [🚀 Deployment](#-deployment)
    - [Docker](#docker)
    - [Docker-compose](#docker-compose)
- [🙋 Authors](#-authors)

# 💻 Microservice vista-alegre-servicepoint-ms

This is a microservice designed with a hexagonal architecture, also known as Ports and Adapters. This architecture focuses on separating business logic (the domain and the application) from the infrastructure (the database, external APIs, web frameworks, etc.). This allows the application to be more robust, easier to test, and adaptable to different technologies without modifying the core business.


## 📄 Requirements

To install each hexagonal microservices, to be able to use it, you have to have node v22.14.0 installed, in addition you must also install pnpm globally, open your terminal and execute the following command:

```bash

npm install -g pnpm@latest-10

```

- Node.js >= 22.14.0
- pnpm >= 10.x

## 🚀 Installation

To get this microservice up and running, follow these steps. It's recommended to use pnpm as your package manager.

```bash
# Install dependencies
pnpm install

# Development
pnpm run start:dev

# Production
pnpm run start:prod

# Build
pnpm run build

```
## 📖 Project Structure

The project follows a clear structure based on hexagonal architecture to maintain the separation of responsibilities:

* `container/`: The main container of the microservice.
    * `core/` : Contains the core business logic.
        * `app/`: The application layer and use cases.
            * `commands/` : Logic for write operations (create, update, delete) in the database.
            * `queries/` : Logic for query (read) operations in the database.
            * `utils/` : Utility functions and methods.
        * `domain/` : The core of the application.
            * `enums/` : Definition of enums.
            * `entities/` : Structure of business entities.
            * `interfaces/` : Data contracts (request/response).
    * `infra/` : The infrastructure layer.
        * `api/` : Adapters for HTTP controllers.
        * `client/` : Adapters for integration with external services or APIs.
        * `context/` : Managing environment and configuration variables.
        * `handler/` : Adapters for event sourcing.
        * `manager/` : Adapters for reading and writing to the database.
        * `validators/` : Input and output data validators.


## 📄 Environment Variables

To run this project, you will need to add the following environment variables to your .env.development.local file


```
.env.development.local

# APP
MICROSERVICE_NAME=vista-alegre-servicepoint-ms
APP_RUNNING_ENV=HTTP # NATS
NODE_ENV=development # production
PORT=3000

# NATS
NATS_SERVERS="nats://localhost:4222"

# LOGGER
LOGGER_LEVEL=info
LOGGER_ENABLED=true
LOGGER_CLOUD=logtail
TOKEN_LOGTAIL_LOGGER=******

# DATABASE
DB_USER_MONGO=******
DB_KEY_MONGO=******
DB_HOST_MONGO=******
DB_CONTAINER_NAME_MONGO=******

# POSTGRES DATABASE
DB_HOST_POSTGRES=******
DB_PORT_POSTGRES=******
DB_USERNAME_POSTGRES=******
DB_PASSWORD_POSTGRES=******
DB_CONTAINER_NAME_POSTGRES=******
DB_SYNCHRONIZE_POSTGRES=******

# ENCRYPTION
ENCRYPT_SECRET_KEY=******
ENCRYPT_DATABASE_SECRET_KEY=******

# CACHE REDIS
REDIS_CLOUD_HOST=******
REDIS_CLOUD_PORT=******
REDIS_CLOUD_PASSWORD=******
REDIS_CLOUD_TTL= 300
REDIS_NUMBER_DB=

# PROXIES
BASE_URL_DATTEBAYO=https://dattebayo-api.onrender.com


```

## 🛠️ Scripts Disponibles

Here are some related projects

```
# Desarrollo
pnpm run start:dev      # Ejecuta en modo desarrollo con watch
pnpm run start          # Ejecuta en modo normal
pnpm run start:prod     # Ejecuta en modo producción

# Build
pnpm run build          # Compila el proyecto

# Testing
pnpm run test           # Ejecuta tests unitarios
pnpm run test:watch     # Ejecuta tests en modo watch
pnpm run test:e2e       # Ejecuta tests end-to-end
pnpm run test:cov       # Ejecuta tests con coverage

# Linting y Formato
pnpm run lint           # Ejecuta ESLint
pnpm run format         # Formatea código con Prettier

```

## 🚀 Deployment

To deploy this project with docker:

```docker

# Stage 1: Base - Install pnpm
# This stage is responsible for installing pnpm globally, which will then be available
# in subsequent stages that build upon this base.
FROM node:22-alpine3.20 AS base

# Install pnpm globally. This is a one-time operation for the base image.
RUN npm install -g pnpm

# Stage 2: Builder - Build the application
# This stage handles installing all dependencies (including dev dependencies) and building the application.
FROM base AS build

WORKDIR /user/src/app

# Copy package.json and pnpm-lock.yaml first to leverage Docker's layer caching.
# If these files don't change, the pnpm install step won't need to re-run.
COPY package.json pnpm-lock.yaml ./

# Copy the entire application source code.
# This should happen after copying package.json/pnpm-lock.yaml and running pnpm install
# to ensure that changes to source code don't invalidate the dependency layer.
COPY . .

# Install all dependencies (development and production).
# --frozen-lockfile ensures that the exact versions specified in pnpm-lock.yaml are used,
# which is crucial for reproducible builds.
RUN pnpm install --frozen-lockfile

# Build the application. This command will execute the 'build' script defined in package.json.
RUN pnpm run build

# Stage 3: Deploy - Run the application in production
# This stage creates a lean image containing only the necessary production dependencies and built assets.
FROM base AS deploy

WORKDIR /user/src/app

# Copy package.json and pnpm-lock.yaml again.
# This allows pnpm to install only production dependencies in this stage,
# creating a smaller and more secure final image.
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies.
# --prod ensures only dependencies required for runtime are installed.
# --frozen-lockfile maintains consistency with the lockfile.
RUN pnpm install --prod --frozen-lockfile

# Copy the built application files from the 'build' stage.
# This includes the compiled JavaScript, static assets, etc.
COPY --from=build /user/src/app/dist ./dist

# Set the environment variable for production.
ENV NODE_ENV=production

# Optional: Run as a non-root user for better security practices.
# Uncomment the line below if you have a 'node' user configured in your base image.
# USER node

# Expose the port your application listens on.
EXPOSE 3000

# Define the command to start your application when the container launches.
CMD ["node", "dist/main.js"]

```

docker-compose:


```docker

services:
  # nats-server:
  #   image: nats:latest ## if you need to raise the microservice independently

  caserita-{{ entity }}-ms:
    container_name: caserita-{{ entity }}-ms
    image: caserita-{{ entity }}-ms-app-local:v1.0.0
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - .env.development.local
    ports:
      - '3000:3000'
    volumes: []
    environment:
      - NODE_ENV=production
      - NATS_SERVERS=nats://nats-server:4222
    depends_on:
      - nats-server

```

## 🙋 Authors

- Powered by ❤️ [BrolyDev](https://www.linkedin.com/in/jesusyelsinbroly)