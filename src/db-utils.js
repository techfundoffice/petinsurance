// Database utilities for D1 integration

// Simple encryption/decryption using Web Crypto API
export async function encryptSecret(plainText, env) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  
  // Get or generate encryption key from environment
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(env.ENCRYPTION_KEY || 'default-key-change-this'),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('million-pages-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  // Combine IV and encrypted data
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  // Return base64 encoded
  return btoa(String.fromCharCode(...combined));
}

export async function decryptSecret(encryptedText, env) {
  try {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    
    // Decode from base64
    const combined = Uint8Array.from(atob(encryptedText), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);
    
    // Get encryption key
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(env.ENCRYPTION_KEY || 'default-key-change-this'),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('million-pages-salt'),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );
    
    return decoder.decode(decrypted);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// Get API credentials from database
export async function getApiCredential(db, service, credentialType, env) {
  try {
    const result = await db.prepare(`
      SELECT encrypted_value, plain_value 
      FROM api_credentials 
      WHERE service = ? AND credential_type = ? AND environment = ?
    `).bind(service, credentialType, env.ENVIRONMENT || 'production').first();
    
    if (!result) return null;
    
    // In development, use plain_value if available (for testing)
    if (result.plain_value && env.ENVIRONMENT !== 'production') {
      console.log(`Using plain value for ${service}/${credentialType}`);
      return result.plain_value;
    }
    
    // Decrypt the value
    return await decryptSecret(result.encrypted_value, env);
  } catch (error) {
    console.error(`Error fetching credential ${service}/${credentialType}:`, error);
    return null;
  }
}

// Save API credential to database
export async function saveApiCredential(db, service, credentialType, value, env, expiresAt = null) {
  try {
    const encryptedValue = await encryptSecret(value, env);
    
    await db.prepare(`
      INSERT OR REPLACE INTO api_credentials 
      (service, credential_type, encrypted_value, environment, expires_at, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      service, 
      credentialType, 
      encryptedValue, 
      env.ENVIRONMENT || 'production',
      expiresAt
    ).run();
    
    return true;
  } catch (error) {
    console.error(`Error saving credential ${service}/${credentialType}:`, error);
    return false;
  }
}

// Get cached keyword volume
export async function getCachedKeywordVolume(db, keyword) {
  try {
    const result = await db.prepare(`
      SELECT search_volume, competition_level, source, last_updated
      FROM keyword_volumes
      WHERE keyword = ? AND expires_at > datetime('now')
    `).bind(keyword.toLowerCase()).first();
    
    return result;
  } catch (error) {
    console.error(`Error fetching cached volume for ${keyword}:`, error);
    return null;
  }
}

// Save keyword volume to cache
export async function saveKeywordVolume(db, keyword, volume, source = 'google_ads', competitionLevel = null) {
  try {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Cache for 7 days
    
    await db.prepare(`
      INSERT OR REPLACE INTO keyword_volumes
      (keyword, search_volume, competition_level, source, expires_at, last_updated)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(
      keyword.toLowerCase(),
      volume,
      competitionLevel,
      source,
      expiresAt.toISOString()
    ).run();
    
    return true;
  } catch (error) {
    console.error(`Error caching volume for ${keyword}:`, error);
    return false;
  }
}

// Log API usage for monitoring
export async function logApiUsage(db, service, endpoint, status, responseTimeMs, errorMessage = null) {
  try {
    await db.prepare(`
      INSERT INTO api_usage (service, endpoint, response_status, response_time_ms, error_message)
      VALUES (?, ?, ?, ?, ?)
    `).bind(service, endpoint, status, responseTimeMs, errorMessage).run();
  } catch (error) {
    console.error('Error logging API usage:', error);
  }
}

// Get app configuration value
export async function getConfig(db, key, defaultValue = null) {
  try {
    const result = await db.prepare('SELECT value FROM app_config WHERE key = ?').bind(key).first();
    return result ? result.value : defaultValue;
  } catch (error) {
    console.error(`Error fetching config ${key}:`, error);
    return defaultValue;
  }
}