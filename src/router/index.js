import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Profile from '../views/Profile.vue'
import Shows from '../views/Shows.vue'
import Discover from '../views/discover.vue'
import Movies from '../views/movies.vue'
import People from '../views/people.vue'
import TV from '../views/tv.vue'
import Movie from '../views/movie.vue'
import Person from '../views/person.vue'
import notFound from '../views/404.vue'
import about from '../views/about.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/discover',
        name: 'Discover',
        component: Discover
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: Movie
    },
    {
        path: '/person/:id',
        name: 'Person',
        component: Person
    },
    {
        path: '/tv',
        name: 'Shows',
        component: Shows

    },
    {
        path: '/movie',
        name: 'Movies',
        component: Movies,
        // props: { id: false, media_type: false }
        // props: { info: info }
    },
    {
        path: '/Person',
        name: 'People',
        component: People
    }, ///
    {
        path: '/tv/:id',
        name: 'TV',
        component: TV
    }, {
        path: '/about',
        name: 'about',
        component: about
    }, {
        path: "*",
        name: 'notFound',
        component: notFound
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router