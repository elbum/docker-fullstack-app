const mysql = require('mysql');
const pool = mysql.createPool({
    // connectionLimit: 10,
    // host: 'mysql',
    // user: 'root',
    // password: 'test1234',
    // database: 'myapp'

    // Docker environment 로 대체
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT

})

exports.pool = pool;
