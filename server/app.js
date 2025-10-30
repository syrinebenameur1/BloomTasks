// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');

// Load env vars
dotenv.config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// CORS middleware FIRST
// Normalize helper to avoid trailing-slash and case issues
const normalizeOrigin = (value) => {
    if (!value) return value;
    try {
        const trimmed = value.replace(/\/$/, '');
        return trimmed.toLowerCase();
    } catch (_) {
        return value;
    }
};

const allowedOrigins = [
    process.env.CLIENT_URL,
    'https://bloomtasks-frontend.onrender.com',
    // 'http://localhost:5173', // keep for local dev
]
    .filter(Boolean)
    .map(normalizeOrigin);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // allow non-browser requests
        const normalized = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalized)) return callback(null, true);
        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204,
}));

// Middleware
app.use(express.json());
app.use(compression());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// DB connection
const PORT = process.env.PORT || 8800;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('❌ MONGO_URI not set in .env file!');
    process.exit(1);
}
mongoose.connect(MONGO_URI).then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
});
