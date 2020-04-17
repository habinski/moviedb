import Vue from 'vue';
import Vuex from 'vuex';
import trends from './modules/trends';
import fullInfo from './modules/fullInfo';
import search from './modules/search';
import Countries from './modules/countries';
import externalIds from './modules/externalIds';
import fetchInfo from './modules/fetchInfo';
import fetchGenre from './modules/genre';
import discover from './modules/discover';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        fullInfo,
        trends,
        search,
        Countries,
        externalIds,
        fetchInfo,
        fetchGenre,
        discover
    }
});