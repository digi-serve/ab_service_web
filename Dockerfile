##
## digiserve/ab-web:develop
##
## This is our web server for our incoming connections. We bundle
## nginx with our UI resources necessary for running our platform.
##
## Docker Commands:
## ---------------
## $ docker build -t digiserve/ab-web:develop .
## $ docker push digiserve/ab-web:develop
##

FROM nginx

RUN git clone --recursive https://github.com/digi-serve/ab_service_web.git app && cd app && git checkout develop

COPY app/default.conf /etc/nginx/conf.d/default.conf


