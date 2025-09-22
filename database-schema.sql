-- Keywords Database Schema for Million Pages Project
-- PERSISTENCE MANDATORY - SQLite Database

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#45B7D1',
    min_cpc DECIMAL(10,2) DEFAULT 0.00,
    max_cpc DECIMAL(10,2) DEFAULT 0.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS keywords (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    keyword TEXT NOT NULL,
    category_id INTEGER NOT NULL,
    estimated_cpc DECIMAL(10,2) DEFAULT 0.00,
    search_volume INTEGER DEFAULT 0,
    competition_level TEXT DEFAULT 'medium', -- low, medium, high
    page_number INTEGER NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    UNIQUE(keyword, category_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_keywords_category ON keywords(category_id);
CREATE INDEX IF NOT EXISTS idx_keywords_page_number ON keywords(page_number);
CREATE INDEX IF NOT EXISTS idx_keywords_cpc ON keywords(estimated_cpc);
CREATE INDEX IF NOT EXISTS idx_keywords_active ON keywords(is_active);

-- Insert initial categories
INSERT OR REPLACE INTO categories (id, name, slug, description, color, min_cpc, max_cpc) VALUES
(1, 'Cat Insurance', 'cat-insurance', 'Traditional cat insurance coverage', '#FF6B6B', 2.50, 15.00),
(2, 'Dog Insurance', 'dog-insurance', 'Traditional dog insurance coverage', '#4ECDC4', 3.00, 20.00),
(3, 'General Pet Insurance', 'pet-insurance', 'General pet insurance topics', '#45B7D1', 2.00, 18.00),
(4, 'Emergency Veterinary Services', 'emergency-vet', 'Emergency and urgent veterinary care', '#E74C3C', 15.00, 50.00),
(5, 'Veterinary Oncology', 'vet-oncology', 'Pet cancer treatment and oncology', '#9B59B6', 20.00, 80.00),
(6, 'Veterinary Specialty Surgery', 'specialty-surgery', 'Orthopedic and specialty surgical procedures', '#F39C12', 15.00, 60.00),
(7, 'Cardiology Specialty', 'cardiology', 'Veterinary heart specialists and procedures', '#E67E22', 25.00, 70.00),
(8, 'Neurology Specialty', 'neurology', 'Veterinary brain and nervous system specialists', '#8E44AD', 30.00, 75.00),
(9, 'Luxury Pet Services', 'luxury-services', 'Premium and luxury pet care services', '#2ECC71', 20.00, 100.00),
(10, 'Pet Rehabilitation', 'rehabilitation', 'Physical therapy and rehabilitation for pets', '#3498DB', 18.00, 45.00),
(11, 'Exotic Pet Veterinary', 'exotic-vet', 'Veterinary care for exotic animals', '#1ABC9C', 25.00, 60.00),
(12, 'Pet Dental Specialty', 'dental', 'Veterinary dental specialists and procedures', '#F1C40F', 20.00, 55.00),
(13, 'Behavioral Services', 'behavioral', 'Pet behavior specialists and training', '#34495E', 15.00, 40.00);