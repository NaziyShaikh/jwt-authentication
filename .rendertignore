FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN cd frontend && npm install && npm run build
RUN cd backend && npm install

EXPOSE 3000
CMD ["npm", "start"]