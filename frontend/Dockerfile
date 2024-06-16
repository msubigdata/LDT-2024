FROM node:20-alpine

RUN corepack enable

WORKDIR /app

COPY . .
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
RUN yarn install --immutable

ENTRYPOINT ./run_front.sh
