

## Folder structure

server/
├─ src/
│  ├─ config/
│  │  ├─ db.js           # MongoDB connection
│  │  └─ redis.js        # Redis connection for BullMQ
│  ├─ models/
│  │  └─ job.js          # MongoDB Job schema
│  ├─ queues/
│  │  └─ job.worker.js   # BullMQ Worker
│  ├─ routes/
│  │  └─ import.routes.js # API routes
│  ├─ services/
│  │  └─ jobImporter.service.js
│  ├─ app.js             # Express app
│  └─ server.js          # Server entry
├─ Dockerfile
├─ Dockerfile.worker
├─ package.json
├─ package-lock.json
└─ .env

## 1.Clone the repository
git clone https://github.com/Anuj5588/Job-importer-be.git
cd Job-importer-be/server


## 2.Install dependencies
 npm install

 ## 3. Create .env file
PORT=8000

# MongoDB URI (Atlas or local)
MONGO_URI=mongodb://mongo:27017/job-importer

# Redis configuration
REDIS_HOST=redis
REDIS_PORT=6379

## To start the server
   npm start
