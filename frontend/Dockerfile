FROM node:18-alpine

RUN apk add --no-cache nginx

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

RUN rm -rf /usr/share/nginx/html/* \
    && cp -r build/* /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
