import { createStore } from 'vuex'
import modules from './modules/index'
import getters from './getters'

const store = createStore({
  modules: {
    getters,
    ...modules,
  },
  getters
})

export default store