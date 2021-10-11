import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import data from './data'

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      data
    },

    strict: process.env.DEBUGGING
  })

  return Store
})
