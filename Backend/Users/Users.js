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

router.get('/api/Role',(req,res)=>{
    request.query("SELECT code_role FROM  FACT_ROLES",(err,rows)=>{
        if(err){
            res.status(400).json({message:"Error"})
            //console.log(err)
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.post('/Users',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Role =='Rôle...' || reqBody.Role == undefined || reqBody.User =='' || reqBody.Mdp == '')
        res.status(401).send("Remplir tous les champs")
    else{
        request.query("INSERT INTO USERS(nom_user,role,mdp) VALUES ('"+ reqBody.User +"', '"+ reqBody.Role +"', '"+ reqBody.Mdp  +"')"
        ,(err)=>{
             if(err) res.status(400).send("Il y a eu une erreur")
             else res.status(200).send("Ajout éffectué")  
        })
    }
})

router.get('/Users',(req,res)=>{
    request.query("SELECT * FROM  USERS",(err,rows)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.delete('/Users/:nom_user&:code_role',(req,res)=>{
    var data = [req.params.nom_user,req.params.code_role]
    //console.log(req.params.validite)
    request.query("DELETE FROM USERS WHERE nom_user = '" + data[0] + "' AND role = '" + data[1] + "'",(err)=>{
        
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")
        else
            res.status(200).send("Suppression éffectuée")
    })
       
})

router.get('/Users/:nom_user&:code_role',(req,res)=>{
    var data = [req.params.nom_user,req.params.code_role]
    request.query("SELECT * FROM  USERS WHERE nom_user = '" + data[0] + "' AND role = '" + data[1] + "'",(err,rows)=>{
        if(err){
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 

        }
    })
})

router.put('/Users/:nom_user&:code_role',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.lastPsswd == '', reqBody.newPsswd == '')
        res.status(400).send("Remplir tous les champs")
    else{
        var data = [req.params.nom_user,req.params.code_role]
        request.query("UPDATE USERS SET mdp = '"+ reqBody.newPsswd +"' WHERE nom_user='"+ data[0] +"' AND role='"+ data[1] +"' ",(err)=>{
            if(err){
                //console.log(err)
                res.status(400).send("Une erreur est survenue au cours de la modification")
            }
            else{
                //console.log(reqBody)
                res.status(200).send("Modification éffectuée") 
            }
        })
    }

})

module.exports = router
