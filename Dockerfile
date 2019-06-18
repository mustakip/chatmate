FROM node:alpine

COPY . /chatmate-img


WORKDIR /chatmate-img

RUN npm install

EXPOSE 3000

CMD ["npm","start"]