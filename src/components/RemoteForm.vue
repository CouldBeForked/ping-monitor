<template>
  <div>
    <v-progress-linear color="blue-grey darken-1" v-if="loading" :indeterminate="true"></v-progress-linear>
    <form @keyup.enter="save" v-if="!loading">
      <v-card class="elevation-0 pa-2">
        <v-card-text>
          <v-text-field color="blue-grey lighten-2" prepend-icon="visibility" label="Name" suffix=" " v-model="remote.alias" autofocus></v-text-field>
          <v-text-field color="blue-grey lighten-2" prepend-icon="cloud" label="http://" :value="remote.uri | hideProtocol" @input="value => { remote.uri = value }"></v-text-field>
          <v-text-field color="blue-grey lighten-2" prepend-icon="timer" label="Interval" suffix="s" v-model="remote.interval"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue-grey darken-2" @click="cancel">Cancel</v-btn>
          <v-btn class="blue-grey darken-2" @click="save">Save</v-btn>
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
      const remote = {
        _id: this.remote._id,
        alias: this.remote.alias,
        uri: this.remote.uri,
        interval: this.remote.interval,
        monitoring: this.remote.monitoring
      }

      this.loading = true
      this.$store.dispatch('storeRemote', remote).then(
        () => {
          this.loading = false
          this.$router.push('/')
        },
        err => {
          console.error(err)
        }
      )
    }
  },
  filters: {
    hideProtocol(value = '') {
      return value.replace('http://', '')
    }
  },
  name: 'theForm'
}
</script>
