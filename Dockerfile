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
# Copy Nginx template for envsubst (automatic replacement of ${APP_PORT})
COPY docker/nginx.conf.template /etc/nginx/templates/default.conf.template
# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html
# Use non-root user for security
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    mkdir -p /etc/nginx/templates && \
    chown -R nginx:nginx /etc/nginx/templates
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid
USER nginx
CMD ["nginx", "-g", "daemon off;"]
