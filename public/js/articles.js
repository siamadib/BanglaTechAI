// BanglaTechAI - Articles Page JavaScript

const API_BASE = '/api';
let currentPage = 1;
let currentCategory = '';
let currentSearch = '';

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Load categories for filter
async function loadCategories() {
    try {
        const response = await fetch(`${API_BASE}/categories`);
        const categories = await response.json();

        const select = document.getElementById('category-filter');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.slug;
            option.textContent = category.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load articles
async function loadArticles(page = 1, category = '', search = '') {
    try {
        let url = `${API_BASE}/articles?page=${page}&limit=10`;

        if (category) {
            url += `&category=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const container = document.getElementById('articles-container');

        if (data.articles.length === 0) {
            container.innerHTML = '<div class="error">কোন আর্টিকেল পাওয়া যায়নি</div>';
            document.getElementById('pagination').innerHTML = '';
            return;
        }

        container.innerHTML = data.articles.map(article => createArticleCard(article)).join('');
        renderPagination(data.pagination);

        currentPage = page;
        currentCategory = category;
        currentSearch = search;
    } catch (error) {
        console.error('Error loading articles:', error);
        const container = document.getElementById('articles-container');
        container.innerHTML = '<div class="error">আর্টিকেল লোড করতে সমস্যা হয়েছে</div>';
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

// Render pagination
function renderPagination(pagination) {
    const container = document.getElementById('pagination');

    if (pagination.totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '<div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">';

    // Previous button
    if (pagination.page > 1) {
        html += `<button onclick="loadArticles(${pagination.page - 1}, '${currentCategory}')" style="padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">পূর্ববর্তী</button>`;
    }

    // Page numbers
    for (let i = 1; i <= pagination.totalPages; i++) {
        if (i === pagination.page) {
            html += `<button style="padding: 10px 15px; background: var(--accent-color); color: white; border: none; border-radius: 5px; cursor: pointer;">${i}</button>`;
        } else {
            html += `<button onclick="loadArticles(${i}, '${currentCategory}')" style="padding: 10px 15px; background: var(--bg-light); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 5px; cursor: pointer;">${i}</button>`;
        }
    }

    // Next button
    if (pagination.page < pagination.totalPages) {
        html += `<button onclick="loadArticles(${pagination.page + 1}, '${currentCategory}')" style="padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">পরবর্তী</button>`;
    }

    html += '</div>';
    container.innerHTML = html;
}

// Filter by category
function filterByCategory() {
    const category = document.getElementById('category-filter').value;
    loadArticles(1, category);
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

    // Check for search query in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');

    if (searchQuery) {
        document.getElementById('search-input').value = searchQuery;
        // Note: Search API endpoint is separate, would need to implement search results page
        alert('সার্চ ফিচার আপডেট হচ্ছে। দয়া করে ক্যাটাগরি ফিল্টার ব্যবহার করুন।');
    }

    loadCategories();
    loadArticles();
});
