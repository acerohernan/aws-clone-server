FROM node:18-alpine

WORKDIR /usr/app

COPY package*.json .

RUN yarn install --production

COPY . .

EXPOSE 3000
CMD ["yarn", "start"]