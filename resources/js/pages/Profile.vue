<template>
  <v-card
    class="mx-auto"
    outlined
  >
  <v-breadcrumbs
  customDivider
  divider="\"
></v-breadcrumbs>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          Personal info
        </div>
        <v-list-item-title class="headline mb-1">
         {{ user.name }}
        </v-list-item-title>
        <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
            <v-btn
              fab
              color="cyan accent-2"
              bottom
              right=""
              absolute
              @click="dialog = !dialog"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <v-card>
            <v-card-text>
              <v-text-field label="Name" v-model="user.name" ></v-text-field>
              <v-text-field label="Email" v-model="user.email" ></v-text-field>
              <small class="grey--text">* This updating you're Personal info.</small>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text
                color="primary"
                @click="(UpdateUserProfile()) & (dialog = false)"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    data(){
      return{
        dialog: false,
      }
    },
    computed:{
        user(){
            return this.$store.getters.get_user;
        }
    },
    methods:{
      UpdateUserProfile(){
        this.isLoding = true,
        this.$store.dispatch('UpdateUserProfile',{
          name:this.user.name,
          email:this.user.email,
        }).then( res => {
          this.isLoding = false
          console.log('the profile was updated')
        }).catch( err => {
            console.log(err.message)
            this.isLoding = false
        })
      }
    }
  }
</script>