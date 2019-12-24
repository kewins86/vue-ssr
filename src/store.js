// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      blogList: [],
      news: {}
    },
    actions: {
      getList ({ commit }) {
        return axios.get('http://localhost:8080/api/getList').then((res) => {
            commit('setList', res.data.list)
        })
      },
      getNews ({ commit }) {
        return axios.get('http://localhost:8080/api/getNews1').then((res) => {
            commit('setNews', res.data.data)
        })
      }
    },
    mutations: {
      setList (state, list) {
        state.blogList = list
      },
      setNews (state, data) {
        state.news = data
      }
    }
  })
}