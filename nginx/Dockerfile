FROM nginx:latest

COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
RUN rm /etc/nginx/conf.d/default.conf

ENV HOME=/home/app
RUN mkdir $HOME
WORKDIR $HOME

CMD /bin/bash -ceu "envsubst '\$BACKEND_HOST \$FRONTEND_HOST' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/nginx.conf && exec nginx -g 'daemon off;'"
