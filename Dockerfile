# Base
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Development
FROM base as development
COPY . .
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Build
FROM base as build
COPY . .
RUN npm run build

# Production
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
# Use non-root user for security (nginx user exists in nginx-alpine)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
