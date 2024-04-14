FROM node:16-alpine
RUN npm install -g @angular/cli@13
WORKDIR /app/TeamPlaningApp/
CMD ["sh", "-c", "echo 'Hello from Giovanni, please wait until the installation is finished,\
    and please consider recruiting me. 🙏 🙂 :) ...'\
    && npm install && ng serve --host 0.0.0.0"]