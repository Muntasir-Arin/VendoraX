# Use the official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the entire project
COPY . .

# Build the app for production
RUN yarn build

# Expose the port that the app will run on
EXPOSE 5173

# Start the app
CMD ["yarn", "preview"]
