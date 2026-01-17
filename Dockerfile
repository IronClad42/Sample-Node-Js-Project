FROM node:12.2.0-alpine
WORKDIR app
COPY . .
RUN npm install
EXPOSE 1000
CMD ["node","index.js"]