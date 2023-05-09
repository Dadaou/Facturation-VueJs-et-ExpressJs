<template>
<div>
     <b-navbar toggleable="lg" variant="success">
          <form class="d-flex">
                <input class="form-control" type="search" placeholder="N° facture" v-model= "codeSearch">
                <button class="btn btn-success" type="button" @click="getSearch(codeSearch),showTabletrue()">
                    <b-icon icon="search"></b-icon>
                </button>
          </form>
            <b-navbar-brand><router-link  to="/genFacture" class="nav-link" id="suivant">Générer une facture</router-link></b-navbar-brand>
            <router-link  to="/Agent" class="nav-link" id="accFact"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
            <router-link  to="/" class="nav-link" id="doorFact"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar><br>
   
    <div class="container">
        <b-tabs content-class="mt-3" >
            <b-tab title="Step 1">
                <form>
    <div class="container"><br>
        <div class="row">
            <div class="col-4">
                <button id="createBtn" type="button" class="btn btn-outline-info"
                    @click="createdShowtrue(),editShowfalse(),showTablefalse()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Nouvelle
                </button>
                <button
                    type="button" class="btn btn-outline-warning btnAffic" 
                    @click="mounted(),createdShowfalse(),showTablefalse()">
                    <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon> Actualiser
                </button>

            </div>
    </div><br>
       
        <div class="row justify-content-center">
            <div class="col-4" v-show="createdVisible">
                 <div class="form-group">
                    <input type="text" class="form-control" placeholder="N° facture" required v-model= "numFacture">
                </div>

                <div class="form-group">
                     <select id = "listUn" class="form-control" required @click="getCodeCli()">
                        <option selected>Client...</option>
                        <option v-for="item in ListCli" :key="item.code_client">{{item.code_client}}</option>
                     </select>
                </div>
                 <div class="form-group">
                    <input type="date" class="form-control" v-model= "theDate">
                </div>
                 <div class="form-group">
                    <input type="time" class="form-control" v-model= "theTime">
                </div>
                 <div class="form-group">
                     <select id = "listThree" class="form-control" required @click="getCodeType()">
                        <option selected>Type de paiement...</option>
                        <option v-for="item in ListPaiement" :key="item.type_paiement">{{item.type_paiement}}</option>
                     </select>
                </div>
                <div class="form-group">
                    <textarea class="form-control" placeholder="Description ou remarque" v-model= "Description"></textarea>
                </div>
        <div>
            <button  type="button" class="btn btn-outline-primary btnAjout" @click="created(),createdShowfalse()">
                <b-icon icon="reply" aria-hidden="true"></b-icon> Ajouter</button>
        </div>
    </div>
     <div class="col-4" v-for= "item in ListeEdit" :key= "item.num_facture" v-show= "editVisible">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="N° Facture" readonly v-model= "item.num_facture">
                </div>

                <div class="form-group">
                     <select id = "listDeux" class="form-control" required @click="getCodeCli()">
                        <option selected>{{item.code_client}}</option>
                        <option>Client...</option>
                        <option v-for="item in ListCli" :key="item.code_client">{{item.code_client}}</option>
                     </select>
                </div>
                 <div class="form-group">
                    <input type="date" class="form-control" v-model= "item.date_facture">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" v-model= "item.heure_facture">
                </div>
                <div class="form-group">
                     <select id = "listFor" class="form-control" required @click="getCodeType()">
                        <option selected>{{item.type_paiement}}</option>
                        <option>Type de paiement...</option>
                        <option v-for="item in ListPaiement" :key="item.type_paiement">{{item.type_paiement}}</option>
                     </select>
                </div>
                <div class="form-group">
                    <textarea class="form-control" placeholder="Déscription" v-model= "item.description_facture"></textarea>
                </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.num_facture),editShowfalse()">
            <b-icon icon="check2" aria-hidden="true"></b-icon> Enregistrer</button>       
        </div>
    </div>
 </div>
</div><br>
<div class="container">
<div class="row">
  <div class="col">
    <table class="table table-striped" v-show="!showTableEdit">
        <thead>
            <tr>
             <th scope="col">N° Facture</th>
             <th scope="col">Code client</th>
             <th scope="col">Date facture</th>
             <th scope="col">Heure</th>
            <th scope="col">Type de paiement</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.num_facture">
            <td>{{item.num_facture}}</td>
            <td>{{item.code_client}}</td>
            <td>{{item.date_facture}}</td>
            <td>{{item.heure_facture}}</td>
            <td>{{item.type_paiement}}</td>
            <td>
                 <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.num_facture),createdShowfalse(),editShowtrue()">
                   <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.num_facture)">
                    <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
     <table class="table table-striped" v-show="showTableEdit">
        <thead>
            <tr>
             <th scope="col">N° Facture</th>
             <th scope="col">Code client</th>
             <th scope="col">Date facture</th>
             <th scope="col">Heure</th>
             <th scope="col">Type de paiement</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeEdit" :key= "item.validite">
            <td>{{item.num_facture}}</td>
            <td>{{item.code_client}}</td>
            <td>{{item.date_facture}}</td>
            <td>{{item.heure_facture}}</td>
             <td>{{item.type_paiement}}</td>
            <td>
               <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.num_facture),createdShowfalse(),editShowtrue()">
                   <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.num_facture)">
                    <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</div>
</form>
            </b-tab>
<!-- ///////////////////////////////////////////////////////////////////////////////////////////////  -->
        <b-tab title="Step 2">
            <form>
    <div class="container"><br>
        <div class="row">
            <div class="col-4">
                <button id="createBtn" type="button" class="btn btn-outline-info"
                    @click="createdShowtrue(),editShowfalse(),showTablefalse()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Nouveau
                </button>
                <button
                    type="button" class="btn btn-outline-warning btnAffic" 
                    @click="mountedThree(),createdShowfalse(),showTablefalse()">
                    <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon>Actualiser
                </button>
            </div>
    </div><br>
       
        <div class="row justify-content-center">
            <div class="col-4" v-show="createdVisible">

                <div class="form-group">
                     <select id = "listOne" class="form-control" required @click="getCodeFact()">
                        <option selected>N° facture...</option>
                        <option v-for="item in ListFact" :key="item.num_facture">{{item.num_facture}}</option>
                     </select>
                </div>
                <div class="form-group">
                     <select id = "listTwo" class="form-control" required @click="getCodeTar()">
                        <option selected>Service...</option>
                        <option v-for="item in ListProd" :key="item.code_tarif">{{item.code_tarif}}</option>
                     </select>
                </div>
                 <div class="form-group">
                    <input type="number" class="form-control" placeholder="Quantité" v-model= "Qtt" min="1">
                </div>
                 <div class="form-group">
                    <input type="text" class="form-control" placeholder="Taux (en %)" v-model= "Taxe">
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" placeholder="Réduction (en %)" v-model= "Reduction" min="0">
                </div>
                 
               
        <div>
            <button  type="button" class="btn btn-outline-primary btnAjout" @click="createdThree(),createdShowfalse()">
                <b-icon icon="reply" aria-hidden="true"></b-icon> Ajouter</button>
        </div>
    </div>
 </div>
</div><br>
<div class="container">
<div class="row">
  <div class="col">
    <table class="table table-striped" v-show="!showTableEdit">
        <thead>
            <tr>
             <th scope="col">N° Facture</th>
             <th scope="col">Code Service</th>
             <th scope="col">Quantité</th>
             <th scope="col">Taux</th>
             <th scope="col">Réduction</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeThree" :key= "item.num_facture">
            <td>{{item.num_facture}}</td>
            <td>{{item.code_tarif}}</td>
            <td>{{item.qtt}}</td>
            <td>{{item.taxe}}</td>
            <td>- {{item.reduction}}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deletedThree(item.num_facture,item.code_tarif)">
                    <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
  </div>
 
</div>
</form>
        </b-tab>
        </b-tabs>
</div><br><br>

<the-footer/>
</div>
</template>
<script>
import theFooter from '../components/ContentFooter.vue'
import axios from "axios"
export default {
    name:'Facture',
    components :{
        theFooter
    },
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            ListCli: [],
            numFacture:'',
            theDate:'',
            theTime:'',
            Description:'',
            codeSearch : '',
            ListeThree:[],
            ListFact:[],
            ListProd: [],
            ListPaiement:[],
            Qtt:'',
            Taxe:'',
            Reduction:'',
            Type:'',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    getCodeCli(){
        axios.get('http://localhost:3000/codeClient')
        .then(reponse => {
            this.ListCli= reponse.data
        })
    },
    getIndexCode(){
        var list = document.querySelector('#listUn')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
    getIndexCodeDeux(){
        var list = document.querySelector('#listDeux')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
    created(){
        axios.post('http://localhost:3000/api/Facture',{
            numFacture: this.numFacture,
            Code: this.getIndexCode(),
            theDate: this.theDate,
            theTime: this.theTime,
            Type:this.getIndexType(),
            Description: this.Description
        })
        .then(reponse => {
            alert(reponse.data)
            this.mounted()
        })
        .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
    },
    mounted(){
        axios.get('http://localhost:3000/api/Facture')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(num){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/api/Facture/'+ num)
            .then(reponse => {
                this.mounted()
                alert(reponse.data)
            })
            .catch(error =>{
             error = "Il y a eu une erreur"
             alert(error)
        })
        
    }
        else alert("Suppression annuler")
    },
    getEdit(num){
        axios.get('http://localhost:3000/api/Facture/'+ num)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
    },
    getSearch(num){
        if (this.codeSearch == '') alert ('Entrez un N° facture à rechercher')
        else{
         axios.get('http://localhost:3000/api/Facture/'+ num)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
    }
        },
    edit(num){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/api/Facture/'+ num,{
             numFacture: this.getNum(),
             Code: this.getIndexCodeDeux(),
             theDate: this.getDate(),
             theTime: this.getTime(),
             Type:this.getIndexTypeDeux(),
             Description: this.getDesc()
         })
         .then(reponse => {
                this.mounted()
                alert(reponse.data)
            })
         .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
        }
        else alert("Modification annuler")
    },
    createdShowtrue(){
        this.createdVisible  = true
    },
    createdShowfalse(){
        this.createdVisible  = false
    },
    editShowtrue(){
        this.editVisible= true
    },
    editShowfalse(){
        this.editVisible = false
    },
    getNum(){
        var num
        this.ListeEdit.forEach(item => {
         num = item.num_facture
        })
        return num
    },
    getCode(){
        var code
        this.ListeEdit.forEach(item => {
         code = item.code_client
        })
        return code
    },
    getDate(){
        var date
        this.ListeEdit.forEach(item => {
          date = item.date_facture
        })
        return date
    },
    getDesc(){
        var desc
        this.ListeEdit.forEach(item => {
          desc = item.description_facture
        })
        return desc
    },
    getTime(){
        var time
        this.ListeEdit.forEach(item => {
          time = item.heure_facture
        })
        return time
    },
    getTypePListe(){
        var type
        this.ListeEdit.forEach(item => {
          type = item.type_paiement
        })
        return type
    },
    showTabletrue(){
        this.showTableEdit = true
    },
    showTablefalse(){
        this.showTableEdit = false
    },
    showChoiceTrue(){
        this.showChoice = true
    },
    showChoiceFalse(){
        this.showChoice = false
    },
     getCodeType(){
        axios.get('http://localhost:3000/codePaiement')
        .then(reponse => {
            this.ListPaiement= reponse.data
        })
    },
    getIndexType(){
        var list = document.querySelector('#listThree')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
    getIndexTypeDeux(){
        var list = document.querySelector('#listFor')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
/* ////////////////////////////////////////////////////////////////////////////////////////////////////  */ 
    getCodeTar(){
        axios.get('http://localhost:3000/codeTar')
        .then(reponse => {
            this.ListProd= reponse.data
        })
    },
    getCodeFact(){
        axios.get('http://localhost:3000/codeFact')
        .then(reponse => {
            this.ListFact= reponse.data
        })
    },
    getIndexCodeThree(){
        var list = document.querySelector('#listOne')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
    getIndexCodeFor(){
        var list = document.querySelector('#listTwo')
        var code = (list.options[list.selectedIndex].text)   
        return code
    },
    
    createdThree(){
        if(this.Reduction == ''){
        axios.post('http://localhost:3000/api/Prod',{
            numFacture: this.getIndexCodeThree(),
            Code: this.getIndexCodeFor(),
            Qtt: this.Qtt,
            Taxe: this.Taxe,
            Reduction: '0',
            Type:this.getIndexType()
        })
        .then(reponse => {
            alert(reponse.data)
            this.mountedThree()
        })
        .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
        }
        else{
            axios.post('http://localhost:3000/api/Prod',{
            numFacture: this.getIndexCodeThree(),
            Code: this.getIndexCodeFor(),
            Qtt: this.Qtt,
            Taxe: this.Taxe,
            Reduction: this.Reduction,
            Type:this.getIndexType()
        })
        .then(reponse => {
            alert(reponse.data)
            this.mountedThree()
        })
        .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
        }
    },
    mountedThree(){
        axios.get('http://localhost:3000/api/Prod')
        .then(reponse => {
            this.ListeThree = reponse.data
        })
    },
    deletedThree(num,code){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/api/Prod/'+ num + '&' + code)
            .then(reponse => {
                alert(reponse.data)
                 this.mountedThree()
            })
            .catch(error =>{
             error = "Il y a eu une erreur"
             alert(error)
        })
        
    }
        else alert("Suppression annuler")
    }
    
 }
}
</script>
<style>
#nav_one{
    margin-left: 18px;
    font-size: 40px;
    color: white;
}

#nav_two{
    margin-left: 1000px;
    font-size: 20px;
}
.btnAffic{
    margin-left: 20px
}
.btnSuppr{
    margin-left: 10px
}
.btnSearch{
      margin-left: 100px
}
.listUn{
      margin-left: 60px
}
.mytable{
    margin-left: 420px
}
.myNav{
    padding-left: 15px;
    font-size: 20px;
}
h4{
    font-family: 'Varela';
    font-style: inherit;
}
.theme{
      font-family: 'Optima';
      font-size: 30px;
}
.yes{
    margin-left: 1000px;
}
#accFact{
    color: white;
    font-size: 21px;

}
#doorFact{
    color: white;
    font-size: 21px;
}
#suivant{
    color: white;
    margin-left: 740px;
}

</style>




