FROM node:18

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm","run","start" ]
