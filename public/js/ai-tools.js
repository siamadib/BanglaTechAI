// BanglaTechAI - AI Tools Page JavaScript

const API_BASE = '/api';

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

async function loadAITools() {
    try {
        const response = await fetch(`${API_BASE}/ai-tools`);
        const tools = await response.json();

        const container = document.getElementById('ai-tools-container');
        container.innerHTML = tools.map(tool => createAIToolCard(tool)).join('');
    } catch (error) {
        console.error('Error loading AI tools:', error);
        const container = document.getElementById('ai-tools-container');
        container.innerHTML = '<div class="error">AI টুলস লোড করতে সমস্যা হয়েছে</div>';
    }
}

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
                ⭐ ${tool.rating} (${tool.total_reviews} রিভিউ)
            </div>
            <a href="${tool.website_url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: var(--primary-color); color: white; text-decoration: none; border-radius: 5px; font-size: 0.9rem; font-weight: 600; transition: background 0.3s ease;">Visit Website →</a>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadAITools);
