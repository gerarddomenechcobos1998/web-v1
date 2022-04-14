FROM node:16

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

RUN mkdir /web
WORKDIR /web
COPY package*.json ./
RUN yarn install
COPY . .
# RUN yarn build
CMD ["yarn","start"]