# Use Node.js as the base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the Angular app source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Expose the Angular development server port
EXPOSE 4200

# Start the Angular app
CMD ["npm", "start"]
