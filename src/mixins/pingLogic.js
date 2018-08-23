const Monitor = require('ping-monitor')

export default {
  methods: {
    createMonitor() {
      this.monitor = new Monitor({
        website: this.remote.uri,
        interval: this.remote.interval / 60
      })
    
      this.monitor.on('up', (res) => {
        this.currentStatus = 'online'
        const notification = notification || new Notification(`${this.remote.alias} is up!`, {
          body: '\n \n This site is alive.'
        })
      })
  
      this.monitor.on('error', err => {
        console.warn(`${this.remote.alias} is down!`)
        this.currentStatus = 'offline'
      })
    },
    destroyMonitor() {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = {}
      }
    }
  },
  created() {
    if (this.remote.monitoring) {
      this.createMonitor()
    }
  },
  destroyed() {
    this.destroyMonitor()
  }
}
