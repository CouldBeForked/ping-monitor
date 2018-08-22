<template>
  <v-list two-line v-if="allRemotes.length > 0">
    <v-subheader>Remotes List</v-subheader>
    <hb-remote :remote="remoteItem" v-for="remoteItem in allRemotes" :key="remoteItem._id"></hb-remote>
  </v-list>
  <v-card v-else>
    <v-card-text>Please add a remote.</v-card-text>
  </v-card>
</template>

<script>
import HbRemote from './Remote.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    HbRemote
  },
  computed: {
    // mix the getter(s) into computed with object spread
    ...mapGetters(['allRemotes'])
  }
}
</script>
