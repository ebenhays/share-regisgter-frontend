FROM node:latest
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --force
COPY . .
# RUN npm run build
ENTRYPOINT ["npm","start"]