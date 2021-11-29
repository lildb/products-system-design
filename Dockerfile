FROM node:14

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 8080

CMD [ "npm", "server-dev" ]