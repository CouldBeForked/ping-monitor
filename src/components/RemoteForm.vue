<template>
  <div>
    <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
    <form v-if="!loading">
      <v-card class="elevation-0 pa-2">
        <v-card-title>Remote</v-card-title>
        
        <v-card-text>
          <v-text-field suffix=" " autofocus prepend-icon="visibility" label="Alias"></v-text-field>
          <v-text-field prefix="http://" suffix=" " autofocus prepend-icon="cloud"></v-text-field>
          <v-text-field suffix="s" autofocus prepend-icon="timer" label="Interval"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="cancel">Cancel</v-btn>
          <v-btn class="secondary">Save</v-btn>
        </v-card-actions>
      </v-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.loading = false
  },
  methods: {
    cancel() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
