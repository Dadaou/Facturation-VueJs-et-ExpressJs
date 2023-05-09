<template>
<form>
    <b-navbar toggleable="lg"  variant="success">
         <div class="changeCours">
            Consulter le cours de change <a href = "http://www.douanes.gov.mg/" target="_blank"> ici</a>
        </div>
         <router-link  to="/Agent" class="nav-link" id="accDev"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
            <router-link  to="/" class="nav-link" id="doorDev"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar>
    <div class="container"><br>
        <div class="row">
            <div class="col-4">
                
           
                <button id="createBtn" type="button" class="btn btn-outline-info"
                    @click="createdShowtrue(),editShowfalse(),showTablefalse()">
                    <b-icon icon="plus" aria-hidden="true"></b-icon> Nouveau
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
                    <select class="form-control"  v-model= "Devise">
                        <option v-for= "list in selectList" :key= "list.nom" :value= "{ text: list.nom }">{{list.nom}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="date" class="form-control" placeholder="Valitidé" required v-model= "Validite">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Taux (0000.00)" required v-model= "Taux">
                </div>
        <div>
            <button  type="button" class="btn btn-outline-primary btnAjout" @click="created(),createdShowfalse()">
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
             <th scope="col">Devise</th>
             <th scope="col">Validité</th>
             <th scope="col">Taux (Ar)</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.validite">
            <td>{{item.devise}}</td>
            <td>{{item.validite}}</td>
            <td>{{item.taux}}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.devise,item.validite)">
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
             <th scope="col">Devise</th>
             <th scope="col">Validité</th>
             <th scope="col">Taux</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeEdit" :key= "item.validite">
            <td>{{item.devise}}</td>
            <td>{{item.validite}}</td>
            <td>{{item.taux}}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.devise,item.validite)">Supprimer</button>
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
    name:'Devise',
    components : {
        theFooter
    },
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            Devise:'',
            Validite:'',
            Taux:'',
            selectList:[
                { nom: 'Devise...'},
                { nom:'Euro'},
                { nom:'Dollars'},
            ],
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/Devise',{
            Devise: this.Devise.text,
            Validite: this.Validite,
            Taux: this.Taux,
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
        axios.get('http://localhost:3000/Devise')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(dev,val){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             var splitDate = val.split("/").reverse().join("-")
             axios.delete('http://localhost:3000/Devise/'+ dev + '&' + splitDate)
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
    getEdit(dev,val){
        axios.get('http://localhost:3000/Devise/'+ dev + '&' + val)
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
    getDevise(){
        var devise
        this.ListeEdit.forEach(item => {
         devise = item.devise
        })
        return devise
    },
    getValidite(){
        var validite
        this.ListeEdit.forEach(item => {
         validite = item.validite
        })
        return validite
    },
    getTaux(){
        var taux
        this.ListeEdit.forEach(item => {
          taux = item.taux
        })
        return taux
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
.changeCours{
    font-size: 20px;
    font-family: 'Varela';
    color: black;
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

.theme{
      font-family: 'Optima';
      font-size: 30px;
}
#accDev{
    color: white;
    font-size: 21px;
    margin-left: 955px;
}
#doorDev{
    color: white;
    font-size: 21px;
}
</style>

