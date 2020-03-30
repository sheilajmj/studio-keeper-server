module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://escbmkagbvjqme:e449edbb7cbf5e741cc3a92ad5d454dcd91e799ac538701ee88a3831bb3f9f9c@ec2-3-229-210-93.compute-1.amazonaws.com:5432/d2t064rk398q1q',
    JWT_SECRET: process.env.JWT_SECRET || 'here-is-a-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '20s',
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://studiokeeper:admin@localhost/studiokeeper-test'
  }
