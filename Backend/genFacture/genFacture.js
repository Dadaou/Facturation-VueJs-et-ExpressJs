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

router.get('/genFactureUn/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT FACT_CLIENTS.code_client, FACT_CLIENTS.libelle_client,FACT_CLIENTS.nif_client,FACT_CLIENTS.stat_client,FACT_CLIENTS.rcs_client,FACTURES.num_facture,FORMAT(FACTURES.date_facture, 'dd/MM/yyyy') AS date_facture,FACTURES.heure_facture ,TYPE_DE_PAIEMENTS.libelle ,FACTURES.description_facture  FROM FACT_CLIENTS,TYPE_DE_PAIEMENTS,FACTURES WHERE FACT_CLIENTS.code_client = FACTURES.code_client AND FACTURES.type_paiement = TYPE_DE_PAIEMENTS.type_paiement AND FACTURES.num_facture = '"+ data +"'",(err,rows)=>{
        if(err){
            
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/genFactureDeux/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT DISTINCT FACT_SERVICES.libelle_tarif,FACT_SERVICES.unite,FACT_SERVICES.devise,FACT_SERVICES.pu,PROD.qtt,PROD.reduction,PROD.taxe FROM FACT_SERVICES,FACTURES,PROD WHERE  FACT_SERVICES.code_tarif = PROD.code_tarif AND FACTURES.num_facture = PROD.num_facture AND FACTURES.num_facture = '" + data + "'",(err,rows)=>{
        if(err){
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/genFactureDevise/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT devise,taux FROM FACT_DEVISES,FACTURES where FACTURES.num_facture = '" + data + "' AND FORMAT(FACT_DEVISES.validite, 'dd-MM-yyyy') = FORMAT(FACTURES.date_facture, 'dd-MM-yyyy')",(err,rows)=>{
        if(err){
            console.log(err)
           //res.status(400).json({message:"Error"})
        }
        else{
           res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/genFactureTrois/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT CEILING (sum(((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt - (((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt) * PROD.reduction)/ 100))) AS Montant FROM FACT_SERVICES,FACTURES,PROD,FACT_DEVISES WHERE  FACT_SERVICES.code_tarif = PROD.code_tarif AND FACTURES.num_facture = '"+ data +"' AND FORMAT(validite, 'dd-MM-yyyy') = FORMAT(date_facture, 'dd-MM-yyyy') AND FACT_SERVICES.devise = FACT_DEVISES.devise AND FACTURES.num_facture = PROD.num_facture",(err,rows)=>{
        if(err){
            console.log(err)
           //res.status(400).json({message:"Error"})
        }
        else{
           res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/genFactureQuatre/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT CEILING (sum((((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt) * PROD.taxe)/ 100)) AS MontantTVA FROM FACT_SERVICES,FACTURES,PROD,FACT_DEVISES WHERE  FACT_SERVICES.code_tarif = PROD.code_tarif AND FACTURES.num_facture = '"+ data +"' AND FORMAT(validite, 'dd-MM-yyyy') = FORMAT(date_facture, 'dd-MM-yyyy') AND FACT_SERVICES.devise = FACT_DEVISES.devise AND FACTURES.num_facture = PROD.num_facture",(err,rows)=>{
        if(err){
            console.log(err)
           //res.status(400).json({message:"Error"})
        }
        else{
           res.status(200).send(rows.recordset) 
        }
    })
})

router.get('/genFactureCinq/:numero',(req,res)=>{
    var data = req.params.numero
    request.query("SELECT CEILING (sum((((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt - (((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt) * PROD.reduction)/ 100)) + (((FACT_SERVICES.pu * FACT_DEVISES.taux)*PROD.qtt) * PROD.taxe)/ 100)) AS Total FROM FACT_SERVICES,FACTURES,PROD,FACT_DEVISES WHERE  FACT_SERVICES.code_tarif = PROD.code_tarif AND FACTURES.num_facture = '"+ data +"' AND FORMAT(validite, 'dd-MM-yyyy') = FORMAT(date_facture, 'dd-MM-yyyy') AND FACT_SERVICES.devise = FACT_DEVISES.devise AND FACTURES.num_facture = PROD.num_facture",(err,rows)=>{
        if(err){
            console.log(err)
           //res.status(400).json({message:"Error"})
        }
        else{
           res.status(200).send(rows.recordset) 
        }
    })
})

module.exports = router