# Use Nginx for serving the Next.js app with SSL
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Ensure SSL directory exists before copying certificates
RUN mkdir -p /etc/ssl/certs

# Copy SSL certificates securely (using your_domain.crt and your_domain.key)
COPY --chown=root:root ssl/pajiniweb-dev.com.crt /etc/ssl/certs/pajiniweb-dev.com.crt
COPY --chown=root:root ssl/pajiniweb-dev.com_key.txt /etc/ssl/certs/pajiniweb-dev.com_key.txt

# Set strict permissions for SSL certificates
RUN chmod 600 /etc/ssl/certs/pajiniweb-dev.com.crt /etc/ssl/certs/pajiniweb-dev.com_key.txt

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the already-built Next.js static files
COPY --chown=nginx:nginx out/ /usr/share/nginx/html

# Ensure Nginx user has proper ownership of the served files
RUN chown -R nginx:nginx /usr/share/nginx/html

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
