const express = require('express')
const bodyParser = require('body-parser')
const sql = require('mssql')
const router = express.Router()
var conf = require('../ConfigBD/config.js')

router.use(conf)

var request = new sql.Request()

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

router.use(bodyParser.json())

router.get('/Role',(req,res)=>{
    request.query("SELECT * FROM FACT_ROLES",(err,rows)=>{

        if(err){
           
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

module.exports = router