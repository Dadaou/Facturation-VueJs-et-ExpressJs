<template>
<form>

     <b-navbar toggleable="lg" variant="success">
           <b-dropdown id="dropdown-left" text="Rechercher par" variant="success" >
                <b-dropdown-item  ><router-link  to="/Client" class="nav-link" id="CC">Le code client</router-link></b-dropdown-item>
                <b-dropdown-item  ><router-link  to="/nameSearch" class="nav-link" id="Name">Le nom</router-link></b-dropdown-item>
            </b-dropdown>
            
            <form class="d-flex searchForm">
                <input class="form-control" type="search" placeholder="Nom client" v-model= "nameSearch">
                <button class="btn btn-success" type="button" @click="getName(nameSearch),showTabletrue()">
                    <b-icon icon="search"></b-icon>
                </button>
            </form>
                <router-link  to="/Agent" class="nav-link" id="home"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
                <router-link  to="/" class="nav-link" id="arrowIcon"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar>
    <div class="container"><br>
        <div class="row">
            <div class="col-4">
                <button id="createBtn" type="button" class="btn btn-outline-info"
                    @click="createdShowtrue(),editShowfalse(),showTablefalse()">
                     <b-icon icon="plus" aria-hidden="true"></b-icon>  Nouveau</button>
                <button  
                    type="button" class="btn btn-outline-warning btnAffic" @click="mounted(),createdShowfalse(),showTablefalse()">
                      <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon> Actualiser
                </button>
            </div>

    </div><br>
        <div class="row justify-content-center">
            <div class="col-4" v-show="createdVisible">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Code client" required autofocus v-model= "Code_cli">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Libelle" required v-model= "Libelle">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="NIF" required v-model= "Nif">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="STAT" required v-model= "Stat">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="RCS" required v-model= "Rcs">
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Code douane" v-model= "Code_douane">
                </div>
        <div>
            <button type="button" class="btn btn-outline-primary btnAjout" @click="created(),createdShowfalse()">
                  <b-icon icon="reply" aria-hidden="true"></b-icon> Ajouter</button>
        </div>
    </div>

    <div class="col-4" v-for= "item in ListeEdit" :key= "item.code_client" v-show= "editVisible">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Code client" required v-model= "item.code_client" readonly>
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Libelle" required v-model= "item.libelle_client">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="NIF" required v-model= "item.nif_client">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="STAT" required v-model= "item.stat_client">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="RCS" required v-model= "item.rcs_client">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Code douane" v-model= "item.code_douane">
        </div>
        <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.code_client),editShowfalse()">
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
             <th scope="col">Code client</th>
             <th scope="col">Libelle</th>
             <th scope="col">NIF</th>
             <th scope="col">STAT</th>
             <th scope="col">RCS</th>
             <th scope="col">Code douane</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.code_client">
            <td>{{item.code_client}}</td>
            <td>{{item.libelle_client}}</td>
            <td>{{item.nif_client}}</td>
            <td>{{item.stat_client}}</td>
            <td>{{item.rcs_client}}</td>
            <td>{{item.code_douane}}</td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.code_client),createdShowfalse(),editShowtrue()">
                   <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.code_client)">
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
             <th scope="col">Code client</th>
             <th scope="col">Libelle</th>
             <th scope="col">NIF</th>
             <th scope="col">STAT</th>
             <th scope="col">RCS</th>
             <th scope="col">Code douane</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in nameResult" :key= "item.code_client">
            <td>{{item.code_client}}</td>
            <td>{{item.libelle_client}}</td>
            <td>{{item.nif_client}}</td>
            <td>{{item.stat_client}}</td>
            <td>{{item.rcs_client}}</td>
            <td>{{item.code_douane}}</td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.code_client),createdShowfalse(),editShowtrue()">
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.code_client),mounted()">
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
    name:'Client',
    components :{
        theFooter
    },
    data(){
        return{
            Liste:[],
            ListeEdit:[],
            nameResult: [],
            Code_cli: '',
            Libelle: '',
            Nif: '',
            Stat:'',
            Rcs:'',
            Code_douane:'',
            nameSearch:'',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    created(){
        axios.post('http://localhost:3000/Client',{
            Code_cli: this.Code_cli,
            Libelle: this.Libelle,
            Nif: this.Nif,
            Stat: this.Stat,
            Rcs: this.Rcs,
            Code_douane: this.Code_douane,
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
        axios.get('http://localhost:3000/Client')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(code){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/Client/'+ code)
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
        axios.get('http://localhost:3000/Client/'+ code)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
    },
     getName(nom){
        if (this.nameSearch == '') alert ('Entrez un nom à rechercher')
        else{
        axios.get('http://localhost:3000/theName/'+ nom)
        .then(reponse => {
            this.nameResult = reponse.data
        })
        }
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
         code = item.code_client
        })
        return code
    },
    getLibelle(){
        var libelle
        this.ListeEdit.forEach(item => {
         libelle = item.libelle_client
        })
        return libelle
    },
     getNif(){
        var nif
        this.ListeEdit.forEach(item => {
         nif = item.nif_client
        })
        return nif
    },
    getStat(){
        var stat
        this.ListeEdit.forEach(item => {
          stat = item.stat_client
        })
        return stat
    },
    getRCS(){
        var rcs
        this.ListeEdit.forEach(item => {
         rcs = item.rcs_client
        })
        return rcs
    },
    getDouane(){
        var douane
        this.ListeEdit.forEach(item => {
         douane = item.code_douane
        })
        return douane
    },
    edit(code){
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/Client/'+ code,{
            Code_cli : this.getCode(),
            Libelle : this.getLibelle(),
            Nif : this.getNif(),
            Stat : this.getStat(),
            Rcs : this.getRCS(),
            Code_douane : this.getDouane()
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

#CC,#Name{
    color: black;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding-left: 1310px;

}
#home{
    color: white;
    font-size: 21px;
    margin-left: 850px;
}
#arrowIcon{
    color: white;
    font-size: 21px;
}
</style>

