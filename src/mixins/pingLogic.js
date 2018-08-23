const Monitor = require('ping-monitor')

export default {
  methods: {
    createMonitor() {
      this.monitor = new Monitor({
        website: this.remote.uri,
        interval: this.remote.interval / 60
      })
      
      const audio = {
        up: new Audio('public/audio/success.wav'),
        error: new Audio('public/audio/failed.wav')
      }

      let notifications = {
        up: null,
        down: null
      }

      this.monitor.on('up', (res) => {
        this.currentStatus = 'online'

        if (!notifications.up) {
          notifications.up = new Notification(`${this.remote.alias} is up!`, {
            body: '\n \n This site is alive.'
          })

          notifications.up.onshow = () => {
            audio.up.play()
          }
        }
      })

      this.monitor.on('down', res => {
        console.warn(`${this.remote.alias} is not responding!`, res)
      })
  
      this.monitor.on('error', err => {
        this.currentStatus = 'offline'

        console.warn(`${this.remote.alias} is down!`)
        if (!notifications.down) { 
          notifications.down = new Notification(`${this.remote.alias} is down!`, {
            body: '\n \n This site is not alive.'
          })

          notifications.down.onshow = () => {
            audio.error.play()
          }
        }
      })
    },
    destroyMonitor() {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = null
        this.currentStatus = '-'
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
  },
  watch: {
    remote(newValue, oldValue) {
      if (newValue.uri !== oldValue.uri || newValue.interval !== oldValue.interval) {
        this.destroyMonitor()
    
        if (this.remote.monitoring) {
          this.createMonitor()
        }
      }
    }
  }
}
