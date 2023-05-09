const express = require('express')
const router = express.Router()
const sql = require('mssql');

var config = {
    user: 'sa',
    password: '00000000',
    server: 'localhost', 
    database: 'nodeDb' 
}

sql.connect(config)

module.exports = router