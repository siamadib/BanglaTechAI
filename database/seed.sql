-- BanglaTechAI Seed Data
-- Sample data for initial setup

USE banglatechai;

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('AI Tools', 'ai-tools', 'Artificial Intelligence tools and software'),
('Technology', 'technology', 'Latest technology news and updates'),
('Tutorials', 'tutorials', 'Step-by-step tutorials and guides'),
('Software', 'software', 'Free software recommendations and reviews'),
('Productivity', 'productivity', 'Tools to boost productivity for students and professionals'),
('News', 'news', 'Latest tech and AI news'),
('Comparisons', 'comparisons', 'Product and tool comparisons');

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, featured_image, category_id, author, status, views, meta_title, meta_description, published_at) VALUES
('ChatGPT ব্যবহার করার সহজ গাইড', 'chatgpt-guide-bangla', '<h2>ChatGPT কী?</h2><p>ChatGPT হলো OpenAI দ্বারা তৈরি একটি শক্তিশালী AI চ্যাটবট যা বিভিন্ন কাজে ব্যবহার করা যায়।</p><h3>কীভাবে শুরু করবেন?</h3><p>প্রথমে chat.openai.com ওয়েবসাইটে যান এবং একটি ফ্রি অ্যাকাউন্ট তৈরি করুন।</p><h3>প্রধান ব্যবহার</h3><ul><li>কোডিং সাহায্য</li><li>লেখা এবং সম্পাদনা</li><li>গবেষণা</li><li>অনুবাদ</li></ul>', 'ChatGPT ব্যবহার করার সহজ গাইড - শিখুন কীভাবে ChatGPT ব্যবহার করবেন', NULL, 1, 'Admin', 'published', 150, 'ChatGPT ব্যবহার করার সহজ গাইড - BanglaTechAI', 'ChatGPT ব্যবহার করার সম্পূর্ণ গাইড। শিখুন কীভাবে এই AI টুলটি ব্যবহার করে আপনার কাজকে সহজ করবেন।', NOW()),
('২০২৪ সালের সেরা ১০টি ফ্রি AI টুল', 'best-free-ai-tools-2024', '<h2>ফ্রি AI টুলস</h2><p>২০২৪ সালে ব্যবহার করার জন্য সেরা ফ্রি AI টুলগুলো নিচে দেওয়া হলো:</p><ol><li>ChatGPT</li><li>Google Bard</li><li>Claude</li><li>DALL-E</li><li>Midjourney</li><li>Hugging Face</li><li>Stable Diffusion</li><li>Perplexity AI</li><li>You.com</li><li>Bing AI</li></ol>', '২০২৪ সালের সেরা ১০টি ফ্রি AI টুল - বিনামূল্যে ব্যবহার করুন', NULL, 1, 'Admin', 'published', 230, 'সেরা ফ্রি AI টুল ২০২৪ - BanglaTechAI', '২০২৪ সালের সেরা ১০টি ফ্রি AI টুল সম্পর্কে জানুন। এই টুলগুলো বিনামূল্যে ব্যবহার করতে পারবেন।', NOW()),
('প্রোগ্রামিং শেখার সেরা ফ্রি রিসোর্স', 'best-free-programming-resources', '<h2>প্রোগ্রামিং শেখা</h2><p>বিনামূল্যে প্রোগ্রামিং শেখার জন্য সেরা রিসোর্সগুলো:</p><ul><li>freeCodeCamp</li><li>Codecademy</li><li>W3Schools</li><li>MDN Web Docs</li><li>YouTube Tutorials</li><li>GitHub</li><li>Stack Overflow</li></ul>', 'প্রোগ্রামিং শেখার সেরা ফ্রি রিসোর্স - শুরু করুন আজই', NULL, 3, 'Admin', 'published', 180, 'প্রোগ্রামিং শেখার ফ্রি রিসোর্স - BanglaTechAI', 'বিনামূল্যে প্রোগ্রামিং শেখার জন্য সেরা ওয়েবসাইট এবং রিসোর্সগুলো সম্পর্কে জানুন।', NOW()),
('স্টুডেন্টদের জন্য সেরা প্রোডাক্টিভিটি টুল', 'best-productivity-tools-students', '<h2>প্রোডাক্টিভিটি টুলস</h2><p>স্টুডেন্টদের পড়াশোনা সহজ করার জন্য এই টুলগুলো ব্যবহার করুন:</p><ul><li>Notion</li><li>Google Docs</li><li>Trello</li><li>Forest App</li><li>Anki</li><li>Obsidian</li></ul>', 'স্টুডেন্টদের জন্য সেরা প্রোডাক্টিভিটি টুল - পড়াশোনা সহজ করুন', NULL, 5, 'Admin', 'published', 120, 'স্টুডেন্টদের প্রোডাক্টিভিটি টুল - BanglaTechAI', 'স্টুডেনন্টদের জন্য সেরা প্রোডাক্টিভিটি টুলস যা পড়াশোনা সহজ করবে।', NOW()),
('Google Bard vs ChatGPT: কোনটি সেরা?', 'google-bard-vs-chatgpt', '<h2>তুলনা</h2><p>Google Bard এবং ChatGPT দুটির মধ্যে তুলনা:</p><h3>ChatGPT</h3><ul><li>বেশি জনপ্রিয়</li><li>শক্তিশালী কোডিং সাপোর্ট</li><li>প্লাগইন সাপোর্ট</li></ul><h3>Google Bard</h3><ul><li>ইন্টারনেট অ্যাক্সেস</li><li>Google ইন্টিগ্রেশন</li><li>ফ্রি ব্যবহার</li></ul>', 'Google Bard vs ChatGPT তুলনা - কোনটি আপনার জন্য সেরা?', NULL, 7, 'Admin', 'published', 95, 'Google Bard vs ChatGPT তুলনা - BanglaTechAI', 'Google Bard এবং ChatGPT এর মধ্যে বিস্তারিত তুলনা। জানুন কোনটি আপনার জন্য সেরা।', NOW()),
('উইন্ডোজ ১১ এর সেরা ফ্রি সফটওয়্যার', 'best-free-software-windows-11', '<h2>ফ্রি সফটওয়্যার</h2><p>উইন্ডোজ ১১ এর জন্য সেরা ফ্রি সফটওয়্যারগুলো:</p><ul><li>VLC Media Player</li><li>7-Zip</li><li>Notepad++</li><li>GIMP</li><li>OBS Studio</li><li>VS Code</li><li>Firefox</li></ul>', 'উইন্ডোজ ১১ এর সেরা ফ্রি সফটওয়্যার - ডাউনলোড করুন', NULL, 4, 'Admin', 'published', 85, 'উইন্ডোজ ১১ ফ্রি সফটওয়্যার - BanglaTechAI', 'উইন্ডোজ ১১ এর জন্য সেরা ফ্রি সফটওয়্যারগুলো সম্পর্কে জানুন।', NOW()),
('AI নিউজ: গুগলের নতুন AI মডেল Gemini', 'google-gemini-ai-news', '<h2>Google Gemini</h2><p>গুগল তাদের নতুন AI মডেল Gemini ঘোষণা করেছে। এটি GPT-4 কে চ্যালেঞ্জ করতে পারে।</p><h3>মূল ফিচার</h3><ul><li>মাল্টিমোডাল ক্যাপাবিলিটি</li><li>বড় কনটেক্সট উইন্ডো</li><li>উন্নত রিজনিং</li></ul>', 'Google Gemini AI নিউজ - গুগলের নতুন AI মডেল', NULL, 6, 'Admin', 'published', 67, 'Google Gemini AI নিউজ - BanglaTechAI', 'গুগলের নতুন AI মডেল Gemini সম্পর্কে জানুন। এটি GPT-4 কে চ্যালেঞ্জ করতে পারে।', NOW()),
('JavaScript শেখার সম্পূর্ণ গাইড', 'javascript-learning-guide', '<h2>JavaScript শেখা</h2><p>JavaScript হলো ওয়েব ডেভেলপমেন্টের জন্য অপরিহার্য। এই গাইডে শিখবেন:</p><ol><li>বেসিক সিনট্যাক্স</li><li>ভেরিয়েবল এবং ডেটা টাইপ</li><li>ফাংশন</li><li>DOM ম্যানিপুলেশন</li><li>ES6+ ফিচার</li></ol>', 'JavaScript শেখার সম্পূর্ণ গাইড - শুরু থেকে শেষ পর্যন্ত', NULL, 3, 'Admin', 'published', 145, 'JavaScript শেখার গাইড - BanglaTechAI', 'JavaScript শেখার সম্পূর্ণ গাইড। শুরু থেকে শেষ পর্যন্ত সবকিছু শিখুন।', NOW());

-- Insert sample AI tools
INSERT INTO ai_tools (name, slug, description, category, pricing, website_url, featured_image, rating, total_reviews, is_featured) VALUES
('ChatGPT', 'chatgpt', 'OpenAI এর শক্তিশালী AI চ্যাটবট। কোডিং, লেখা, গবেষণা সব কাজে ব্যবহার করা যায়।', 'Chatbot', 'freemium', 'https://chat.openai.com', NULL, 4.80, 1250, TRUE),
('Google Bard', 'google-bard', 'গুগলের AI চ্যাটবট। ইন্টারনেট অ্যাক্সেস এবং গুগল সার্ভিসের সাথে ইন্টিগ্রেশন।', 'Chatbot', 'free', 'https://bard.google.com', NULL, 4.50, 890, TRUE),
('Claude', 'claude', 'Anthropic এর AI অ্যাসিস্ট্যান্ট। নিরাপদ এবং সহায়ক AI।', 'Chatbot', 'freemium', 'https://claude.ai', NULL, 4.70, 650, TRUE),
('DALL-E', 'dall-e', 'OpenAI এর ইমেজ জেনারেশন AI। টেক্সট থেকে ইমেজ তৈরি করুন।', 'Image Generation', 'paid', 'https://openai.com/dall-e', NULL, 4.60, 420, FALSE),
('Midjourney', 'midjourney', 'উচ্চমানের ইমেজ জেনারেশন AI। Discord এর মাধ্যমে ব্যবহার করুন।', 'Image Generation', 'paid', 'https://midjourney.com', NULL, 4.85, 780, TRUE),
('Stable Diffusion', 'stable-diffusion', 'ওপেন সোর্স ইমেজ জেনারেশন মডেল। লোকালি ব্যবহার করা যায়।', 'Image Generation', 'free', 'https://stability.ai', NULL, 4.40, 320, FALSE),
('Perplexity AI', 'perplexity-ai', 'AI পাওয়ারড সার্চ ইঞ্জিন। দ্রুত এবং নির্ভুল উত্তর।', 'Search', 'freemium', 'https://perplexity.ai', NULL, 4.55, 540, FALSE),
('Hugging Face', 'hugging-face', 'AI মডেল এবং ডেটাসেটের হাব। ওপেন সোর্স AI এর জন্য সেরা।', 'Platform', 'free', 'https://huggingface.co', NULL, 4.65, 410, FALSE),
('GitHub Copilot', 'github-copilot', 'AI পাওয়ারড কোডিং অ্যাসিস্ট্যান্ট। কোড লেখা সহজ করুন।', 'Coding', 'paid', 'https://github.com/features/copilot', NULL, 4.75, 890, TRUE),
('Notion AI', 'notion-ai', 'Notion এর AI ফিচার। লেখা এবং প্রোডাক্টিভিটি বৃদ্ধি করুন।', 'Productivity', 'paid', 'https://notion.so', NULL, 4.50, 280, FALSE);
