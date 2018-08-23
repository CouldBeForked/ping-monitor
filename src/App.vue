<template>
  <v-app dark>
    <v-toolbar style="-webkit-app-region: drag;" dark dense>
      <v-toolbar-title>AliveNotif</v-toolbar-title>

      <v-spacer></v-spacer>
      
      <v-btn style="-webkit-app-region: no-drag;" icon @click="closeWindow()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <main class="scroll-container">
      <v-container class="pa-0" fluid>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </main>

    <v-footer :fixed="true">
      <v-btn icon>
        <v-icon class="grey--text text-darken-3">settings</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn fab top right absolute class="accent" @click="addRemote">
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


