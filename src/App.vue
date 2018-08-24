<template>
  <v-app dark>
    <v-toolbar style="-webkit-app-region: drag;" dark dense fixed>
      <v-toolbar-title>Ping Monitor</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn style="-webkit-app-region: no-drag;" icon @click="minimizeWindow()">
        <v-icon>minimize</v-icon>
      </v-btn>
      
      <v-btn style="-webkit-app-region: no-drag;" icon @click="closeWindow()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <main class="scroll-container">
      <v-container class="pa-0 mt-5 mb-4" fluid>
        <v-slide-y-transition mode="out-in">
          <keep-alive include="theList">
            <router-view></router-view>
          </keep-alive>
        </v-slide-y-transition>
      </v-container>
    </main>

    <v-footer :fixed="true">
      <v-btn fab top left absolute class="blue-grey darken-3" @click="addRemote">
        <v-icon>add</v-icon>
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import HbRemotesList from './components/RemotesList.vue'

export default {
  components: {
    HbRemotesList
  },
  data () {
    return {

    }
  },
  methods: {
    addRemote() {
      this.$router.push({ path: '/remote' })
    },
    closeWindow() {
      let win = nw.Window.get()
      win.close()
    },
    minimizeWindow() {
      let win = nw.Window.get()
      win.minimize()
    }
  }
}
</script>

<style lang="stylus">
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>


