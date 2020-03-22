module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgres://studiokeeper:admin@localhost/studiokeeper',
    JWT_SECRET: process.env.JWT_SECRET || 'here-is-a-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
  
  }
