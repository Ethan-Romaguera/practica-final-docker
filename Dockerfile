FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY images /usr/share/nginx/html/images