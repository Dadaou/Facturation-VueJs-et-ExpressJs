<template>
<nav class="navbar navbar-expand-lg navbar-light">
<a class="navbar-brand monthm" href="#" v-for="item in myImage" :key="item">
  <img :src= "item.image" alt="...">
</a>
</nav>
</template>
<script>
export default {
    name : 'headerLogin',
    data(){
      return{
        myImage: [
          {image : './images/Logo SMMC.png'},
        ]
      }
    }
}
</script>
<style scoped>
img{
  height: 100px;
  width: 300px;
}
</style>