<template>
<div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if="loggedIn"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">
        App
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
            <div v-if="loggedIn" >
              <v-btn 
              outlined
              @click="performLogout()"
              >
                  <!-- Logout -->
                  <v-icon>mdi-logout</v-icon>
              </v-btn>
            </div>
            <div v-else >
              <v-btn 
              link
              to="/login" 
              outlined>
                  <!-- Login -->
                  <v-icon>mdi-login</v-icon>
              </v-btn>
              
            <v-btn class="ml-4" 
            link
            to="/register"
            outlined>
                <!-- Register  -->
              <v-icon>mdi-account-plus-outline</v-icon>
            </v-btn>
          </div>
    </v-app-bar>
    </div>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: false,
      items: [
        { icon: 'mdi-desktop-mac-dashboard', text: 'Dashboard', to:"/"},
      ],
    }),
    computed:{
      loggedIn(){
        return this.$store.getters.get_loggedIn;
      }
    },
    methods:{
      performLogout(){
        this.$store.dispatch('performLogoutAction')
        .then(res=>{
        this.$router.push('/login')
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>