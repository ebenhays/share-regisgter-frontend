FROM node:latest
ENV NODE_ENV=production
WORKDIR /usr/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT ["npm","start"]