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

router.post('/Tarif',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Code_tarif =='' || reqBody.Libelle =='' || reqBody.Unite == '' || reqBody.Devise == 'Devise...' || reqBody.Devise == undefined || reqBody.Pu == '')
        res.status(401).send("Remplir tous les champs")
    else{
        //var data = [reqBody.Code_cli, reqBody.Libelle,reqBody.Nif,reqBody.Stat,reqBody.Rcs,reqBody.Validite,reqBody.Code_douane]
        request.query("INSERT INTO FACT_SERVICES(code_tarif,libelle_tarif,unite,devise,pu) VALUES ('"+ reqBody.Code_tarif +"', '"+ reqBody.Libelle +"', '"+ reqBody.Unite +"', '"+ reqBody.Devise +"','"+ reqBody.Pu +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })
    }
})

router.get('/Tarif',(req,res)=>{
    request.query("SELECT code_tarif,libelle_tarif,unite,devise,pu FROM FACT_SERVICES",(err,rows)=>{
        if(err){
            //res.status(400).json({message:"Error"})
            console.log(err)
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.delete('/Tarif/:code_tarif',(req,res)=>{
    var data = req.params.code_tarif
    request.query("DELETE FROM FACT_SERVICES WHERE code_tarif = '" + data + "'",(err)=>{
        if(err)
            //res.status(400).send("Une erreur est survenue au cours de la suppression")
            console.log(err)
        else
            res.status(200).send("Suppression éffectuée")
    })
       
})

router.get('/Tarif/:code_tarif',(req,res)=>{
    var data = req.params.code_tarif
    request.query("SELECT code_tarif,libelle_tarif,unite,devise,pu FROM FACT_SERVICES WHERE code_tarif= '" + data + "'",(err,rows)=>{
        if(err){
            //console.log(err)
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.put('/Tarif/:code_tarif',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.Code_tarif =='' || reqBody.Libelle =='' || reqBody.Unite == '' || reqBody.Devise == 'Devise...' || reqBody.Devise == undefined || reqBody.Pu == '')
        res.status(401).send("Remplir tous les champs")
    else{
        
        var data = req.params.code_tarif
        request.query("UPDATE FACT_SERVICES SET code_tarif= '"+ reqBody.Code_tarif +"', libelle_tarif='"+ reqBody.Libelle +"',unite='"+ reqBody.Unite +"',devise='"+ reqBody.Devise +"',pu='"+ reqBody.Pu +"' WHERE code_tarif='"+ data +"'",(err)=>{
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