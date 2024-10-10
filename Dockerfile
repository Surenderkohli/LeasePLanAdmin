FROM node:alpine
RUN npm i -g pnpm
WORKDIR /app
COPY package.json .
RUN pnpm i --force
COPY . .
RUN pnpm run build
CMD ["pnpm" , "start"]
##