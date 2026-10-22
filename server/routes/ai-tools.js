const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all AI tools
router.get('/', async (req, res) => {
    try {
        const { pricing, category, featured } = req.query;
        let query = 'SELECT * FROM ai_tools WHERE 1=1';
        const params = [];

        if (pricing) {
            query += ' AND pricing = ?';
            params.push(pricing);
        }

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        if (featured === 'true') {
            query += ' AND is_featured = TRUE';
        }

        query += ' ORDER BY rating DESC, total_reviews DESC';

        const [tools] = await pool.query(query, params);

        res.json(tools);
    } catch (error) {
        console.error('Error fetching AI tools:', error);
        res.status(500).json({ error: 'Failed to fetch AI tools' });
    }
});

// Get single AI tool by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const [tools] = await pool.query(
            'SELECT * FROM ai_tools WHERE slug = ?',
            [slug]
        );

        if (tools.length === 0) {
            return res.status(404).json({ error: 'AI tool not found' });
        }

        res.json(tools[0]);
    } catch (error) {
        console.error('Error fetching AI tool:', error);
        res.status(500).json({ error: 'Failed to fetch AI tool' });
    }
});

// Get featured AI tools
router.get('/featured', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;

        const [tools] = await pool.query(
            'SELECT * FROM ai_tools WHERE is_featured = TRUE ORDER BY rating DESC LIMIT ?',
            [limit]
        );

        res.json(tools);
    } catch (error) {
        console.error('Error fetching featured AI tools:', error);
        res.status(500).json({ error: 'Failed to fetch featured AI tools' });
    }
});

module.exports = router;
