<template>
<form>
  <headerLogin/>
<div class="container">
<div class="card box">
  <div class="card-body myBox">
      <span id="seConnecter"><b-icon icon='person-circle' id="theLogin"></b-icon></span>
      <form>
        <div class="myContent">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                      <b-icon icon="person" variant="success"></b-icon>
                    </div>
                </div>
                  <input class="form-control theInput" type="text" placeholder="Utilisateur" v-model="usr" ><br>
            </div><br>
             <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">
                      <b-icon icon="key" variant="success"></b-icon>
                    </div>
                </div>
                   <input class="form-control theInput" type="password" placeholder="Mot de passe" v-model="psswd"><br>
            </div><br>
          <button class="btn btn-success form-control" id="myBtn" @click="created()">Connexion</button>
          <h6  v-show="estIncorect">Nom d'utilisateur et/ou mot de passe incorrecte</h6>
        </div>
      </form>
  </div>
</div>
</div>
</form>
</template>
<script>
import  headerLogin from '../components/headerLogin.vue'
import axios from 'axios'
export default {
    name : 'Login',
    components :{
      headerLogin
    },
    data(){
        return{
        myImage: [
          {image : './images/container.jpg'}
        ],
            result : '',
            usr:'',
            psswd:'',
            estIncorect : false
        }
    },
    methods :{
        created(){
            axios.post('http://localhost:3000/weConnect',{
            usr: this.usr,
            psswd: this.psswd
        })
        .then(reponse => {
              //this.$session.start()
              this.$router.push(reponse.data)
            })
            .catch(error =>{
             error = "Le Nom d'utilsateur et/ou le Mot de passe est incorrecte"
             console.log(error)
             this.estIncorect = true
             
        })
        },
        mounted(){
        axios.get('http://localhost:3000/weConnect')
        .then(reponse => {
            this.$router.push(reponse.data)
        })
    }
    }
    
}
</script>

<style>
.myBox{
  background-color: white;
}
.box{
    width: 400px;
    height: 300px;
    margin-left: 370px;
    margin-top: 50px;
}
.myContent{
    padding-top: 5px;
}
#seConnecter{
  font-size: 45px;
} 
h6{
    color: red;
    font-family: 'Times New Roman', Times, serif;
    padding-left: 10px;
}
.theInput{
  border-radius: 10px;
}
#theLogin{
  font-size: 80px;
  color: forestgreen;
}
</style>
