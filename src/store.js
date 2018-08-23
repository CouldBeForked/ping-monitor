const Datastore = require('nedb')
const path = require('path')

const db = {}
const filePaths = {
  dbPath: path.join(nw.App.dataPath, 'remotes.db')
}

db.remotes = new Datastore({
  filename: filePaths.dbPath,
  autoload: true,
  onload: err => {
    if (err) {
      console.error('error', err)
    }

    db.remotes.find({}, (err, result) => {
      storeDefinition.state.remotesList = result
    })
  },
  timestampData: true
})

export const storeDefinition = {
  state: {
    remotesList: [{ 
      _id: 0,
      alias: 'my alias 1',
      uri: 'http://localhost:9090/health',
      interval: 5
    }]
  },
  getters: {
    allRemotes: state => {
      return state.remotesList
    },
    remote: (state, getters) => id => 
      state.remotesList.find(({_id}) => _id == id)
  },
  actions: {},
  mutations: {
    saveRemote: (state, remote) => {
      let index = state.remotesList.findIndex(({_id}) => _id === remote._id)
      
      remote.uri = !remote.uri.startsWith('http://') ? 
        `http://${remote.uri}` : remote.uri;

      if (index >= 0) {
        state.remotesList[index] = remote
      } else {
        remote._id = Date.now()
        state.remotesList.unshift(remote)
      }
    },
    deleteRemote: (state, id) => {
      let index = state.remotesList.findIndex(({_id}) => _id === id)
      state.remotesList.splice(index, 1)
    }
  }
}