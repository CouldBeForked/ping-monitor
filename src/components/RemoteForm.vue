<template>
  <div>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <form @keyup.enter="save" v-if="!loading">
      <v-card class="elevation-0 pa-2">
        <v-card-title>Remote</v-card-title>
        
        <v-card-text>
          <v-text-field prepend-icon="visibility" label="Alias" suffix=" " v-model="remote.alias" autofocus></v-text-field>
          <v-text-field prepend-icon="cloud" prefix="http://" suffix=" " :value="remote.uri | hideProtocol" @input="value => { remote.uri = value }"></v-text-field>
          <v-text-field prepend-icon="timer" label="Interval" suffix="s" v-model="remote.interval"></v-text-field>
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
    let id = this.$route.params.id
    
    if (id) {
      this.remote = { ...this.$store.getters.remote(id) }
    }
  },
  methods: {
    cancel() {
      this.$router.push({ path: '/' })
    },
    save() {
      this.$store.commit('saveRemote', this.remote)
      this.$router.push({ path: '/' })
    }
  },
  filters: {
    hideProtocol(value = '') {
      return value.replace('http://', '')
    }
  }
}
</script>
