FROM node:16.14.0 as server

WORKDIR /services/server
COPY ./services/server/package.json ./services/server/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./services/server/ ./

CMD ["yarn", "start:dev"]


FROM node:16.14.0 as client

WORKDIR /services/client
COPY ./services/client/package.json ./services/client/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./services/client/ ./

CMD ["yarn", "run", "dev", "--host"]
