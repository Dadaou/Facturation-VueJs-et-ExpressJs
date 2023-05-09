<template>
<form>
     <b-navbar toggleable="lg" variant="success">
            <router-link  to="/Agent" class="nav-link" id="acc"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
            <router-link  to="/" class="nav-link" id="door"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar>
    <div class="container"><br>
        <div class="row">
            <div class="col-4">
                <button id="createBtn" type="button" class="btn btn-outline-info"
                    @click="createdShowtrue(),editShowfalse(),showTablefalse()">
                     <b-icon icon="plus" aria-hidden="true"></b-icon> Nouveau</button>
                <button  
                    type="button" class="btn btn-outline-warning btnAffic" @click="mounted(),createdShowfalse(),showTablefalse()">
                      <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon> Actualiser
                </button>
            </div>  
    </div><br>
        <div class="row justify-content-center">
            <div class="col-4" v-show="createdVisible">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Code sevice" required autofocus v-model= "Code_tarif">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Libelle" required v-model= "Libelle">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Unité" required v-model= "Unite">
                </div>
                <div class="form-group">
                    <select class="form-control"  v-model= "Devise">
                        <option v-for= "list in selectList" :key= "list.nom" :value= "{ text: list.nom }">{{list.nom}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="number" class="form-control" placeholder="Prix Unitaire" v-model= "Pu" min="0">
                </div>
        <div>
            <button  type="button" class="btn btn-outline-primary btnAjout" @click="created(),createdShowfalse()">
                  <b-icon icon="reply" aria-hidden="true"></b-icon> Ajouter</button>
        </div>
    </div>

    
    <div class="col-4" v-for= "item in ListeEdit" :key= "item.code_tarif" v-show= "editVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Code service" required v-model= "item.code_tarif" readonly>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Libelle" required v-model= "item.libelle_tarif">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Unité" required v-model= "item.unite">
        </div>
        <div class="form-group">
         <select id="monSelect" class="form-control" @click="getIndexCode()">
                    <option selected>{{item.devise}}</option>
                    <option>Euro</option>
                    <option>Dollars</option>
         </select>
        </div>
        <div class="form-group">
            <input type="number" class="form-control" placeholder="Prix Unitaire" v-model= "item.pu">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.code_tarif),editShowfalse()">
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
             <th scope="col">Code service</th>
             <th scope="col">Libelle</th>
             <th scope="col">Unité</th>
             <th scope="col">EN</th>
             <th scope="col">PU</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.code_tarif">
            <td>{{item.code_tarif}}</td>
            <td>{{item.libelle_tarif}}</td>
            <td>{{item.unite}}</td>
            <td>{{item.devise}}</td>
            <td>{{item.pu}}</td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.code_tarif),createdShowfalse(),editShowtrue()">
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.code_tarif)">
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
             <th scope="col">Code sevice</th>
             <th scope="col">Libelle</th>
             <th scope="col">Unité</th>
             <th scope="col">Devise</th>
             <th scope="col">PU</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeEdit" :key= "item.code_tarif">
             <td>{{item.code_tarif}}</td>
            <td>{{item.libelle_tarif}}</td>
            <td>{{item.unite}}</td>
            <td>{{item.devise}}</td>
            <td>{{item.pu}}</td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.code_tarif),createdShowfalse(),editShowtrue()">
                        <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.code_tarif),mounted()">
                     <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</div><br><br>
<the-footer/>
</form>
</template>

<script>
import theFooter from '../components/ContentFooter.vue'
import axios from "axios"
export default {
    name:'Tarif',
    components :{
        theFooter
    },
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            Code_tarif: '',
            Libelle: '',
            Unite:'',
            Devise:'',
            Pu:'',
            selectList:[
                { nom: 'Devise...'},
                { nom:'Euro'},
                { nom:'Dollars'}
            ],
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/Tarif',{
            Code_tarif: this.Code_tarif,
            Libelle: this.Libelle,
            Unite: this.Unite,
            Devise: this.Devise.text,
            Pu: this.Pu,
        })
        .then(reponse => {
            this.mounted()
            alert(reponse.data)
        })
        .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
    },
    mounted(){
        axios.get('http://localhost:3000/Tarif')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(code){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/Tarif/'+ code)
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
    getEdit(code){
        axios.get('http://localhost:3000/Tarif/'+ code)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
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
    getCode(){
        var code
        this.ListeEdit.forEach(item => {
         code = item.code_tarif
        })
        return code
    },
    getLibelle(){
        var libelle
        this.ListeEdit.forEach(item => {
         libelle = item.libelle_tarif
        })
        return libelle
    },
    getUnite(){
        var unite
        this.ListeEdit.forEach(item => {
          unite = item.unite
        })
        return unite
    },
    getDevise(){
        var devise
        this.ListeEdit.forEach(item => {
         devise = item.devise
        })
        return devise
    },
    getPu(){
        var pu
        this.ListeEdit.forEach(item => {
         pu = item.pu
        })
        return pu
    },
    edit(code){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/Tarif/'+ code,{
            Code_tarif : this.getCode(),
            Libelle : this.getLibelle(),
            Unite : this.getUnite(),
            Devise : this.getIndexCode(),
            Pu : this.getPu()
         })
         .then(reponse => {
                alert(reponse.data)
                this.mounted()
            })
            .catch(error =>{
            error = "Erreur, vérifiez les informations mentionnées!"
            alert(error)
        })
        }
        else alert("Modification annuler")
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
    getIndexCode(){
        var list = document.querySelector('#monSelect')
        var code = (list.options[list.selectedIndex].innerHTML)   
        return code
    },
    
 }
}
</script>

<style>
#nav_one{
    margin-left: 18px;
    font-size: 40px;
    color: white;
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
#acc{
    color: white;
    font-size: 21px;
    margin-left: 1210px;
}
#door{
    color: white;
    font-size: 21px;
}
</style>

