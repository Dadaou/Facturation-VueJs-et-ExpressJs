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

router.get('/codeTar',(req,res) => {
    request.query("SELECT code_tarif FROM  FACT_SERVICES",(err,rows)=>{
        if(err){
            console.log(err)
            //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})


router.get('/codeFact',(req,res) => {
    request.query("SELECT num_facture FROM  FACTURES",(err,rows)=>{
        if(err){
            console.log(err)
            //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/api/Prod',(req,res) => {
    request.query("SELECT * FROM Prod",(err,rows)=>{
        if(err){
            console.log(err)
            //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.post('/api/Prod',(req, res) => {
    var reqBody =  req.body
    if(reqBody.numFacture =='N° facture...' || reqBody.numFacture == undefined || reqBody.Code =='Tarif...' || reqBody.Code == undefined || reqBody.Qtt == '')
        res.status(401).send("Remplir tous les champs")
    else{
        if(reqBody.Taxe == ''){
        reqBody.Taxe = '0'
        //console.log(reqBody)
        request.query("INSERT INTO PROD(num_facture,code_tarif,qtt,taxe,reduction) VALUES ('"+ reqBody.numFacture  +"', '"+ reqBody.Code +"', '"+ reqBody.Qtt +"','"+ reqBody.Taxe +"', '"+ reqBody.Reduction +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })
    }
    else{
        request.query("INSERT INTO PROD(num_facture,code_tarif,qtt,taxe,reduction) VALUES ('"+ reqBody.numFacture  +"', '"+ reqBody.Code +"', '"+ reqBody.Qtt +"','"+ reqBody.Taxe +"', '"+ reqBody.Reduction +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })

    }
    }

})

router.delete('/api/Prod/:numFacture&:Code',(req,res)=>{
    var data = [req.params.numFacture,req.params.Code]
    request.query("DELETE FROM PROD WHERE num_facture= '" + data[0] + "' AND code_tarif= '" + data[1] + "'",(err)=>{
        if(err)
            //res.status(400).send("Une erreur est survenue au cours de la suppression")
            console.log(err)
        else
            res.status(200).send("Suppression éffectuée")
    })
       
})

module.exports = router