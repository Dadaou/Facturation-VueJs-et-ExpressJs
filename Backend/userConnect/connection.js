
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
var MSSQLStore = require('connect-mssql')(session)
const sql = require('mssql')
const router = express.Router()
const conf = require('../ConfigBD/config.js')

router.use(conf)

var request = new sql.Request()

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

router.use(bodyParser.json())

var config = {
    user: 'sa',
    password: '00000000',
    server: 'localhost', 
    database: 'nodeDb' 
}

router.use(session({
    store: new MSSQLStore(config), 
    secret: 'supersecret'
}))


router.post('/weConnect',(req,res)=>{
    reqBody = req.body
    var data = [reqBody.usr,reqBody.psswd]
    if (!data[0] || !data[1]){
        res.status(400).send('Veuillez mettre un  Nom d\'utilsateur et/ou Mot de passe')
    }
    else {
    request.query("SELECT * FROM USERS WHERE nom_user = '" + data[0] + "'",(err,rows)=>{
        var Liste = rows.recordset
        var thepsswd, therole
        Liste.forEach(item => {
          thepsswd = item.mdp
         })
         Liste.forEach(item => {
            therole = item.role
         })
       
         if (Liste.length == 0 || data[1] != thepsswd ) res.status(400).send('Le Nom d\'utilsateur et/ou le Mot de passe est incorrecte')
        
        else  { 
            if(therole == "R1") res.status(200).send('Admin')
            if(therole == "R2") res.status(200).send('Agent') 
         }
    })

}
})
/*
const isAuth = (req,res,next)=>{
    if(req.session.isAuth) next()
    else
    res.status(201).redirect('http://localhost:8080/?#/')
}

router.post('/weConnect',isAuth,(req,res)=>{
    reqBody = req.body
    var data = [reqBody.usr,reqBody.psswd]
    if (!data[0] || !data[1]){
        res.status(400).send('Veuillez mettre un  Nom d\'utilsateur et/ou Mot de passe')
    }

    else{ //res.status(200).send('Admin')
    req.session.isAuth = true
    res.status(200).redirect('http://localhost:8080/?#/Admin')
    }
  
})
router.get('/weConnect',(req,res)=>{
    res.redirect('http://localhost:8080/?#/Admin')
})
*/
module.exports = router
