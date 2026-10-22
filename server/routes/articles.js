const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all published articles with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const categorySlug = req.query.category;

        let query = `
            SELECT a.*, c.name as category_name, c.slug as category_slug
            FROM articles a
            LEFT JOIN categories c ON a.category_id = c.id
            WHERE a.status = 'published'
        `;
        const params = [];

        if (categorySlug) {
            query += ' AND c.slug = ?';
            params.push(categorySlug);
        }

        query += ' ORDER BY a.published_at DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [articles] = await pool.query(query, params);

        // Get total count
        let countQuery = 'SELECT COUNT(*) as total FROM articles WHERE status = "published"';
        const countParams = [];

        if (categorySlug) {
            countQuery += ' AND category_id = (SELECT id FROM categories WHERE slug = ?)';
            countParams.push(categorySlug);
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
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
});

// Get single article by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const [articles] = await pool.query(
            `SELECT a.*, c.name as category_name, c.slug as category_slug
             FROM articles a
             LEFT JOIN categories c ON a.category_id = c.id
             WHERE a.slug = ? AND a.status = 'published'`,
            [slug]
        );

        if (articles.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Increment view count
        await pool.query('UPDATE articles SET views = views + 1 WHERE id = ?', [articles[0].id]);

        res.json(articles[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Failed to fetch article' });
    }
});

// Search articles
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 2) {
            return res.status(400).json({ error: 'Search query must be at least 2 characters' });
        }

        const [articles] = await pool.query(
            `SELECT a.*, c.name as category_name, c.slug as category_slug
             FROM articles a
             LEFT JOIN categories c ON a.category_id = c.id
             WHERE a.status = 'published'
             AND (a.title LIKE ? OR a.content LIKE ? OR a.excerpt LIKE ?)
             ORDER BY a.published_at DESC
             LIMIT 20`,
            [`%${q}%`, `%${q}%`, `%${q}%`]
        );

        res.json({ articles, query: q });
    } catch (error) {
        console.error('Error searching articles:', error);
        res.status(500).json({ error: 'Failed to search articles' });
    }
});

// Get trending articles (most viewed in last 7 days)
router.get('/trending', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;

        const [articles] = await pool.query(
            `SELECT a.*, c.name as category_name, c.slug as category_slug
             FROM articles a
             LEFT JOIN categories c ON a.category_id = c.id
             WHERE a.status = 'published'
             AND a.published_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
             ORDER BY a.views DESC
             LIMIT ?`,
            [limit]
        );

        res.json(articles);
    } catch (error) {
        console.error('Error fetching trending articles:', error);
        res.status(500).json({ error: 'Failed to fetch trending articles' });
    }
});

// Get latest articles
router.get('/latest', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 6;

        const [articles] = await pool.query(
            `SELECT a.*, c.name as category_name, c.slug as category_slug
             FROM articles a
             LEFT JOIN categories c ON a.category_id = c.id
             WHERE a.status = 'published'
             ORDER BY a.published_at DESC
             LIMIT ?`,
            [limit]
        );

        res.json(articles);
    } catch (error) {
        console.error('Error fetching latest articles:', error);
        res.status(500).json({ error: 'Failed to fetch latest articles' });
    }
});

module.exports = router;
