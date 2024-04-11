FROM node:16-alpine
RUN npm install -g @angular/cli@13
WORKDIR /app
# CMD ["ng", "serve", "--host", "0.0.0.0"]