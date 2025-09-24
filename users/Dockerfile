# ----------------------
# Stage 1: Development / Build
# ----------------------
FROM node:22-alpine AS development

WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install deps (including dev for build)
RUN pnpm install

# Copy source code
COPY . .

# Default command for dev
CMD ["pnpm", "start:dev"]
