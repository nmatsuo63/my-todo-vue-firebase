import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    todos: []
  },
  mutations: {
    setLoginUser (state, user) {
      state.login_user = user
    },
    deleteLoginUser (state) {
      state.login_user = null
    },
    toggleSideMenu (state) {
      state.drawer = !state.drawer
    },
    addTodo (state, { id, todo }) {
      todo.id = id
      state.todos.push(todo)
    },
    updateTodo (state, { id, todo }) {
      const index = state.todos.findIndex(todo => todo.id === id)

      state.todos[index] = todo
    },
    deleteTodo (state, { id }) {
      const index = state.todos.findIndex(todo => todo.id === id)

      state.todos.splice(index, 1)
    }
  },
  actions: {
    setLoginUser ({ commit }, user) {
      commit('setLoginUser', user)
    },
    fetchTodos ({ getters, commit }) {
      firebase.firestore().collection(`users/${getters.uid}/todos`).get().then(snapshot => {
        snapshot.forEach(doc => commit('addTodo', { id: doc.id, todo:  doc.data() }))
      })
    },
    login () {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    logout () {
      firebase.auth().signOut()
    },
    deleteLoginUser ({ commit }) {
      commit('deleteLoginUser')
    },
    toggleSideMenu ({ commit }) {
      commit('toggleSideMenu')
    },
    addTodo ({ getters, commit }, todo) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/todos`).add(todo).then(doc => {
          commit('addTodo', { id: doc.id, todo })
        })
      }
    },
    updateTodo ({ getters, commit }, { id, todo }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/todos`).doc(id).update(todo).then(() => {
          commit('updateTodo', { id, todo })
        })
      }
    },
    deleteTodo ({ getters, commit }, { id }) {
      if (getters.uid) {
        firebase.firestore().collection(`users/${getters.uid}/todos`).doc(id).delete().then(() => {
          commit('deleteTodo', { id })
        })
      }
    }
  },
  getters: {
    userName: state => state.login_user ? state.login_user.displayName : '',
    photoURL: state => state.login_user ? state.login_user.photoURL : '',
    uid: state => state.login_user ? state.login_user.uid : null,
    getTodoById: state => id => state.todos.find(todo => todo.id === id)
  }
})
