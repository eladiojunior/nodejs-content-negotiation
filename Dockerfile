FROM node:14

WORKDIR /node-app

COPY package.json .

RUN npm install --quiet
RUN npm install nodemon -g --quiet
COPY . .

EXPOSE 8081
