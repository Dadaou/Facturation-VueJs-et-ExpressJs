<template>
<div>
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
                        <option selected>N° Facture...</option>
                        <option v-for="item in ListFact" :key="item.num_facture">{{item.num_facture}}</option>
                     </select>
                </div>
                <div class="form-group">
                     <select id = "listTwo" class="form-control" required @click="getCodeTar()">
                        <option selected>Tarif...</option>
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
                <b-icon icon="journals" aria-hidden="true"></b-icon> Ajouter</button>
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
             <th scope="col">Code Tarif</th>
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
  <div class="row yes">
    <b-navbar-brand id="suivant"><router-link  to="/genFacture" class="nav-link">Suivant ></router-link></b-navbar-brand>
  </div>
</div>
</form>

</div>
</template>
<script>

import axios from "axios"
export default {
    name:'Prod',
    data(){
        return{
            ListeThree:[],
            ListFact:[],
            ListProd: [],
            Qtt:'',
            Taxe:'',
            Reduction:'',
            createdVisible : false,
            editVisible:false,
            showTableEdit:false,
            showChoice:false
        }
    },
    methods:{
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
            Reduction: '0'
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
            Reduction: this.Reduction
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
    font-size: 25px;
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
</style>


          



