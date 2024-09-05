FROM node:18-alpine AS build
ARG ENVIRONMENT=dev
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . .
RUN npm run build:$ENVIRONMENT

FROM nginx:1.17.1-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]