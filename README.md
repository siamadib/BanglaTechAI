# BanglaTechAI - Full-Stack Technology Website

A complete, modern, professional Bangla Tech & AI Tools website built with Node.js, Express, MySQL, and vanilla JavaScript.

## Project Structure

```
BanglaTechAI/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js            # Homepage JavaScript
│   │   ├── articles.js        # Articles page JavaScript
│   │   ├── article.js         # Article detail JavaScript
│   │   ├── ai-tools.js        # AI tools page JavaScript
│   │   ├── tech-guides.js     # Tech guides page JavaScript
│   │   ├── comparisons.js     # Comparisons page JavaScript
│   │   └── category.js        # Category page JavaScript
│   ├── images/                # Image assets
│   ├── index.html             # Homepage
│   ├── articles.html          # All articles page
│   ├── article.html           # Article detail page
│   ├── ai-tools.html          # AI tools directory
│   ├── tech-guides.html       # Technology tutorials
│   ├── comparisons.html       # Product comparisons
│   ├── category.html          # Category page
│   ├── about.html             # About us
│   ├── contact.html           # Contact form
│   ├── privacy-policy.html    # Privacy policy
│   ├── terms.html             # Terms and conditions
│   ├── disclaimer.html        # Disclaimer
│   ├── 404.html               # Custom 404 page
│   ├── admin-login.html       # Admin login (Phase 3)
│   └── admin.html             # Admin dashboard (Phase 4)
├── server/
│   ├── config/
│   │   └── database.js        # Database configuration
│   ├── routes/
│   │   ├── articles.js        # Article API routes
│   │   ├── categories.js      # Category API routes
│   │   ├── ai-tools.js        # AI tools API routes
│   │   ├── contact.js         # Contact form API
│   │   ├── newsletter.js      # Newsletter API
│   │   └── admin.js           # Admin API routes
│   ├── middleware/            # Custom middleware (Phase 3)
│   ├── utils/                 # Utility functions
│   └── index.js               # Express server entry point
├── database/
│   ├── schema.sql             # Database schema
│   ├── seed.sql               # Sample data
│   └── setup-admin.js         # Admin user setup script
├── package.json               # Node.js dependencies
├── .env.example               # Environment variables template
└── .gitignore                 # Git ignore rules
```

## Features (Phase 1 - Completed)

### Frontend
- ✅ Responsive homepage with hero section
- ✅ Dynamic article loading from database
- ✅ Category browsing
- ✅ AI tools directory
- ✅ Article detail pages
- ✅ Search interface
- ✅ Newsletter subscription
- ✅ Contact form
- ✅ Static pages (About, Privacy, Terms, Disclaimer)
- ✅ Custom 404 page
- ✅ Mobile-responsive design

### Backend
- ✅ Express.js server
- ✅ MySQL database integration
- ✅ REST API endpoints
- ✅ Article CRUD API (public read)
- ✅ Category API
- ✅ AI Tools API
- ✅ Contact form API
- ✅ Newsletter API
- ✅ Pagination support
- ✅ Health check endpoint
- ✅ Security middleware (Helmet, rate limiting)

### Database
- ✅ Complete database schema
- ✅ Sample seed data
- ✅ Foreign key relationships
- ✅ Indexes for performance

## Installation Instructions

### Prerequisites

1. **Node.js LTS** - Download and install from https://nodejs.org/
2. **MySQL Community Server** - Download and install from https://dev.mysql.com/downloads/mysql/

### Step-by-Step Setup

#### 1. Install Node.js and MySQL

- Download Node.js LTS from https://nodejs.org/ and install
- Download MySQL Community Server from https://dev.mysql.com/downloads/mysql/ and install
- During MySQL installation, set a root password (remember it!)

#### 2. Create Project Folder

```powershell
cd Desktop
mkdir BanglaTechAI
cd BanglaTechAI
```

#### 3. Initialize npm and Install Dependencies

```powershell
npm init -y
npm install express mysql2 dotenv bcryptjs express-session helmet express-rate-limit cors
```

#### 4. Create .env File

Copy `.env.example` to `.env` and update with your database credentials:

```powershell
copy .env.example .env
```

Edit `.env` with your actual MySQL password:
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=banglatechai
SESSION_SECRET=your_random_secret_string
```

#### 5. Create Database and Tables

Open MySQL Command Line Client or MySQL Workbench and run:

```sql
source C:/Users/HP/Desktop/BanglaTechAI/database/schema.sql
source C:/Users/HP/Desktop/BanglaTechAI/database/seed.sql
```

Or using MySQL Command Line:
```powershell
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

#### 6. Create Initial Admin User

```powershell
node database/setup-admin.js
```

Default credentials (or provide your own):
- Username: admin
- Password: admin123
- Email: admin@banglatechai.com

⚠️ **Important:** Change the password after first login!

#### 7. Start the Server

```powershell
npm start
```

The server will start on http://localhost:3000

#### 8. Open in Browser

Navigate to http://localhost:3000

## Testing the Application

### Test API Endpoints

- Health check: http://localhost:3000/api/health
- Get articles: http://localhost:3000/api/articles
- Get categories: http://localhost:3000/api/categories
- Get AI tools: http://localhost:3000/api/ai-tools

### Test Pages

- Homepage: http://localhost:3000/
- Articles: http://localhost:3000/articles
- AI Tools: http://localhost:3000/ai-tools
- Tech Guides: http://localhost:3000/tech-guides
- Comparisons: http://localhost:3000/comparisons
- Contact: http://localhost:3000/contact
- About: http://localhost:3000/about

## Troubleshooting

### Database Connection Error

**Error:** "Database connection failed"

**Solution:**
1. Check if MySQL is running
2. Verify your password in `.env`
3. Ensure database `banglatechai` exists
4. Check MySQL is listening on port 3306

### Port Already in Use

**Error:** "Port 3000 is already in use"

**Solution:**
1. Change PORT in `.env` to another number (e.g., 3001)
2. Or stop the process using port 3000:
```powershell
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found

**Error:** "Cannot find module 'express'"

**Solution:**
```powershell
npm install
```

### MySQL Access Denied

**Error:** "Access denied for user 'root'@'localhost'"

**Solution:**
1. Verify password in `.env` matches your MySQL root password
2. Reset MySQL root password if needed

## Next Phases

**Phase 2:** Article details page enhancements, advanced search, category filtering
**Phase 3:** Admin authentication system (login, sessions, password hashing)
**Phase 4:** Complete admin dashboard with article management (CRUD)
**Phase 5:** Additional pages and features
**Phase 6-9:** SEO, security, and deployment preparation

## License

ISC
