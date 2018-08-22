<template>
  <v-list-tile avatar>
    
    <v-list-tile-avatar>
      <v-icon class="white--text">report_problem</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{remote.alias}}</v-list-tile-title>
      <v-list-tile-sub-title>{{remote.uri}}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <v-layout>
        <v-switch></v-switch>
        <v-menu>
        <v-btn slot="activator" class="m1-2" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>Remove</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      </v-layout>
    </v-list-tile-action>
  
  </v-list-tile>
</template>

<script>    
export default {
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
  }
}
</script>
