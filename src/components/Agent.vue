<template>
<div>
  <nav class="main-nav">
      <Panel></Panel>
  </nav>
  <Sidebar>
    <div class="h2 mb-0" id="personIcon">
           <b-icon icon="person-circle" v-b-popover.hover.top="'Agent de facturation'"></b-icon>
    </div>
    <ul class="navbar-nav sidebar-panel-nav">
      <li class="liste">
        <router-link  to="/Client" class="nav-link" id="cli"><b-icon icon='person'></b-icon> CLIENT </router-link>
      </li>
      <li class="listeUn">
        <router-link  to="/Tarif" class="nav-link" id="tar"><b-icon icon='cart4' ></b-icon> SERVICE</router-link>
      </li>                                  
      <li class="listeDeux">
        <router-link  to="/Devise" class="nav-link" id="dev"><b-icon icon='cash' ></b-icon> DEVISE</router-link>
      </li>
      <li class="listeUnique">
        <router-link  to="/typePaiement" class="nav-link" id="dev"><b-icon icon='credit-card' ></b-icon> TYPE DE PAIEMENT</router-link>
      </li>
      <li class="listeTrois">
          <router-link  to="/Facture" class="nav-link" id="fact"><b-icon icon='sticky' ></b-icon> FACTURE</router-link>
      </li>
    </ul>
  </Sidebar>

<div class="container">
  <b-jumbotron class="jumbo">
    <span id="bienvenidito">SMMC Facturation</span><br>
  </b-jumbotron>
</div>
<the-footer/>
</div>
</template>
<script>
import theFooter from '../components/ContentFooter.vue'
import Panel from "../components/Panel.vue"
import Sidebar from "../components/Sidebar.vue"

export default {
    name : 'Header',
    components :{
      theFooter,
      Panel,
      Sidebar
    }
}
</script>
<style scoped>
.ThisUl{
  margin-left: 400px;
}
#style1{
  margin-left: 35px;
}

#style2{
  margin-left: 80px;
}
#user,#cli,#tar,#dev,#fact{
  color: rgb(34,139,34);
}
#personIcon{
  color: rgb(34,139,34);
  font-size: 50px;
}

li{
  padding-left: 30px;
}
.jumbo{
  height: 480px;
  background: linear-gradient(
    45deg,
    rgba(101, 31, 87, 1) 0%,
    rgba(0, 100, 0) 48%,
    rgba(0, 128, 0) 100%
  );
}
#bienvenidito{
  font-size: 100px;
  font-family: 'Varela';
}
#emoji{
  font-size: 170px;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding-left: 1310px;

}
ul.sidebar-panel-nav {
  list-style-type: none;
}
.sidebar-panel-nav {
  font-size: 20px;
  margin-top: 50px;
}
.liste{
  margin-right: 128px;
}
.listeUn{
  margin-right: 110px;
  margin-top: 20px;
}
.listeUnique{
  margin-right: 5px;
  margin-top: 20px;
}
.listeTrois{
  margin-right: 100px;
  margin-top: 20px;
}
.listeDeux{
  margin-right: 120px;
  margin-top: 20px;
}
</style>