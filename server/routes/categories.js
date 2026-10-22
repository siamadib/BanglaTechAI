const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const [categories] = await pool.query(
            'SELECT * FROM categories ORDER BY name ASC'
        );

        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get single category by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;

        const [categories] = await pool.query(
            'SELECT * FROM categories WHERE slug = ?',
            [slug]
        );

        if (categories.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(categories[0]);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

module.exports = router;
