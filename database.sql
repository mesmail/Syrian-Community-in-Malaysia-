-- سكريبت إنشاء قاعدة بيانات الجالية السورية في ماليزيا
-- Syrian Community in Malaysia Database Schema

CREATE DATABASE IF NOT EXISTS syrian_community_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE syrian_community_db;

-- جدول الأخبار
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ms VARCHAR(255) NOT NULL,
    content_ar TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_ms TEXT NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100) DEFAULT 'Announcement',
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الفعاليات
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_ar VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_ms VARCHAR(255) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    description_ms TEXT,
    location_ar VARCHAR(255),
    location_en VARCHAR(255),
    location_ms VARCHAR(255),
    event_date DATETIME NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(100) DEFAULT 'Cultural'
);

-- جدول دليل الأعمال
CREATE TABLE IF NOT EXISTS businesses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description_ar TEXT,
    description_en TEXT,
    location VARCHAR(255),
    whatsapp VARCHAR(20),
    image_url VARCHAR(500),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول المنتدى (المواضيع)
CREATE TABLE IF NOT EXISTS forum_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_uid VARCHAR(128) NOT NULL,
    author_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- جدول الردود في المنتدى
CREATE TABLE IF NOT EXISTS forum_replies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    topic_id INT NOT NULL,
    content TEXT NOT NULL,
    author_uid VARCHAR(128) NOT NULL,
    author_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE
);

-- إضافة بيانات تجريبية للأخبار
INSERT INTO news (title_ar, title_en, title_ms, content_ar, content_en, content_ms, category) 
VALUES ('مرحباً بكم في منصتنا الجديدة', 'Welcome to our new platform', 'Selamat datang ke platform baru kami', 'هذا هو الخبر الأول في منصة الجالية.', 'This is the first news on the community platform.', 'Ini adalah berita pertama di platform komuniti.', 'General');
