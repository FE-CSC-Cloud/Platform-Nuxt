FROM node:18.13-alpine
WORKDIR /nuxtDeploy
COPY . /nuxtDeploy
RUN npm ci
RUN npm run build
EXPOSE 80 443
CMD ["node", ".output/server/index.mjs"]