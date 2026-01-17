FROM node:18.20.8-alpine
WORKDIR app
COPY . .
RUN npm install
EXPOSE 1000
CMD ["node","index.js"]