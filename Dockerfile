FROM node:14 as build

WORKDIR /usr/local/app
COPY ./ /usr/local/app/

RUN npm config set legacy-peer-deps true
RUN npm install
RUN npm run build

FROM nginx:latest
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist /usr/share/nginx/html

EXPOSE 80