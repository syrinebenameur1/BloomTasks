🌟 PRODUCTIVITY WEB APP (MERN STACK)

🚀 PROJECT OVERVIEW
Goal:
Build a full-stack productivity web app where authenticated users can manage (create, edit, delete, filter) personal tasks with priorities and status, all within a beautiful, modern UI.

Tech Stack:
- MongoDB (database)
- Express.js (Node.js REST API backend)
- React (frontend, Vite for dev/build)
- Node.js (server runtime)

Additional Tools:
- Tailwind CSS for responsive, customizable design.
- JWT tokens for secure authentication.
- Axios for clean API calls from React.
- Context API + localStorage for frontend state and session management.

───────────────────────────────
1️⃣ BACKEND SETUP (/server)

A. Project Structure:
/server
  app.js           → Main server entry
  /models          → Mongoose models (User, Task)
  /controllers     → Auth & task logic
  /routes          → Route definitions (auth, tasks)
  /middleware      → JWT auth middleware
  /config          → Configuration or seed data
  .env             → Environment variables

B. Dependencies:
Install:
  npm install express mongoose cors dotenv bcryptjs jsonwebtoken
  npm install --save-dev nodemon

Purpose:
  - express: API creation
  - mongoose: MongoDB interaction
  - cors: Cross-origin resource sharing
  - dotenv: Manage environment variables
  - bcryptjs: Password hashing
  - jsonwebtoken: JWT authentication
  - nodemon: Hot reloading (development only)

C. .env File:
Example:
  PORT=8800
  MONGO_URI=your_mongo_db_uri
  JWT_SECRET=your_very_secret_key
  CLIENT_URL=http://localhost:5173

D. Core Backend Logic:
1. Models:
  - User: { name, email, password (hashed) } + timestamps
  - Task: { title, description, priority, status, userId } + timestamps

2. Middleware:
  JWT-based middleware validates tokens from Authorization headers (Bearer token) and attaches user data to req.user.

3. Routes:
  /api/auth:
    - POST /register → Create a new user
    - POST /login → Login user, return JWT
    - GET /me → Return authenticated user data

  /api/tasks:
    - GET /tasks → Fetch user tasks
    - POST /tasks → Create new task
    - PUT /tasks/:id → Update existing task
    - DELETE /tasks/:id → Delete task

4. Server (app.js):
  - Loads environment variables
  - Enables CORS for CLIENT_URL
  - Connects to MongoDB
  - Sets up Express, routes, and error handling
  - Listens on the defined PORT

───────────────────────────────
2️⃣ FRONTEND SETUP (/client)

A. Project Structure:
/client
  /src
    /components  → Reusable UI, modals, cards
    /pages       → Login, Register, Dashboard, Profile
    /context     → Auth management
    /api         → Axios instance/config
    App.jsx, main.jsx, index.css
  tailwind.config.js
  package.json

B. Setup:
  npm create vite@latest client -- --template react
  cd client
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install axios react-router-dom

Update tailwind.config.js:
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"]

C. Styling:
Tailwind CSS is imported into index.css.
All UI elements (forms, buttons, modals) use Tailwind utility classes for consistent design and responsiveness.

───────────────────────────────
D. Frontend Logic:

AuthContext:
  - Stores user, token, login, and logout methods
  - Persists session in localStorage
  - Auto-loads user on refresh

Login/Register Pages:
  - Clean, minimal design
  - Uses Axios to communicate with backend
  - Proper validation and error handling

Protected Routes:
  - Implemented via PrivateRoute wrapper
  - Redirects unauthenticated users to Login

───────────────────────────────
E. Task Management UI:

Dashboard:
  - Displays user tasks as cards
  - Filter/search by priority or status
  - Add/Edit/Delete tasks in real-time
  - Responsive and interactive

TaskModal:
  - Handles create/edit task forms
  - Smooth animations and validation
  - Consistent color scheme and layout

TaskCard:
  - Displays task summary with color indicators and icons
  - Edit/Delete buttons integrated

Profile Page:
  - Displays user info, task stats, and creation date
  - Fully dynamic, fetched from backend
  - Includes logout and navigation links

───────────────────────────────
3️⃣ RUNNING THE PROJECT

Start Backend:
  cd server
  npm install
  npm run dev

Start Frontend:
  cd client
  npm install
  npm run dev

App runs at:
  http://localhost:5173

───────────────────────────────
4️⃣ FEATURES & SECURITY

JWT Auth Flow:
  - JWT generated on login/register
  - Stored in localStorage
  - Used for all API calls via Authorization header
  - Middleware verifies token

Data Persistence:
  - MongoDB stores users and tasks
  - Each user accesses only their own data

Security:
  - Passwords hashed using bcrypt
  - JWT for authentication
  - CORS ensures only CLIENT_URL can access backend

───────────────────────────────
5️⃣ KEY BENEFITS

UI/UX:
  - Modern Tailwind styling
  - Smooth animations
  - Responsive and accessible design

Backend:
  - Clean, modular structure
  - RESTful routes
  - Secure authentication

Frontend:
  - Context-based state management
  - Real-time updates and clean architecture

───────────────────────────────
6️⃣ FUTURE ENHANCEMENTS

- File uploads
- Real-time updates (WebSockets)
- Team collaboration
- Calendar integration
- Email notifications

───────────────────────────────
7️⃣ DEPLOYMENT OPTIONS

Frontend:
  - Vercel or Netlify

Backend:
  - Render, Railway, or Heroku

Database:
  - MongoDB Atlas (cloud-hosted MongoDB)

───────────────────────────────
📜 LICENSE
Open-source project — free for personal or educational use.

───────────────────────────────
👨‍💻 AUTHOR
syrine ben ameur 
