<template>
  <v-app dark>
    <v-toolbar dark dense>
      <v-toolbar-title>Alivenotif</v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>

    <main>
      <v-container class="pa-0" fluid>
        <hb-remotes-list></hb-remotes-list>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import HbRemotesList from './components/RemotesList.vue';

export default {
  components: {
    HbRemotesList
  },
  data () {
    return {

    }
  }
}
</script>
