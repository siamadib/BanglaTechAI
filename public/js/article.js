// BanglaTechAI - Article Page JavaScript

const API_BASE = '/api';

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Load article by slug
async function loadArticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        window.location.href = '/articles';
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/articles/slug/${slug}`);

        if (!response.ok) {
            throw new Error('Article not found');
        }

        const article = await response.json();

        // Update page title and meta
        document.title = `${article.title} - BanglaTechAI`;
        document.querySelector('meta[name="description"]').setAttribute('content', article.meta_description || article.excerpt || article.content.substring(0, 160));

        // Render article
        const container = document.getElementById('article-container');
        const date = new Date(article.published_at).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <a href="/articles" style="display: inline-block; margin-bottom: 20px; color: var(--accent-color);">← আর্টিকেলে ফিরে যান</a>

                <span class="article-category">${article.category_name || 'সাধারণ'}</span>

                <h1 style="font-size: 2.5rem; color: var(--primary-color); margin: 20px 0; line-height: 1.3;">${article.title}</h1>

                <div style="display: flex; gap: 20px; color: var(--text-light); margin-bottom: 30px; font-size: 0.9rem;">
                    <span>📅 ${date}</span>
                    <span>✍️ ${article.author || 'BanglaTechAI'}</span>
                    <span>👁 ${article.views} বার দেখা হয়েছে</span>
                </div>

                ${article.featured_image ? `<img src="${article.featured_image}" alt="${article.title}" style="width: 100%; max-height: 500px; object-fit: cover; border-radius: 10px; margin-bottom: 30px;" onerror="this.style.display='none'">` : ''}

                <div style="font-size: 1.1rem; line-height: 1.8; color: var(--text-color);">
                    ${article.content}
                </div>

                <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid var(--border-color);">
                    <h3 style="color: var(--primary-color); margin-bottom: 15px;">শেয়ার করুন</h3>
                    <div style="display: flex; gap: 10px;">
                        <button onclick="shareArticle('facebook')" style="padding: 10px 20px; background: #1877f2; color: white; border: none; border-radius: 5px; cursor: pointer;">Facebook</button>
                        <button onclick="shareArticle('twitter')" style="padding: 10px 20px; background: #1da1f2; color: white; border: none; border-radius: 5px; cursor: pointer;">Twitter</button>
                        <button onclick="shareArticle('whatsapp')" style="padding: 10px 20px; background: #25d366; color: white; border: none; border-radius: 5px; cursor: pointer;">WhatsApp</button>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading article:', error);
        const container = document.getElementById('article-container');
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2 style="color: var(--error-color);">আর্টিকেল পাওয়া যায়নি</h2>
                <p style="margin: 20px 0;">দুঃখিত, আপনি যে আর্টিকেলটি খুঁজছেন তা পাওয়া যায়নি।</p>
                <a href="/articles" style="display: inline-block; padding: 10px 20px; background: var(--primary-color); color: white; border-radius: 5px; text-decoration: none;">আর্টিকেলে ফিরে যান</a>
            </div>
        `;
    }
}

// Share article
function shareArticle(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl;

    switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${title} ${url}`;
            break;
        default:
            return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// Load article on page load
document.addEventListener('DOMContentLoaded', loadArticle);
