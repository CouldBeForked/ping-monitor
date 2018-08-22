<template>
  <div>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <form @keyup.enter="save" v-if="!loading">
      <v-card class="elevation-0 pa-2">
        <v-card-title>Remote</v-card-title>
        
        <v-card-text>
          <v-text-field v-model="remote.alias" suffix=" " autofocus prepend-icon="visibility" label="Alias"></v-text-field>
          <v-text-field v-model="remote.uri" prefix="http://" suffix=" " prepend-icon="cloud"></v-text-field>
          <v-text-field v-model="remote.interval" suffix="s" prepend-icon="timer" label="Interval"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancel">Cancel</v-btn>
          <v-btn class="secondary" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      remote: {
        alias: '',
        uri: '',
        interval: 15
      }
    }
  },
  created() {
    this.loading = false
  },
  methods: {
    cancel() {
      this.$router.push({ path: '/' })
    },
    save() {
      this.$store.commit('saveRemote', this.remote)
      this.$router.push({ path: '/' })
    }
  }
}
</script>
