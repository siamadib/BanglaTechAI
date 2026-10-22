const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Admin authentication middleware (to be implemented in Phase 3)
const requireAuth = (req, res, next) => {
    // Placeholder - will be implemented with session-based auth
    res.status(401).json({ error: 'Authentication required' });
};

// Admin dashboard statistics
router.get('/stats', requireAuth, async (req, res) => {
    try {
        const [articleCount] = await pool.query('SELECT COUNT(*) as total FROM articles');
        const [publishedCount] = await pool.query('SELECT COUNT(*) as total FROM articles WHERE status = "published"');
        const [categoryCount] = await pool.query('SELECT COUNT(*) as total FROM categories');
        const [aiToolCount] = await pool.query('SELECT COUNT(*) as total FROM ai_tools');
        const [contactCount] = await pool.query('SELECT COUNT(*) as total FROM contact_messages WHERE is_read = FALSE');
        const [subscriberCount] = await pool.query('SELECT COUNT(*) as total FROM newsletter_subscribers WHERE is_active = TRUE');

        res.json({
            articles: articleCount[0].total,
            published: publishedCount[0].total,
            categories: categoryCount[0].total,
            aiTools: aiToolCount[0].total,
            unreadMessages: contactCount[0].total,
            subscribers: subscriberCount[0].total
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Get all articles (including drafts) for admin
router.get('/articles', requireAuth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const status = req.query.status;

        let query = `
            SELECT a.*, c.name as category_name
            FROM articles a
            LEFT JOIN categories c ON a.category_id = c.id
        `;
        const params = [];

        if (status) {
            query += ' WHERE a.status = ?';
            params.push(status);
        }

        query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [articles] = await pool.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM articles';
        const countParams = [];

        if (status) {
            countQuery += ' WHERE status = ?';
            countParams.push(status);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        const total = countResult[0].total;

        res.json({
            articles,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching admin articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// Get all categories for admin
router.get('/categories', requireAuth, async (req, res) => {
    try {
        const [categories] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching admin categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get all AI tools for admin
router.get('/ai-tools', requireAuth, async (req, res) => {
    try {
        const [tools] = await pool.query('SELECT * FROM ai_tools ORDER BY name ASC');
        res.json(tools);
    } catch (error) {
        console.error('Error fetching admin AI tools:', error);
        res.status(500).json({ error: 'Failed to fetch AI tools' });
    }
});

// Get contact messages for admin
router.get('/messages', requireAuth, async (req, res) => {
    try {
        const [messages] = await pool.query(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        );
        res.json(messages);
    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Get newsletter subscribers for admin
router.get('/subscribers', requireAuth, async (req, res) => {
    try {
        const [subscribers] = await pool.query(
            'SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC'
        );
        res.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Failed to fetch subscribers' });
    }
});

module.exports = router;
