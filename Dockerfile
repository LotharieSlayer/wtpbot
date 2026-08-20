FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application source files
COPY . .

# Set the working directory to src
WORKDIR /app/src

# Command to run the bot
CMD ["node", "main.js"]
