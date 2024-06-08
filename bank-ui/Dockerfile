FROM node:20-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm cache clean -f

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]