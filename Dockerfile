# Builder Configuration:
FROM node:lts-alpine as build

WORKDIR /usr/local/app

# Copy application code to working directory
COPY . /usr/local/app/

# Download dependencies
RUN npm install

# Generate build artifacts
RUN npm run build

# Nginx Configuration:
FROM nginx:alpine as nginx

# Copying the nginx.conf 
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/apps/fitness /usr/share/nginx/html

# Expose port 80
EXPOSE 80

