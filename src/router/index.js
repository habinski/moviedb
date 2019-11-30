import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Profile from '../views/Profile.vue'
import Shows from '../views/Shows.vue'
import Movies from '../views/movies.vue'
import People from '../views/people.vue'
import TV from '../views/tv.vue'
import Movie from '../views/movie.vue'
import Person from '../views/person.vue'
import notFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    }, {
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

    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: Movie
    },
    {
        path: '/Person/:id',
        name: 'Person',
        component: Person


    },
    {
        path: "*",
        name: 'notFound',
        component: notFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

/*todo

Создать страницу для movie/:id с компонентом ProfileMovie и так далее

создать корневую странцицу для каждого типа

сделать проверку правильности ID



*/