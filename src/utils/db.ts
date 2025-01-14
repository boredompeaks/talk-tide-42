import mysql from 'mysql2/promise';

export const createPool = () => {
  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};

// Database initialization function
export const initDatabase = async () => {
  const pool = createPool();
  
  try {
    // Create Users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        avatar_url VARCHAR(255),
        is_online BOOLEAN DEFAULT false,
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create Conversations table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255),
        is_group BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create Messages table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        conversation_id VARCHAR(36) NOT NULL,
        sender_id VARCHAR(36) NOT NULL,
        content TEXT,
        content_type ENUM('text', 'image', 'file') DEFAULT 'text',
        is_read BOOLEAN DEFAULT false,
        is_one_time_view BOOLEAN DEFAULT false,
        encryption_key VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (sender_id) REFERENCES users(id)
      )
    `);

    // Create Conversation Participants table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS conversation_participants (
        conversation_id VARCHAR(36) NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (conversation_id, user_id),
        FOREIGN KEY (conversation_id) REFERENCES conversations(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);

    // Create Media table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS media (
        id VARCHAR(36) PRIMARY KEY,
        message_id VARCHAR(36) NOT NULL,
        url VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        size INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (message_id) REFERENCES messages(id)
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await pool.end();
  }
};