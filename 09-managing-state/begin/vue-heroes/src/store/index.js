import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import {
  GET_HEROES,
  ADD_HERO,
  DELETE_HERO,
  UPDATE_HERO,
} from './mutation-types';

Vue.use(Vuex);

const state = {
  heroes: [],
  villains: [],
  user: {},
};
const mutations = {
  [GET_HEROES](state, heroes) {
    // console.log(heroes);
    state.heroes = heroes;
  },
  [ADD_HERO](state, newHero) {
    //state.heroes.push(newHero);
    state.heroes = [...state.heroes, newHero];
  },
  [DELETE_HERO](state, heroToDeleteId) {
    state.heroes = [...state.heroes.filter(hero => hero.id !== heroToDeleteId)];
  },
  [UPDATE_HERO](state, heroToUpdate) {
    const heroIndex = state.heroes.findIndex(
      hero => hero.id === heroToUpdate.id,
    );
    state.heroes.splice(heroIndex, 1, heroToUpdate);
  },
};
const actions = {
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    // console.log(heroes);
    commit(GET_HEROES, heroes);
  },
  async addHeroAction({ commit }, newHero) {
    const addedHero = await dataService.addHero(newHero);
    commit(ADD_HERO, addedHero);
  },
  async deleteHeroAction({ commit }, heroToDelete) {
    const deletedHeroId = await dataService.deleteHero(heroToDelete);
    commit(DELETE_HERO, deletedHeroId);
  },
  async updateHeroAction({ commit }, heroToUpdate) {
    const updatedHero = await dataService.updateHero(heroToUpdate);
    commit(UPDATE_HERO, updatedHero);
  },
};
const getters = {
  getHeroById: state => id => state.heroes.find(hero => hero.id === id),
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
