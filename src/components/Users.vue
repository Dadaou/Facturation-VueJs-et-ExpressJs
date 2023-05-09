<template>
<div>
    <b-navbar toggleable="lg" variant="success">
        <router-link  to="/Admin" class="nav-link" id="acc"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
        <router-link  to="/" class="nav-link" id="door"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar><br>
    <div class="container">
    <form>
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
                    <input type="text" class="form-control" placeholder="Nom d'utillisateur" required autofocus v-model= "User">
                </div>
                <div class="form-group">
                    <select id = "roleSelection" class="form-control" required @click="getRole()">
                        <option>Rôle...</option>
                        <option v-for="item in Liste_role" :key="item.code_role">{{item.code_role}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Mot de passe" v-model= "Mdp">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Confirmez mot de passe" v-model= "Confirmation">
                </div>
        <div>
            <button  type="button" class="btn btn-outline-primary btnAjout" @click="created(),createdShowfalse()">
                  <b-icon icon="reply" aria-hidden="true"></b-icon> Ajouter</button>
        </div>
    </div>
    
    <div class="col-4" v-for= "item in ListeEdit" :key= "item.nom_user" v-show= "editVisible">
       <div class="form-group">
         <input type="text" class="form-control" placeholder="Nom d'utillisateur" required autofocus v-model= "item.nom_user" readonly>
        </div>
        <div class="form-group">
         <input type="text" class="form-control" placeholder="Rôle" required autofocus v-model= "item.role" readonly>
        </div>
        <div class="form-group">
           <input type="password" class="form-control" placeholder="Nouveau mot de passe" v-model= "newPsswd">
        </div>
         <div class="form-group">
            <input type="password" class="form-control" placeholder="Confirmez mot de passe" v-model= "newConfirmation">
        </div>
        <div>      
        </div>
          <div>
            <button  type="button" class="btn btn-outline-secondary" @click="edit(item.nom_user,item.role),editShowfalse()">
                <b-icon icon="check2" aria-hidden="true"></b-icon> Enregistrer</button>       
            </div>
    </div>
 </div><br>

<div class="container">
<div class="row">
  <div class="col">
    <table class="table table-striped" v-show="!showTableEdit">
        <thead>
            <tr>
             <th scope="col">Nom d'utilisateur</th>
             <th scope="col">Rôle</th>
             <th scope="col">Mot de passe</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in Liste" :key= "item.user">
            <td>{{item.nom_user}}</td>
            <td>{{item.role}}</td>
             <td>{{item.mdp}}</td>
            <td>
                <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.nom_user,item.role),createdShowfalse(),editShowtrue()">
                    <b-icon icon="pencil-fill" aria-hidden="true"></b-icon>
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.nom_user,item.role)">
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
             <th scope="col">Nom d'utilisateur</th>
             <th scope="col">Rôle</th>
             <th scope="col">Mot de passe</th>
             <th>Action</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeEdit" :key= "item.nom_user">
            <td>{{item.nom_user}}</td>
            <td>{{item.role}}</td>
            <td>{{item.mdp}}</td>
            <td>
                 <button type="button" class="btn btn-outline-success btn-sm" @click="getEdit(item.nom_user,item.role),createdShowfalse(),editShowtrue()">
                <b-icon icon="pencil-fill" aria-hidden="true"></b-icon></button>
                <button type="button" class="btn btn-outline-danger btn-sm btnSuppr" @click="deleted(item.nom_user,item.role),mounted()">
                     <b-icon icon="trash" aria-hidden="true"></b-icon> 
                </button>
            </td>
        </tr>
        </tbody>
    </table>
  </div>
</div>
</form>
    </div><br><br>
<the-footer/>
</div>

</template>

<script>
import theFooter from '../components/ContentFooter.vue'
import axios from "axios"
export default {
    name:'Users',
    components:{
        theFooter
    },
    data(){
        return{
            Liste_role:[],
            Liste:[],
            ListeEdit:[],
            ListeEditTwo:[],
            User: '',
            Role: '',
            Mdp: '',
            Confirmation:'',
            newPsswd:'',
            newConfirmation:'',
            Libelle: '',
            RoleTwo: '',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
    created(){
        if (this.Mdp != this.Confirmation)
        {
            alert('Le mot de masse ne correspond pas')
        }
        else {
            axios.post('http://localhost:3000/Users',{
            User: this.User,
            Role: this.getIndexCode(),
            Mdp: this.Mdp,
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
       
    },
    mounted(){
        axios.get('http://localhost:3000/Users')
        .then(reponse => {
            this.Liste = reponse.data
        })
    },
    deleted(usr,code){
        var result = confirm('Vous êtes sur le point de supprimer, confirmez!')
        if(result){
             axios.delete('http://localhost:3000/Users/'+ usr + '&' + code)
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
    getEdit(usr,code){
        axios.get('http://localhost:3000/Users/'+ usr + '&' + code)
        .then(reponse => {
            this.ListeEdit = reponse.data
        })
    },
    getMdp(){
        var mdp
        this.ListeEdit.forEach(item => {
         mdp = item.mdp
        })
        return mdp
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
         code = item.code_role
        })
        return code
    },
    getUsr(){
        var usr
        this.ListeEdit.forEach(item => {
         usr = item.nom_user
        })
        return usr
    },
    edit(usr,code){
        if( this.getMdp() == this.newPsswd){
            alert("Veuillez mettre un mot de passe différent!")
        }
        else if (this.newPsswd != this.newConfirmation)
        {
            alert('Le mot de masse ne correspond pas')
        }
        else {
        var result = confirm('Vous êtes sur le point de modifiez, confirmez!')
        if(result){
            axios.put('http://localhost:3000/Users/'+ usr + '&' + code,{
             User : this.getUsr(),
             Role : this.getCode(),
             newPsswd : this.newPsswd
         })
         .then(reponse => {
                alert(reponse.data)
                this.mounted()
            })
        }
            else alert("Modification annuler")
        }
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
        var list = document.querySelector('#roleSelection')
        var code = (list.options[list.selectedIndex].innerHTML)   
        return code
    },
    getRole(){
        axios.get('http://localhost:3000/api/Role')
        .then(reponse => {
            this.Liste_role = reponse.data
        })
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
    margin-left: 800px;
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

