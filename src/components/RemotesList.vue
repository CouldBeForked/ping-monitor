<template>
  <v-list two-line>
    <v-subheader>Remotes List</v-subheader>
    <hb-remote :remote="remoteItem" v-for="remoteItem in list" :key="remoteItem._id"></hb-remote>
  </v-list>
</template>

<script>
import HbRemote from './Remote.vue';

export default {
  components: {
    HbRemote
  },
  data() {
    return {
      list: [
        { 
          _id: 0,
          alias: 'my alias 1',
          uri: 'http://localhost:9090'
        },
        { 
          _id: 1,
          alias: 'my alias 2',
          uri: 'http://localhost:9091'
        },
        { 
          _id: 2,
          alias: 'my alias 3',
          uri: 'http://localhost:9092'
        }
      ]
    }
  }
}
</script>
