# ----------------------------
# Stage 1: Base - Common setup
# ----------------------------
FROM node:22-alpine3.20 AS base

# Install pnpm globally once, reused across stages
RUN npm install -g pnpm

WORKDIR /usr/src/app

# ----------------------------
# Stage 2: Builder - Build app
# ----------------------------
FROM base AS build

# Copy only dependency manifests first (better layer caching)
COPY package.json pnpm-lock.yaml ./

# Install all deps (dev + prod)
RUN pnpm install --frozen-lockfile

# Copy rest of the source code
COPY . .

# Build the app
RUN pnpm run build


# ----------------------------
# Stage 3: Deploy - Production image
# ----------------------------
FROM base AS deploy

WORKDIR /usr/src/app

# Build-time metadata (via --build-arg)
ARG BUILD_DATE
ARG VERSION
ARG COMMIT_SHA
ARG ENVIRONMENT
ARG MICROSERVICE_NAME
ARG APP_RUNNING_ENV
ARG NODE_ENV
ARG NATS_SERVERS
ARG LOGGER_LEVEL
ARG LOGGER_ENABLED
ARG LOGGER_CLOUD
ARG TOKEN_LOGTAIL_LOGGER
ARG DB_USER_MONGO
ARG DB_KEY_MONGO
ARG DB_HOST_MONGO
ARG DB_CONTAINER_NAME_MONGO
ARG DB_SYNCHRONIZE_MONGO
ARG DB_HOST_POSTGRES
ARG DB_PORT_POSTGRES
ARG DB_USERNAME_POSTGRES
ARG DB_PASSWORD_POSTGRES
ARG DB_CONTAINER_NAME_POSTGRES
ARG DB_SYNCHRONIZE_POSTGRES
ARG ENCRYPT_SECRET_KEY
ARG ENCRYPT_DATABASE_SECRET_KEY
ARG BCRYPT_SALT_OR_ROUNDS
ARG REDIS_CLOUD_HOST
ARG REDIS_CLOUD_PORT
ARG REDIS_CLOUD_PASSWORD
ARG REDIS_CLOUD_TTL
ARG REDIS_NUMBER_DB

# Export args as environment variables (runtime)
ENV BUILD_DATE=${BUILD_DATE} \
    VERSION=${VERSION} \
    COMMIT_SHA=${COMMIT_SHA} \
    ENVIRONMENT=${ENVIRONMENT} \
    MICROSERVICE_NAME=${MICROSERVICE_NAME} \
    APP_RUNNING_ENV=${APP_RUNNING_ENV} \
    NODE_ENV=${NODE_ENV:-production} \
    NATS_SERVERS=${NATS_SERVERS} \
    LOGGER_LEVEL=${LOGGER_LEVEL} \
    LOGGER_ENABLED=${LOGGER_ENABLED} \
    LOGGER_CLOUD=${LOGGER_CLOUD} \
    TOKEN_LOGTAIL_LOGGER=${TOKEN_LOGTAIL_LOGGER} \
    DB_USER_MONGO=${DB_USER_MONGO} \
    DB_KEY_MONGO=${DB_KEY_MONGO} \
    DB_HOST_MONGO=${DB_HOST_MONGO} \
    DB_CONTAINER_NAME_MONGO=${DB_CONTAINER_NAME_MONGO} \
    DB_SYNCHRONIZE_MONGO=${DB_SYNCHRONIZE_MONGO} \
    DB_HOST_POSTGRES=${DB_HOST_POSTGRES} \
    DB_PORT_POSTGRES=${DB_PORT_POSTGRES} \
    DB_USERNAME_POSTGRES=${DB_USERNAME_POSTGRES} \
    DB_PASSWORD_POSTGRES=${DB_PASSWORD_POSTGRES} \
    DB_CONTAINER_NAME_POSTGRES=${DB_CONTAINER_NAME_POSTGRES} \
    DB_SYNCHRONIZE_POSTGRES=${DB_SYNCHRONIZE_POSTGRES} \
    ENCRYPT_SECRET_KEY=${ENCRYPT_SECRET_KEY} \
    ENCRYPT_DATABASE_SECRET_KEY=${ENCRYPT_DATABASE_SECRET_KEY} \
    BCRYPT_SALT_OR_ROUNDS=${BCRYPT_SALT_OR_ROUNDS} \
    REDIS_CLOUD_HOST=${REDIS_CLOUD_HOST} \
    REDIS_CLOUD_PORT=${REDIS_CLOUD_PORT} \
    REDIS_CLOUD_PASSWORD=${REDIS_CLOUD_PASSWORD} \
    REDIS_CLOUD_TTL=${REDIS_CLOUD_TTL} \
    REDIS_NUMBER_DB=${REDIS_NUMBER_DB}

# Copy dependency manifests and install only production deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile && \
    pnpm store prune && \
    rm -rf ~/.pnpm-store

# Copy built assets from builder
COPY --from=build /usr/src/app/dist ./dist

# Run as non-root for better security
# USER caserita-stg

# Expose application port
# EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
