# Step 1: Use an official Node.js runtime as a parent image
FROM node:alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Step 4: Install dependencies inside the container
RUN yarn install --frozen-lockfile

# Step 5: Copy the rest of your application code into the container
COPY . .

# Step 6: Build Prisma client
RUN npx prisma generate

EXPOSE 4000

# Step 9: Define the command to run the app
CMD ["yarn", "start"]

