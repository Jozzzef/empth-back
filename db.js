const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'survey',
    password: '849753',
    port: 5432
})

module.exports = pool;