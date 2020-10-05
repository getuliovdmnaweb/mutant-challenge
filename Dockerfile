FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN yarn install && yarn build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 8080
CMD [ "yarn", "deploy" ]