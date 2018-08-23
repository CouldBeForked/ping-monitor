<template>
  <v-list-tile avatar>
    
    <v-list-tile-avatar>
      <transition>
        <v-icon class="white--text" :class="icon.classes">{{icon.name}}</v-icon>
      </transition>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{remote.alias}}</v-list-tile-title>
      <v-list-tile-sub-title>{{remote.uri}}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout>
        <v-switch color="primary" @change="toggleMonitor" v-model="remote.monitoring"></v-switch>
        <v-menu>
        <v-btn slot="activator" class="m1-2" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="edit(remote._id)">
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="removeRemote(remote._id)">
            <v-list-tile-title>Remove</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      </v-layout>
    </v-list-tile-action>
  
  </v-list-tile>
</template>

<script>
import Monitor from '../mixins/pingLogic'

export default {
  mixins: [Monitor],
  props: {
    remote: {
      type: Object,
      default() {
        return {
          _id: '',
          status: '-',
          interval: 0,
          monitoring: true,
          alias: '',
          uri: ''
        }
      }
    }
  },
  methods: {
    removeRemote(id) {
      this.$store.commit('deleteRemote', id)
    },
    edit(id) {
      this.$router.push('remote/' + id)
    },
    toggleMonitor() {
      if (this.remote.monitoring) {
        this.createMonitor()
      } else {
        this.currentStatus = '-'
        this.destroyMonitor()
      }
    }
  },
  computed: {
    icon() {
      let name = ''
      let classes = []

      if (!this.currentStatus || this.currentStatus === '-') {
        name = 'report_problem'
        classes = ['grey', 'lighten-2']
      } else {
        if (this.currentStatus === 'online') {
          name = 'swap_vert'
          classes = ['light-green', 'darken-1']
        } else if (this.currentStatus === 'offline') {
          name = 'not_interested'
          classes = ['red', 'darksen-1']
        }
      }

      return {
        name,
        classes
      }
    }
  },
  data() {
    return {
      currentStatus: this.remote.status
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-enter-leave {
  transition: opacity 0.6s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
