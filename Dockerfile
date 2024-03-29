#docker swarm init

#docker build -t my-nuxt-app .

#docker stack deploy -c docker-compose.yml nuxt

FROM node:18.13-alpine
WORKDIR /nuxtDeploy
COPY . /nuxtDeploy
RUN npm ci
RUN npm run build
EXPOSE 80 443
CMD ["node", ".output/server/index.mjs"]