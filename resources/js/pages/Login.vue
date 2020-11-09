<template>
<v-row justify="center" align="center">
    <v-col cols="8">
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
        LOGIN
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
  export default {
    data: () => ({
      valid: false,
      email: '',
      password: '',
      error:'',
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

    methods: {
      performLogin(){
        axios.post('http://127.0.0.1:8000/api/auth/login',{
          email:this.email,
          password:this.password
        }).then(
          res =>{
            console.log(res.data)
            // store the user and token in localstorage
            localStorage.setItem('token', res.data.access_token);
            localStorage.setItem('user', res.data.user);
        this.$router.push('/profile')
          }
        ).catch( err => {
            console.log(err.message)
            this.error = err.message
        })
        console.log("perform login")
      }
    },
  }
</script>