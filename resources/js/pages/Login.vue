<template>
<v-row justify="center" align="center">
    <v-col cols="6">
      <div class="text-center">
<v-container>
    <v-card
    class="overflow-hidden"
    color="black lighten-1"
    dark
  >
  <v-toolbar
      flat
      color="black"
    >
      <v-toolbar-title class="font-weight-light">
        Log-In
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <moon-loader :loading="isLoding" :color="loadingColor" :size="size"></moon-loader>
    </v-toolbar>
    <v-card-text>
    <v-alert
      v-if="error"
      border="right"
      colored-border
      type="error"
      elevation="2"
    >
      {{ error }}
    </v-alert>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click.prevent="performLogin"

    >
      Login
    </v-btn>
  </v-form>
    </v-card-text>
    </v-card>
</v-container>
      </div>
    </v-col>
</v-row>
</template>
<script>
import axios from 'axios'
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
  export default {
    data: () => ({
      valid: false,
      email: '',
      password: '',
      error:'',
      isLoding:false,
      size:'50px',
      loadingColor:'#e2070e',
      show: false,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
        },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]
    }),
    components:{
      MoonLoader
    },
    methods: {
      performLogin(){
        this.isLoding = true,
        this.$store.dispatch('performLoginAction',{
          email:this.email,
          password:this.password
        }).then( res => {
          this.isLoding = false
          this.$router.push('/profile')
        }).catch( err => {
            console.log(err.message)
            this.error = "There was error during login process"
            this.isLoding = false
        })
      }
    },
  }
</script>