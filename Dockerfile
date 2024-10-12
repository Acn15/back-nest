FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3015

CMD ["npm", "run", "start:dev"]
