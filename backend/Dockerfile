FROM node:15.14.0-alpine3.10

WORKDIR /app

COPY package.json .

# RUN npm install
RUN npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack

COPY . .


EXPOSE 5000

CMD ["npm","run","start:dev"]