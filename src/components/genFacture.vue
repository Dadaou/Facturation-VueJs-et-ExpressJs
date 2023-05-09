<template>
<div class="app">
    <b-navbar toggleable="lg" type="light" variant="success">
        <button type="button" class= "btn btn-success" @click="download()">
            <b-icon icon="printer-fill" aria-hidden="true" id="Print"></b-icon>
        </button>
         <form class="d-flex mySearch">
             <div class="form-group">
                     <select id = "TheNumFact" class="form-control" required @click="getCodeFact()" @change="getTheNumFact()">
                        <option selected>N° facture...</option>
                        <option v-for="item in ListFact" :key="item.num_facture">{{item.num_facture}}</option>
                     </select>
                </div>
         </form>
    </b-navbar><br>
  <div id="html-2-pdfwrapper">
    <div class="container"><br>
      <div class="card">
            <div>
                <h5>FACTURE N°: {{getNumFact()}}</h5><br>
            </div>
       <table id="tableOne">
           <tr>
               <td><strong>Code client</strong> :  {{getCode()}}</td>
               <td class="unique"><strong>Heure d'édition</strong> :  {{getTimeFact()}}</td>
           </tr>
           <tr>
           <tr>
               <td><strong>Doit</strong> : {{getLibelle()}}</td>
               <td class="unique"><strong>Date</strong> :  {{getDateFact()}}</td>
           </tr>
           <tr>
               <td><strong>NIF </strong>: {{getNif()}}</td>
               <td class="unique"><strong>Type de paiement</strong> :  {{getTypeP()}}</td>
           </tr>
            <tr>
               <td><strong>STAT </strong>: {{getStat()}}</td>
           </tr>
            <tr>
               <td><strong> RCS </strong>: {{getRCS()}}</td>
           </tr>
             <tr class="unique" v-for= "item in listeTrois" :key= "item">
                <td>
                    <strong>{{item.devise}}</strong> :  {{item.taux}} Ar
                </td>
            </tr>
       </table>
      </div><br><br>

      <table id="tabSeven">
          <tr>
            <td id="tabTab"><h5>Description</h5></td>
          </tr>
      </table>
      <div class="row">
        <p>{{getDesc()}}</p>
      </div>
      <table class="table table-striped">
        <thead>
            <tr>
             <th scope="col">Désignation</th>
             <th scope="col">Unité</th>
             <th scope="col">EN</th>
             <th scope="col">PU</th>
             <th scope="col">Qantité</th>
             <th scope="col">Réduction (en %)</th>
             <th scope="col">Taux (en %)</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in listeDeux" :key= "item">
            <td>{{item.libelle_tarif}}</td>
            <td>{{item.unite}}</td>
            <td>{{item.devise}}</td>
            <td>{{item.pu}}</td>
            <td>{{item.qtt}}</td>
            <td>- {{item.reduction}}</td>
            <td>{{item.taxe}}</td>
        </tr>
        </tbody>
    </table>
    <table id="tableTwo">
        <tr>
            <th>Montant HT : </th>
            <td class="uniqueTwo">
                {{getMtt()}}  
            </td>
            <th class="uniqueThree">
                Ar 
            </th>
        </tr>
         <tr>
            <th>Montant TVA : </th>
            <td class="uniqueTwo">
                {{getTva()}}  
            </td>
            <th class="uniqueThree">
                Ar 
            </th>
        </tr>
         <tr>
            <th>TOTALE : </th>
            <td class="uniqueTwo">
                {{getTot()}}  
            </td>
            <th class="uniqueThree">
                Ar 
            </th>
        </tr>
    </table><br>

<div class="myText">
    <h2>Avis important</h2>
    <p>L'acquitement de cette facture vaut:<br>
    1. Acceptation des conditions générales de vente de la société notamment celles relatives aux prestations<br>
    offertes et au partage des responsabilités entre les parties prenantes.<br>
    2. Engagement contractuel entre SMMC, vendeur ou prestataire et le transitaire, acquéreur.</p>
</div>

<table class="table table-striped">
    <thead>
    <tr>
        <td id="CandZ">Le client</td>
        <td id="CandR">Le responsable</td>
    </tr>
    </thead>
</table>

</div><br>
 
 </div>

 </div>

</template>

<script>
import axios from 'axios'
//import jspdf from 'jspdf'

export default {
    name: 'genFacture',
    data(){
        return{
            ListFact:[],
            listeUn:[],
            listeDeux: [],
            listeTrois: [],
            listeQuatre:[],
            listeCinq:[],
            listeFor : [],
            numFact:''
        }
    },
    methods:{
        getTheNumFact(){
        var list = document.querySelector('#TheNumFact')
        var code = (list.options[list.selectedIndex].text) 
        axios.get('http://localhost:3000/genFactureUn/' + code)
        .then(reponse => {
            this.listeUn = reponse.data
        })
        axios.get('http://localhost:3000/genFactureDeux/' + code)
        .then(reponse => {
            this.listeDeux = reponse.data
        })
        axios.get('http://localhost:3000/genFactureDevise/'+ code)
        .then(reponse => {
            this.listeTrois = reponse.data
        })
        axios.get('http://localhost:3000/genFactureTrois/' + code)
        .then(reponse => {
            this.listeFor = reponse.data
        })
        axios.get('http://localhost:3000/genFactureQuatre/' + code)
        .then(reponse => {
            this.listeQuatre = reponse.data
        })
        axios.get('http://localhost:3000/genFactureCinq/' + code)
          .then(reponse => {
            this.listeCinq = reponse.data
        })
        },
        getCodeFact(){
        axios.get('http://localhost:3000/codeFact')
        .then(reponse => {
            this.ListFact= reponse.data
        })
        },
        download(){
        const localOptions = {
         name: '_blank',
            specs: [
            'fullscreen=yes',
            'titlebar=yes',
            'scrollbars=yes'
            ],
            styles: [
                'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                'https://unpkg.com/kidlat-css/css/kidlat.css',
                "./landscape.css"
            ]
          };
        this.$htmlToPaper('html-2-pdfwrapper', localOptions);
            /*
               let pdfName = 'test' 
               var doc = new jspdf()
                var x = document.getElementById('html-2-pdfwrapper').innerText
                doc.text(x, 10, 10)
                doc.save(pdfName + '.pdf')
            */
        },
        getDataUn(){
            alert('Sectionner')
            /*
            axios.get('http://localhost:3000/genFactureUn/' + this.getTheNumFact())
            .then(reponse => {
            this.listeUn = reponse.data
            })
            */
        },
        getDataDeux(numero){
            axios.get('http://localhost:3000/genFactureDeux/' + numero)
            .then(reponse => {
            this.listeDeux = reponse.data
        })
        },
         getDataTrois(){
            axios.get('http://localhost:3000/genFactureDevise')
            .then(reponse => {
            this.listeTrois = reponse.data
        })
        },
        getMttBack(numero){
            axios.get('http://localhost:3000/genFactureTrois/' + numero)
            .then(reponse => {
            this.listeFor = reponse.data
        })
        },
        getMttTva(numero){
            axios.get('http://localhost:3000/genFactureQuatre/' + numero)
            .then(reponse => {
            this.listeQuatre = reponse.data
        })
        },
        getMttTot(numero){
            axios.get('http://localhost:3000/genFactureCinq/' + numero)
            .then(reponse => {
            this.listeCinq = reponse.data
        })
        },
        getCode(){
        var code
        this.listeUn.forEach(item => {
         code = item.code_client
        })
        return code
        },
        getLibelle(){
        var libelle
        this.listeUn.forEach(item => {
         libelle = item.libelle_client
        })
        return libelle
        },
        getNif(){
        var nif
        this.listeUn.forEach(item => {
         nif = item.nif_client
        })
        return nif
        },
        getStat(){
        var stat
        this.listeUn.forEach(item => {
          stat = item.stat_client
        })
        return stat
        },
        getRCS(){
        var rcs
        this.listeUn.forEach(item => {
         rcs = item.rcs_client
        })
        return rcs
        },
        getNumFact(){
        var numero
        this.listeUn.forEach(item => {
         numero = item.num_facture
        })
        return numero
        },
        getTypeP(){
        var type
        this.listeUn.forEach(item => {
         type = item.libelle
        })
        return type
        },
        getDateFact(){
        var date
        this.listeUn.forEach(item => {
         date = item.date_facture
        })
        return date
        },
        getDesc(){
        var desc
        this.listeUn.forEach(item => {
         desc = item.description_facture
        })
        return desc
        },
        getTheDevise(){
        var content
        this.listeTrois.forEach(item => {
         content = item.devise
        })
        return content
        },
        getMtt(){
        var mtt
        this.listeFor.forEach(item => {
          mtt= item.Montant
        })
        return mtt
        },
        getTva(){
        var tva
        this.listeQuatre.forEach(item => {
          tva= item.MontantTVA 
        })
        return tva
        },
        getTot(){
        var tot
        this.listeCinq.forEach(item => {
          tot= item.Total
        })
        return tot
        },
        getTimeFact(){
        var time
        this.listeUn.forEach(item => {
          time = item.heure_facture
        })
        return time
        }

    }  
}
</script>


<style>
.h5{
    float: center;
}
#tableOne{
    margin-left: 100px;
}
.unique{
    padding-left: 300px;
}
.two{
    padding-left: 300px;
   
}
#tableTwo{
    margin-left: 750px;
}
.uniqueTwo{
    padding-left: 15px;
}
.uniqueThree{
    padding-left: 20px;
}
.desc{
    font-size: 20px
}
#CandR{
    padding-left: 700px;
}

#CandZ{
    padding-left: 40px;
}

.theNumFact{
    padding-left: 500px;
}
.mySearch{
    margin-left: 1130px;
}
#Print{
    font-size: 30px;
}
#resp{
    text-align: right;
}
#tabTab{
    text-decoration: underline;
}
.myText{
    padding-top: 100px;
}
</style>