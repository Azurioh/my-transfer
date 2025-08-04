FROM node:lts-alpine

WORKDIR /_build

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]