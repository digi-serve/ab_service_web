##
## digiserve/ab-web
##
## This is our web server for our incoming connections. We bundle
## nginx with our UI resources necessary for running our platform.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-web:master .
## $ docker push digiserve/ab-web:master
##

FROM nginx

COPY . /app

RUN rm /etc/nginx/conf.d/default.conf && cp /app/default.conf /etc/nginx/conf.d/default.conf && \
    rm -f /etc/nginx/conf.d/custom_log.conf && cp /app/custom_log.conf /etc/nginx/conf.d/custom_log.conf
