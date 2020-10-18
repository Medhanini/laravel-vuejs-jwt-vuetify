<template>
  <v-app>
    <TheNavBar/>
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