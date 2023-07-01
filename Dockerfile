#stage 1 
FROM node:latest as node 
WORKDIR /app 
COPY . . 
RUN npm install 
RUN npm run build --prod
#stage 2 
FROM nginx:alpine 
COPY --from=node /app/dist/despesas-frontend-angular /usr/share/nginx/html
COPY dp-access-us-east-1.pem .
COPY nginx.conf /etc/nginx/conf.d/default.conf