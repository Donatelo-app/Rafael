FROM node:carbon

ARG APP_DIR="/opt/app/"

COPY . "$APP_DIR"
WORKDIR "$APP_DIR"

COPY package*.json ./

ENV TELEGRAM_BOT_TOKEN ""
ENV APP_DOMEN ""
ENV SERVER_IP ""

RUN npm i --only=production

EXPOSE 8080

CMD [ "node", "index.js" ]
CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:8080", "app:app"]
