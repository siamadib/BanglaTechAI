// BanglaTechAI - Comparisons Page JavaScript

const API_BASE = '/api';

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

async function loadComparisons() {
    try {
        const response = await fetch(`${API_BASE}/articles?category=comparisons&limit=20`);
        const data = await response.json();

        const container = document.getElementById('comparisons-container');

        if (data.articles.length === 0) {
            container.innerHTML = '<div class="error">কোন তুলনা পাওয়া যায়নি</div>';
            return;
        }

        container.innerHTML = data.articles.map(article => createArticleCard(article)).join('');
    } catch (error) {
        console.error('Error loading comparisons:', error);
        const container = document.getElementById('comparisons-container');
        container.innerHTML = '<div class="error">তুলনা লোড করতে সমস্যা হয়েছে</div>';
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
                <span class="article-category">${article.category_name || 'তুলনা'}</span>
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

document.addEventListener('DOMContentLoaded', loadComparisons);
