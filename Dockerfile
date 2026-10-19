FROM nginx:alpine

RUN apk upgrade --no-cache \
    && rm /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

RUN adduser -u 10014 -D -H -G nginx appuser \
    && chown -R 10014:nginx /usr/share/nginx/html \
    && chown -R 10014:nginx /var/log/nginx \
    && chown -R 10014:nginx /var/cache/nginx

USER 10014

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
