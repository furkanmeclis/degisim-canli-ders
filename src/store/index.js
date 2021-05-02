import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: {
    lessons:null,
  },
  mutations: {
  },
  actions: {
    getLessons(){
      axios.get("https://perpetual-road-aftershave.glitch.me/dersler.json").then(res => this.state.lessons = res.data)

    }
  },
  modules: {
  }
})
