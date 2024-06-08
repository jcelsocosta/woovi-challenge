FROM node:20-alpine as builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

COPY package.json /app/

RUN npm cache clean -f

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]