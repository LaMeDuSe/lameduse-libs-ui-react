# Stage 1: Build the Storybook static files
FROM node:alpine AS builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Copy the rest of the app source codwe
COPY . .

RUN apk add --no-cache make
RUN make install_deps
RUN make build_storybook

# Stage 2: Serve the Storybook using NGINX
FROM nginx:alpine

# Copy the built Storybook static files from the builder stage
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Expose port 80 to access the content
EXPOSE 80

# Use the default NGINX configuration
CMD ["nginx", "-g", "daemon off;"]
