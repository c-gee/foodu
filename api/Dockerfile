FROM node:16-alpine AS build

WORKDIR /api

COPY package*.json ./
COPY ./tsconfig.json ./
COPY src src
COPY prisma prisma

RUN npm install
RUN npm run generate
RUN npm run build

FROM node:16-alpine

WORKDIR /api

COPY --from=build /api/package.json package.json
COPY --from=build /api/dist dist

EXPOSE 4000

CMD [ "npm", "start" ]
