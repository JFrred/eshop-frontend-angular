FROM node:17-alpine AS builder
COPY . ./eshop-frontend-angular
WORKDIR /eshop-frontend-angular
RUN npm i
RUN $(npm bin)/ng build --prod --aot --outputHashing=all

FROM nginx:1.17.1-alpine
COPY --from=builder /eshop-frontend-angular/dist/eshop-frontend-angular/ /usr/share/nginx/html
