// Admin Setup Script
// Run this script to create the initial admin user
// Usage: node database/setup-admin.js

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'banglatechai'
    });

    try {
        console.log('\n=== Admin User Setup ===\n');

        // Get admin details from command line or use defaults
        const username = process.argv[2] || 'admin';
        const password = process.argv[3] || 'admin123';
        const email = process.argv[4] || 'admin@banglatechai.com';
        const fullName = process.argv[5] || 'Administrator';

        console.log('Creating admin user with the following details:');
        console.log(`Username: ${username}`);
        console.log(`Email: ${email}`);
        console.log(`Full Name: ${fullName}`);
        console.log(`Password: ${password}`);
        console.log('\n⚠️  Please change the password after first login!\n');

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert admin user
        const [result] = await connection.execute(
            'INSERT INTO admins (username, password, email, full_name) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, email, fullName]
        );

        console.log('✓ Admin user created successfully!');
        console.log(`✓ Admin ID: ${result.insertId}`);
        console.log('\nYou can now login at: http://localhost:3000/admin-login');
        console.log('Default credentials:');
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}\n`);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('✗ Error: Admin user already exists with this username or email');
        } else {
            console.error('✗ Error creating admin user:', error.message);
        }
    } finally {
        await connection.end();
    }
}

createAdmin();
