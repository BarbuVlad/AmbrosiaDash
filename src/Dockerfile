# pull base image
# node:latest contain Linux image
FROM node:latest

#create folder strucure
RUN mkdir -p /app/src

#set working directory
WORKDIR /app/src

#copy package.json to /app/src
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
