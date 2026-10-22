const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for development
    crossOriginEmbedderPolicy: false
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');
const aiToolRoutes = require('./routes/ai-tools');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
const adminRoutes = require('./routes/admin');

app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ai-tools', aiToolRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Serve HTML pages for all routes (SPA-like behavior)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/articles', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/articles.html'));
});

app.get('/article', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/article.html'));
});

app.get('/ai-tools', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/ai-tools.html'));
});

app.get('/tech-guides', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tech-guides.html'));
});

app.get('/comparisons', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/comparisons.html'));
});

app.get('/category', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/category.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

app.get('/privacy-policy', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/privacy-policy.html'));
});

app.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/terms.html'));
});

app.get('/disclaimer', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/disclaimer.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin.html'));
});

app.get('/admin-login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/admin-login.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✓ Press Ctrl+C to stop\n`);
});
