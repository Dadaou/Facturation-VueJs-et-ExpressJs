const express = require('express')
const bodyParser = require('body-parser')
const sql = require('mssql')
var tarif = require('../Service/Tarif.js')
var devise = require('../Devise/devise.js')
var user = require('../Users/Users.js')
var role = require ('../role/role.js')
var myConnect = require('../userConnect/connection.js')
var facture = require ('../Facture/Facture.js')
var prod = require ('../Prod/prod.js')
var genFacture = require ('../genFacture/genFacture.js')
var typePaiement = require ('../typePaiement/typePaiement.js')
const app = express()
const port = process.env.PORT || 3000

var config = {
    user: 'sa',
    password: '00000000',
    server: 'localhost', 
    database: 'nodeDb' 
}

sql.connect(config, function (err) {
    if (err) console.log('Connection failed')
    else console.log('Connection done')
})

var request = new sql.Request()
	        
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, USE, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


app.use(bodyParser.json())

app.post('/Client',(req, res) => {
    var reqBody =  req.body
    if(reqBody.Code_cli =='' || reqBody.Libelle =='' || reqBody.Nif == '' || reqBody.Stat == '' & reqBody.Rcs == '')
        res.status(401).send("Remplir tous les champs")
    else{
       request.query("INSERT INTO FACT_CLIENTS(code_client,libelle_client,nif_client,stat_client,rcs_client,code_douane) VALUES ('"+ reqBody.Code_cli +"', '"+ reqBody.Libelle +"', '"+ reqBody.Nif +"', '"+ reqBody.Stat +"', '"+ reqBody.Rcs +"', '"+ reqBody.Code_douane +"')"
        ,(err)=>{
             if(err) console.log(err)
             else res.status(200).send("Ajout éffectué")  
        })
    }
})

app.get('/Client',(req,res)=>{
    request.query("SELECT code_client,libelle_client,nif_client,stat_client,rcs_client,code_douane FROM FACT_CLIENTS",(err,rows)=>{
        if(err){      
          res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})

app.delete('/Client/:code_client',(req,res)=>{
    var data = req.params.code_client
    request.query("DELETE FROM FACT_CLIENTS WHERE code_client = '" + data + "'",(err)=>{
        
        if(err)
            res.status(400).send("Une erreur est survenue au cours de la suppression")
            //console.log(err)
        else
            res.status(200).send("Suppression éffectuée")
    })   
})

app.get('/Client/:code_client',(req,res)=>{
    var data = [req.params.code_client]
    request.query("SELECT code_client,libelle_client,nif_client,stat_client,rcs_client,code_douane FROM FACT_CLIENTS WHERE code_client = '" + data + "'",(err,rows)=>{
        if(err) res.status(400).json({message:"Error"})
        
        else res.status(200).send(rows.recordset) 
        
    })
})
app.get('/theName/:nom',(req,res)=>{
    var data = [req.params.nom]
    request.query("SELECT code_client,libelle_client,nif_client,stat_client,rcs_client,code_douane FROM FACT_CLIENTS WHERE libelle_client LIKE '%"+ data +"%'",(err,rows)=>{
        if(err){
        
           res.status(400).json({message:"Error"})
        }
        else{
            res.status(200).send(rows.recordset) 
        }
    })
})
app.put('/Client/:code_client',(req,res)=>{
    var reqBody =  req.body
    if(reqBody.Code_cli =='' || reqBody.Libelle =='' || reqBody.Nif == '' || reqBody.Stat == '' & reqBody.Rcs == '')
        res.status(401).send("Remplir tous les champs") 
    else{
        var data = req.params.code_client
        request.query("UPDATE FACT_CLIENTS SET code_client= '"+ reqBody.Code_cli +"', libelle_client='"+ reqBody.Libelle +"', nif_client='"+ reqBody.Nif +"',stat_client='"+ reqBody.Stat +"',rcs_client='"+ reqBody.Rcs +"',code_douane='"+ reqBody.Code_douane +"' WHERE code_client='"+ data +"'",(err)=>{
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

app.use(tarif)
app.use(devise)
app.use(user)
app.use(role)
app.use(myConnect)
app.use(facture)
app.use(prod)
app.use(genFacture)
app.use(typePaiement)


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})