<template>
<form>
    <b-navbar toggleable="lg"  variant="success">
         <router-link  to="/Agent" class="nav-link" id="acc"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
            <router-link  to="/" class="nav-link" id="door"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
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
                    <input type="text" class="form-control" placeholder="Type de paiement" required v-model= "typePaiment">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Libelle" required v-model= "Libelle">
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
             <th scope="col">Type de paiement</th>
             <th scope="col">Libelle</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.type_paiment">
            <td>{{item.type_paiement}}</td>
            <td>{{item.libelle}}</td>
            <td>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.type_paiement)">
                    <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</div>
  </div>
</div>
<the-footer/>
</form>
</template>

<script>
import theFooter from '../components/ContentFooter.vue'
import axios from "axios"
export default {
    name:'typePaiement',
    components :{
        theFooter
    },
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            typePaiment:'',
            Libelle:'',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/typePaiement',{
            typePaiment: this.typePaiment,
            Libelle: this.Libelle
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
        axios.get('http://localhost:3000/typePaiement')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(type){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/typePaiement/'+ type)
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
    getEdit(type){
        axios.get('http://localhost:3000/typePaiement/'+ type)
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
#nav_two{
    margin-left: 750px;
    font-size: 16px;
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
