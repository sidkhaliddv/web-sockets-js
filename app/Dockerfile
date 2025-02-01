from node:23-alpine
workdir /app
copy package.* ./
run npm i
copy ./ ./
cmd ["node", "index.js"]
