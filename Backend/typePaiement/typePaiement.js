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

router.post('/typePaiement',(req, res) => {
    var reqBody =  req.body
    if(reqBody.typePaiment== '' || reqBody.Libelle == '')
        res.status(401).send("Remplir tous les champs")
    else{
        //console.log (reqBody)
        //var data = [reqBody.Code_cli, reqBody.Libelle,reqBody.Nif,reqBody.Stat,reqBody.Rcs,reqBody.Validite,reqBody.Code_douane]
        request.query("INSERT INTO TYPE_DE_PAIEMENTS(type_paiement,libelle) VALUES ('"+ reqBody.typePaiment +"', '"+ reqBody.Libelle +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })
    }
})

router.get('/typePaiement',(req,res)=>{
    request.query("SELECT * FROM  TYPE_DE_PAIEMENTS",(err,rows)=>{
        if(err){
            //res.status(400).json({message:"Error"})
            console.log(err)
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.delete('/typePaiement/:type',(req,res)=>{
    var data = req.params.type
    request.query("DELETE FROM TYPE_DE_PAIEMENTS WHERE type_paiement = '" + data + "'",(err)=>{
        if(err)
            //res.status(400).send("Une erreur est survenue au cours de la suppression")
            console.log(err)
        else
            res.status(200).send("Suppression éffectuée")
    })
       
})

router.get('typePaiement/:type',(req,res)=>{
    var data = req.params.type
    request.query("SELECT * FROM FACT_TYPE_PAIEMENTS WHERE type_paiement = '" + data + "'",(err,rows)=>{
        if(err){
            //console.log(err)
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})
/*
router.put('/Credit/:code',(req,res)=>{
    var reqBody =  req.body
    if( reqBody.valMax =='' || reqBody.valAct == '' || reqBody.Validite == '')
        res.status(401).send("Remplir tous les champs")
    else{
        var data = req.params.code
        request.query("UPDATE FACT_CREDITS SET code_client= '"+ reqBody.Code +"', valeur_maximum='"+ reqBody.valMax +"', valeur_actuelle='"+ reqBody.valAct +"',validite='"+ reqBody.Validite +"'  WHERE code_client='"+ data +"'",(err)=>{
            if(err){
                console.log(err)
                //res.status(400).send("Une erreur est survenue au cours de la modification")
            }
            else{
                //console.log(reqBody)
                res.status(200).send("Modification éffectuée") 
            }
        })
    }

})
*/
module.exports = router