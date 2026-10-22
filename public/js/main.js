// BanglaTechAI - Main JavaScript

// API Base URL
const API_BASE = '/api';

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Load categories
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const data = await response.json();

        const container = document.getElementById('categories-container');
        if (container) {
            container.innerHTML = data.map(category => `
                <div class="category-card" onclick="window.location.href='/category?slug=${category.slug}'">
                    <h3>${category.name}</h3>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        const container = document.getElementById('categories-container');
        if (container) {
            container.innerHTML = '<div class="error">ক্যাটাগরি লোড করতে সমস্যা হয়েছে</div>';
        }
    }
}

// Load trending articles
async function loadTrendingArticles() {
    try {
        const response = await fetch(`${API_BASE}/articles/trending`);
        const articles = await response.json();

        const container = document.getElementById('trending-container');
        if (container) {
            container.innerHTML = articles.map(article => createArticleCard(article)).join('');
        }
    } catch (error) {
        console.error('Error loading trending articles:', error);
        const container = document.getElementById('trending-container');
        if (container) {
            container.innerHTML = '<div class="error">আর্টিকেল লোড করতে সমস্যা হয়েছে</div>';
        }
    }
}

// Load latest articles
async function loadLatestArticles() {
    try {
        const response = await fetch(`${API_BASE}/articles/latest?limit=6`);
        const articles = await response.json();

        const container = document.getElementById('latest-container');
        if (container) {
            container.innerHTML = articles.map(article => createArticleCard(article)).join('');
        }
    } catch (error) {
        console.error('Error loading latest articles:', error);
        const container = document.getElementById('latest-container');
        if (container) {
            container.innerHTML = '<div class="error">আর্টিকেল লোড করতে সমস্যা হয়েছে</div>';
        }
    }
}

// Load AI tools
async function loadAITools() {
    try {
        const response = await fetch(`${API_BASE}/ai-tools?featured=true&limit=6`);
        const tools = await response.json();

        const container = document.getElementById('ai-tools-container');
        if (container) {
            container.innerHTML = tools.map(tool => createAIToolCard(tool)).join('');
        }
    } catch (error) {
        console.error('Error loading AI tools:', error);
        const container = document.getElementById('ai-tools-container');
        if (container) {
            container.innerHTML = '<div class="error">AI টুলস লোড করতে সমস্যা হয়েছে</div>';
        }
    }
}

// Create article card HTML
function createArticleCard(article) {
    const date = new Date(article.published_at).toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const imageHtml = article.featured_image
        ? `<img src="${article.featured_image}" alt="${article.title}" class="article-image" onerror="this.style.display='none'">`
        : '';

    return `
        <div class="article-card" onclick="window.location.href='/article?slug=${article.slug}'">
            ${imageHtml}
            <div class="article-content">
                <span class="article-category">${article.category_name || 'সাধারণ'}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt || article.content.substring(0, 150) + '...'}</p>
                <div class="article-meta">
                    <span>${date}</span>
                    <span>👁 ${article.views}</span>
                </div>
            </div>
        </div>
    `;
}

// Create AI tool card HTML
function createAIToolCard(tool) {
    return `
        <div class="ai-tool-card">
            <h3 class="ai-tool-name">${tool.name}</h3>
            <p class="ai-tool-description">${tool.description}</p>
            <div style="margin: 15px 0;">
                <span class="ai-tool-badge ${tool.pricing}">${tool.pricing.toUpperCase()}</span>
                <span style="margin-left: 10px; font-size: 0.85rem; color: var(--text-light);">${tool.category}</span>
            </div>
            <div style="margin: 10px 0; color: #f59e0b; font-size: 0.9rem;">
                ⭐ ${tool.rating} (${tool.total_reviews})
            </div>
            <a href="${tool.website_url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: var(--primary-color); color: white; text-decoration: none; border-radius: 5px; font-size: 0.9rem; font-weight: 600; transition: background 0.3s ease;">Visit Website →</a>
        </div>
    `;
}

// Search articles
function searchArticles() {
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        window.location.href = `/articles?search=${encodeURIComponent(query)}`;
    }
}

// Handle Enter key in search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchArticles();
            }
        });
    }

    // Load initial content
    loadCategories();
    loadTrendingArticles();
    loadLatestArticles();
    loadAITools();
});

// Newsletter subscription
async function subscribeNewsletter(event) {
    event.preventDefault();

    const email = document.getElementById('newsletter-email').value.trim();

    try {
        const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('সফলভাবে সাবস্ক্রাইব হয়েছে!');
            document.getElementById('newsletter-email').value = '';
        } else {
            alert(data.error || 'সাবস্ক্রাইব করতে সমস্যা হয়েছে');
        }
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        alert('সাবস্ক্রাইব করতে সমস্যা হয়েছে');
    }
}
