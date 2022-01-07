FROM node:lts-alpine
RUN mkdir -p /code && chown -R node:node /code

WORKDIR /code

COPY --chown=node:node . .
USER node

COPY package.json /code/package.json
RUN npm install
RUN ls
RUN npm run build

COPY . /code
EXPOSE 3000
CMD [ "npm", "start" ]
