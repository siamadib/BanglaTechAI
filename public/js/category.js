// BanglaTechAI - Category Page JavaScript

const API_BASE = '/api';

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

async function loadCategory() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = '/articles';
        return;
    }

    try {
        // Load category info
        const categoryResponse = await fetch(`${API_BASE}/categories/slug/${slug}`);
        if (!categoryResponse.ok) {
            throw new Error('Category not found');
        }
        const category = await categoryResponse.json();

        document.title = `${category.name} - BanglaTechAI`;
        document.getElementById('category-title').textContent = category.name;
        document.getElementById('category-description').textContent = category.description || '';

        // Load category articles
        const articlesResponse = await fetch(`${API_BASE}/articles?category=${slug}&limit=20`);
        const data = await articlesResponse.json();

        const container = document.getElementById('category-articles');

        if (data.articles.length === 0) {
            container.innerHTML = '<div class="error">এই ক্যাটাগরিতে কোন আর্টিকেল পাওয়া যায়নি</div>';
            return;
        }

        container.innerHTML = data.articles.map(article => createArticleCard(article)).join('');
    } catch (error) {
        console.error('Error loading category:', error);
        const container = document.getElementById('category-articles');
        container.innerHTML = '<div class="error">ক্যাটাগরি লোড করতে সমস্যা হয়েছে</div>';
    }
}

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

document.addEventListener('DOMContentLoaded', loadCategory);
