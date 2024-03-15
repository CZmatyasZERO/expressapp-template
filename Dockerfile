FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV PORT=80
EXPOSE 80

COPY . .
CMD ["npm", "start"]