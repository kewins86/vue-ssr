import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from './Home.js'
import AboutRouter from './About.js'
import BlogRouter from './Blog.js'
import Notfound from './notfound.js'

Vue.use(Router)

export function createRouter() {   
    return new Router({
        mode: 'history',
        routes: [
            ...HomeRouter,
            ...AboutRouter,
            ...BlogRouter,
            // ...Notfound,
        ]
    })
}