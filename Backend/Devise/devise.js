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

router.post('/Devise',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Devise =='Devise...' || reqBody.Devise == undefined || reqBody.Validite =='' || reqBody.Taux == '')
    //if(reqBody.Devise == undefined || reqBody.Devise == "Devise..." )
        res.status(401).send("Remplir tous les champs")
    else{
        //console.log(reqBody.Devise)
        request.query("INSERT INTO FACT_DEVISES(devise,validite,taux) VALUES ('"+ reqBody.Devise +"', '"+ reqBody.Validite +"', '"+ reqBody.Taux  +"')"
        ,(err)=>{
             if(err)  res.status(401).send("Erreur, vérifier les informations sur les champs")
             else res.status(200).send("Ajout éffectué")  
        })
        
    }
})

router.get('/Devise',(req,res)=>{
    request.query("SELECT devise,FORMAT(validite, 'dd/MM/yyyy') as validite,taux FROM  FACT_DEVISES",(err,rows)=>{
        if(err){
            res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.delete('/Devise/:devise&:validite',(req,res)=>{
    var data_one = req.params.devise
    var data_two = req.params.validite
    request.query("DELETE FROM FACT_DEVISES WHERE devise = '" + data_one + "' AND validite = '" + data_two + "'",(err)=>{
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")
        else
            res.status(200).send("Suppression éffectuée")
    })
})

/*
router.get('/Devise/:devise&:validite',(req,res)=>{
    var data_one = req.params.devise
    var theDate = req.params.validite
    //console.log(req.params.validite)
     var data_two = theDate.split("-").reverse().join("-")
   // console.log (data_one,data_two)

  request.query("SELECT devise,FORMAT (validite, 'dd-MM-yyyy') as validite,taux FROM  FACT_DEVISES WHERE devise = '" + data_one + "' AND validite = '" + data_two + "'",(err,rows)=>{
        if(err){
            console.log(err)
           //res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 

        }
    })
})
*/
module.exports = router