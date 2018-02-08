FROM  node:7.10.0-alpine

MAINTAINER Oskar Yildiz

RUN mkdir -p /app

WORKDIR /app

ADD package.json yarn.lock /app/

RUN yarn -D --pure-lockfile
RUN yarn global add pm2

COPY . /app/

EXPOSE 4000

CMD ["yarn", "build"]
CMD ["pm2", "start", "processes.json", "--no-daemon"]
