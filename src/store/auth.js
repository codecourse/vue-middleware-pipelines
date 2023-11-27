export default {
  namespaced: true,

  state: {
    authenticated: true,
    user: {
      subscribed: true
    }
  },

  getters: {
    authenticated (state) {
      return state.authenticated
    },

    user (state) {
      return state.user
    }
  }
}