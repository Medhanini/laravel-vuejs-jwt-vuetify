<template>
  <v-app>
    <TheNavBar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TheNavBar from "./components/TheNavBar"
export default {
  name: "App",
  components:{
      TheNavBar
  }
};
</script>