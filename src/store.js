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
    remotesList: []
  },
  getters: {
    allRemotes: state => {
      return state.remotesList
    },
    remote: (state, getters) => id => 
      state.remotesList.find(({_id}) => _id === id)
  },
  actions: {
    storeRemote({commit}, remote) {
      return new Promise((resolve, reject) => {
        let callback = (err, newRemote, updatedRemote) => {
          if (err) {
            console.error(err)
            reject(err)
          }

          const remoteToBeSaved = updatedRemote ? updatedRemote : newRemote
          commit('saveRemote', remoteToBeSaved)

          resolve()
        }

        if (remote._id) {
          db.remotes.update(
            {_id: remote._id}, 
            remote, 
            {returnUpdatedDocs: true}, 
            callback
          )
        } else {
          db.remotes.insert(remote, callback)
        }
      })
    },
    removeRemote({commit}, _id) {
      return new Promise((resolve, reject) => {
        db.remotes.remove({_id: _id}, {}, err => {
          if (err) {
            console.error(err)
            reject(err)
          }
          commit('deleteRemote', _id)
          resolve()
        })
      })
    }
  },
  mutations: {
    saveRemote: (state, remote) => {
      let index = state.remotesList.findIndex(({_id}) => _id === remote._id)
      
      remote.uri = !remote.uri.startsWith('http://') ? 
        `http://${remote.uri}` : remote.uri;

      if (index >= 0) {
        state.remotesList.splice(index, 1, remote)
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