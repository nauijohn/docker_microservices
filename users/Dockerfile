# ----------------------
# Stage 1: Development / Build
# ----------------------
FROM node:22-alpine AS development

WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=${GITHUB_TOKEN}

# Install deps (including dev for build)
RUN pnpm install

# Copy source code
COPY . .

# Default command for dev
CMD ["pnpm", "start:dev"]

# # ----------------------
# # Stage 2: Test
# # ----------------------
# FROM development AS test

# COPY pnpm-workspace.yaml ./

# # Override the default command to run tests
# CMD ["pnpm", "test:e2e"]
