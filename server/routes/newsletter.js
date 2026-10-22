const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;

        // Basic validation
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // Check if already subscribed
        const [existing] = await pool.query(
            'SELECT * FROM newsletter_subscribers WHERE email = ? AND is_active = TRUE',
            [email]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }

        // Insert or reactivate subscription
        await pool.query(
            `INSERT INTO newsletter_subscribers (email, is_active, subscribed_at)
             VALUES (?, TRUE, NOW())
             ON DUPLICATE KEY UPDATE is_active = TRUE, subscribed_at = NOW(), unsubscribed_at = NULL`,
            [email]
        );

        res.status(201).json({ message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ error: 'Failed to subscribe to newsletter' });
    }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        await pool.query(
            'UPDATE newsletter_subscribers SET is_active = FALSE, unsubscribed_at = NOW() WHERE email = ?',
            [email]
        );

        res.json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
        console.error('Error unsubscribing from newsletter:', error);
        res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = router;
