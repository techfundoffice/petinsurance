-- D1 Database Schema for Million Pages SEO Tool

-- Table for storing encrypted API credentials
CREATE TABLE IF NOT EXISTS api_credentials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service TEXT NOT NULL,           -- 'google_ads', 'google_search_console', 'openai', etc.
  credential_type TEXT NOT NULL,   -- 'access_token', 'refresh_token', 'customer_id', 'api_key'
  encrypted_value TEXT NOT NULL,   -- Encrypted credential value
  plain_value TEXT,                -- Temporary column for development (remove in production!)
  environment TEXT DEFAULT 'production',
  expires_at DATETIME,             -- Token expiration time
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(service, credential_type, environment)
);

-- Table for application configuration
CREATE TABLE IF NOT EXISTS app_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  environment TEXT DEFAULT 'production',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for caching keyword search volumes
CREATE TABLE IF NOT EXISTS keyword_volumes (
  keyword TEXT PRIMARY KEY,
  search_volume INTEGER NOT NULL,
  competition_level TEXT,          -- 'LOW', 'MEDIUM', 'HIGH'
  cpc_bid_low REAL,               -- Cost per click range
  cpc_bid_high REAL,
  source TEXT NOT NULL,           -- 'google_ads', 'estimation', 'manual'
  last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME             -- When to refresh this data
);

-- Table for tracking API usage and rate limits
CREATE TABLE IF NOT EXISTS api_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service TEXT NOT NULL,
  endpoint TEXT,
  request_count INTEGER DEFAULT 1,
  response_status INTEGER,
  response_time_ms INTEGER,
  error_message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_api_credentials_service ON api_credentials(service, environment);
CREATE INDEX IF NOT EXISTS idx_keyword_volumes_updated ON keyword_volumes(last_updated);
CREATE INDEX IF NOT EXISTS idx_api_usage_created ON api_usage(created_at, service);

-- Insert default configuration
INSERT OR REPLACE INTO app_config (key, value, description) VALUES
  ('google_ads_api_version', 'v14', 'Google Ads API version'),
  ('keyword_cache_ttl_hours', '168', 'How long to cache keyword data (7 days)'),
  ('enable_api_logging', 'true', 'Log API requests for debugging'),
  ('encryption_algorithm', 'AES-256-GCM', 'Encryption method for secrets');