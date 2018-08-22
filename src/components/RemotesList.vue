<template>
  <v-list two-line>
    <v-subheader>Remotes List</v-subheader>
    <hb-remote></hb-remote>
  </v-list>
</template>

<script>
import HbRemote from './Remote.vue';

export default {
  components: {
    HbRemote
  }
}
</script>
