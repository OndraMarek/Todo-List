FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3001

CMD [ "npm", "run", "start" ]