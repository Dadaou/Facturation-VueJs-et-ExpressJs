
  <template>
<div>
  <nav class="main-nav">
      <Panel></Panel>
  </nav>
  <Sidebar>
    <div class="h2 mb-0" id="personIcon">
           <b-icon icon="person-circle" v-b-popover.hover.top="'Administrateur'"></b-icon>
    </div>
    <ul class="navbar-nav sidebar-panel-nav">
      <li class="list">
        <router-link  to="/Users" class="nav-link" id="user"><b-icon icon='person-lines-fill'></b-icon> UTILISATEUR </router-link>
      </li>
      <li class="theRoleP">
        <router-link  to="/Role" class="nav-link" id="role"><b-icon icon='distribute-vertical'></b-icon> RÔLE </router-link>
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
#user,#role{
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
.list{
  margin-right: 70px;
}
.theRoleP{
  margin-right: 144px;
  margin-top: 20px;
}

</style>
