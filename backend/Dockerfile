FROM node:15.14.0-alpine3.10

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


EXPOSE 5000

CMD ["npm", "start"]