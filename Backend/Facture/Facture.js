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

router.get('/codeClient',(req,res) => {
   
    request.query("SELECT code_client FROM  FACT_CLIENTS",(err,rows)=>{
        if(err){
            console.log(err)
            //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })

})
router.get('/codePaiement',(req,res) => {
    request.query("SELECT type_paiement FROM  TYPE_DE_PAIEMENTS",(err,rows)=>{
        if(err){
            console.log(err)
            //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.post('/api/Facture',(req, res) => {
    var reqBody =  req.body
    if(reqBody.numFacture =='Client...' || reqBody.numFacture == undefined || reqBody.Code =='' || reqBody.theDate == ''|| reqBody.theTime =='' ||reqBody.Tye =='Type de paiement...' || reqBody.Type == undefined || reqBody.Description =='')
    //if(reqBody.Devise == undefined || reqBody.Devise == "Devise..." )
        res.status(401).send("Remplir tous les champs")
    else{
        var myHour =  reqBody.theTime.toString()
        request.query("INSERT INTO FACTURES(num_facture,code_client,date_facture,heure_facture,type_paiement,description_facture) VALUES ('"+ reqBody.numFacture  +"', '"+ reqBody.Code +"', '"+ reqBody.theDate +"', '"+ myHour +"','"+ reqBody.Type +"','"+ reqBody.Description +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })
    }

})

router.delete('/api/Facture/:numFacture',(req,res)=>{
    var data = [req.params.numFacture]
    request.query("DELETE FROM FACTURES WHERE num_facture= '" + data + "'",(err)=>{
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")
            //console.log(err)
        else
            res.status(200).send("Suppression éffectuée")
    })
       
})

router.get('/api/Facture',(req,res) => {
    request.query("SELECT num_facture, code_client, FORMAT(date_facture, 'dd/MM/yyyy') AS date_facture, heure_facture,type_paiement, description_facture FROM  FACTURES",(err,rows)=>{
        if(err){
            console.log(err)
            res.status(400).json({message:"Error"})
        }
        else{
            //console.log(rows.recordset)
            res.status(200).send(rows.recordset) 
        }
    })

})

router.get('/api/Facture/:numFacture',(req,res)=>{
    var data = req.params.numFacture
    request.query("SELECT num_facture,code_client, FORMAT(date_facture, 'dd/MM/yyyy') AS date_facture, heure_facture, type_paiement, description_facture FROM FACTURES WHERE num_facture = '" + data + "'",(err,rows)=>{
        if(err){
            //console.log(err)
            res.status(400).json({message:"Error"})
        }
        else{

            res.status(200).send(rows.recordset) 
        }
    })
})

router.put('/api/Facture/:numFacture',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.numFacture =='Client...' || reqBody.numFacture == undefined || reqBody.Code =='' || reqBody.theDate == ''|| reqBody.theTime =='' ||reqBody.Tye =='Type de paiement...' || reqBody.Type == undefined || reqBody.Description =='')
        res.status(401).send("Remplir tous les champs") 
    else{
        var data = req.params.numFacture
        request.query("UPDATE FACTURES SET num_facture= '"+ reqBody.numFacture +"', code_client='"+ reqBody.Code +"', date_facture='"+ reqBody.theDate +"',heure_facture = '"+ reqBody.theTime +"',type_paiement = '"+ reqBody.Type +"' , description_facture='"+ reqBody.Description +"' WHERE num_facture='"+ data +"'",(err)=>{
            if(err){
                console.log(err)
                res.status(400).send("Une erreur est survenue au cours de la modification")
            }
            else{
                //console.log(reqBody)
                res.status(200).send("Modification éffectuée") 
            }
        })
    }
})
/*
router.get('/bla/Facture/:numFacture',(req,res)=>{
    var data = [req.params.numFacture]
    request.query("SELECT  CAST(heure_facture AS time) AS hour from FACTURES WHERE num_facture = '" + data + "'",(err,rows)=>{
        if(err){
            //console.log(err)
            res.status(400).json({message:"Error"})
        }
        else{

            res.status(200).send(rows.recordset) 
        }
    })
})
*/
//SELECT CAST(heure_facture AS time) AS heure_facture FROM FACTURES
module.exports = router