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

##
## use our service-cli image to git checkout our files
##
FROM digiserve/service-cli:develop AS stage1

RUN git clone --recursive https://github.com/digi-serve/ab_service_web.git app && cd app && git checkout develop



##
## Now copy them into the base nginx container
## (which doen't have git, btw)
FROM nginx AS stage2

COPY --from=stage1 /app /app
RUN rm /etc/nginx/conf.d/default.conf && cp /app/default.conf /etc/nginx/conf.d/default.conf

