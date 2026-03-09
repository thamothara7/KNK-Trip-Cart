require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']); // Fix for local DNS issues resolving MongoDB Atlas SRV records
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Ensure uploads directory exists ────────────────────────────────────────
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ─── Multer – disk storage ───────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `pkg-${unique}${ext}`);
    },
});

const fileFilter = (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    if (allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed.'));
    }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({ origin: '*' }));

// ─── Serve uploaded images as static files ───────────────────────────────────
app.use('/uploads', express.static(uploadsDir));

// ─── Image Upload Endpoint ───────────────────────────────────────────────────
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No image file provided.' });
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl, filename: req.file.filename });
});

// ─── Delete uploaded image ───────────────────────────────────────────────────
app.delete('/api/upload/:filename', (req, res) => {
    const filePath = path.join(uploadsDir, req.params.filename);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'Deleted successfully.' });
    } else {
        res.status(404).json({ error: 'File not found.' });
    }
});

// ─── Package & Gallery Routes (MongoDB CRUD) ──────────────────────────────────────────
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));

// ─── Database Connection ─────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/knktripcart')
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.warn('⚠️ MongoDB not running — DB features disabled.', err.message));

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📁 Images served at http://localhost:${PORT}/uploads/`);
});
