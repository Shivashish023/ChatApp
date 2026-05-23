CHAP – Real-Time Chat Application

CHAP is a full-stack, real-time chat application built using modern web technologies. It enables users to communicate instantly through group-based messaging with a smooth and responsive UI.

🛠️ Tech Stack
Backend
Node.js
Express.js
MongoDB
Socket.IO
Frontend
React (with Vite)
Redux Toolkit
Tailwind CSS
🚀 Features
🔐 User registration and login (JWT-based authentication)
👥 Create and manage chat groups (rooms)
⚡ Real-time messaging using Socket.IO
🕒 Persistent message history
🟢 User presence / "other users" logic
🧩 Modular architecture with separate routes and controllers
🔒 Protected routes with authentication middleware
📁 Project Structure
Backend

backend/
├── server.js
├── routes/
│ ├── userRoute.js
│ ├── groupRoute.js
│ └── messageRoute.js
├── controllers/ (handles business logic & DB operations)
├── models/
│ ├── userModel.js
│ ├── roomModel.js
│ └── messageModel.js
├── socket/
│ └── socket.js (Socket.IO configuration)
├── middlewares/
│ └── isAuthenticated.js
└── config/
└── database.js

Frontend

frontend/
└── src/
├── components/
│ ├── Login
│ ├── Register
│ ├── Home
│ ├── GroupList
│ └── Messages
├── hooks/ (e.g. useGetGroups, realtime hooks)
├── redux/
│ ├── userSlice.js
│ ├── messageSlice.js
│ ├── socketSlice.js
│ └── store.js

⚙️ Getting Started
🔧 Backend Setup

cd backend
npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Run the server:

npm start
or
npm run dev

Server will run at:
http://localhost:5000

🎨 Frontend Setup

cd frontend
npm install
npm run dev

Open in browser:
http://localhost:5173/

