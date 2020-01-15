module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_KEY: process.env.API_KEY,
    DATABASE_URL: process.env.HEROKU_POSTGRESQL_PURPLE_URL || 'postgresql://dunder_mifflin@localhost/noteful',
    TEST_DATABASE_URL: process.env.TEST_HEROKU_POSTGRESQL_PURPLE_URL
  }