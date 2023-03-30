## Building stage

FROM node:19-alpine as builder

WORKDIR /usr/src
COPY . .

RUN yarn install
RUN yarn parcel build

## Production stage

FROM node:19-alpine

COPY --from=builder /usr/src/dist/server/index.js /usr/src/app/server.js
COPY --from=builder /usr/src/dist/web /usr/src/app/web

WORKDIR /usr/src/app

ENV STATIC_DIR "/usr/src/app/web"
ENV NODE_ENV production

EXPOSE 3000
CMD ["node", "/usr/src/app/server.js"]
