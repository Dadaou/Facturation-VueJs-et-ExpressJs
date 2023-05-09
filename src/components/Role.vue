
<template>
<div>
    <b-navbar toggleable="lg" variant="success">
           <router-link  to="/Admin" class="nav-link" id="acc"><b-icon v-b-popover.hover.top="'Retour à l\'accueil'" icon='house-fill'></b-icon></router-link>
            <router-link  to="/" class="nav-link" id="door"><b-icon icon="door-open-fill"  v-b-popover.hover.top="'Se déconnecter'"></b-icon></router-link>
    </b-navbar><br>
    <div class="container">

<form>
        <div class="row">
                <button  
                    type="button" class="btn btn-outline-warning btnAffic" @click="mountedTwo(),createdShowfalse(),showTablefalse()">
                      <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon> Actualiser
                </button>   
        </div><br>

<div class="container">
<div class="row">
  <div class="col">
    <table class="table table-striped" v-show="!showTableEdit">
        <thead>
            <tr>
             <th scope="col">Code rôle</th>
             <th scope="col">Libelle</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for= "item in ListeTwo" :key= "item.code_role">
            <td>{{item.code_role}}</td>
            <td>{{item.libelle_role}}</td>
        </tr>
        </tbody>
    </table>
</div>

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
            ListeTwo:[],
        }
    },
    methods:{
    mountedTwo(){
        axios.get('http://localhost:3000/Role')
        .then(reponse => {
            this.ListeTwo = reponse.data
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

