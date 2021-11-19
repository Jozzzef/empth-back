FROM node:16.13.0-buster AS Production

WORKDIR /usr/src/empathy-backend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["node", "app.js"]