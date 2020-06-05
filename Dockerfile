FROM node:8.11.4

RUN mkdir -p /home/node/client
WORKDIR /home/node/client

COPY package*.json ./
RUN npm install

COPY . .

ENV REACT_APP_CREDITOR_BASE_URL=http://app

EXPOSE 3000
CMD ["npm", "start"]