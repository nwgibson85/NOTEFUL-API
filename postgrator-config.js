require('dotenv').config();

console.log(process.env.HEROKU_POSTGRESQL_PURPLE_URL)

module.exports = {
    migrationsDirectory: 'migrations',
    driver: 'pg',
    connectionString: process.env.NODE_ENV === 'test'
        ? process.env.TEST_HEROKU_POSTGRESQL_PURPLE_URL
        : process.env.HEROKU_POSTGRESQL_PURPLE__URL,
    "ssl": !!process.env.SSL,
};