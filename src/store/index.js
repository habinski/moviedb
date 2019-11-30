import Vue from 'vue';
import Vuex from 'vuex';
import trends from './modules/trends';
import fullInfo from './modules/fullInfo';
import search from './modules/search';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        fullInfo,
        trends,
        search
    }
});