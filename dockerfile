FROM node:22-alpine AS build

ARG VITE_API_URL
ARG VITE_DEBUG_MODE

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_DEBUG_MODE=$VITE_DEBUG_MODE

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]