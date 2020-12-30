FROM node:current-slim
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json .
RUN npm install
RUN npm run build
ENTRYPOINT ["npm","start"]