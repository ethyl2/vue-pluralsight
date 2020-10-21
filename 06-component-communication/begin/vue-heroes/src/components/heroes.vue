<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
      <div class="columns">
        <div class="column is-8" v-if="heroes">
          <hero-detail
            v-if="selectedHero"
            :hero="selectedHero"
            titleMessage="is my hero!"
            @save="saveHero"
            @cancel="cancelHero"
          />

          <!-- <heroes-list> -->
          <ul v-if="!selectedHero">
            <li v-for="hero in heroes" :key="hero.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="hero.name" class="name">
                      {{ getFullName(hero) }}
                    </div>
                    <div class="description">{{ hero.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="selectHero(hero)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- <heroes-list> -->

          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeroDetail from '@/components/hero-detail';

import { ourHeroes, lifecycleHooks, heroWatchers, logger } from '../shared';

export default {
  name: 'Heroes',
  components: {
    HeroDetail,
  },
  mixins: [lifecycleHooks, heroWatchers],
  data() {
    return {
      heroes: [],
      selectedHero: undefined,
      message: '',
      capeMessage: '',
    };
  },
  created() {
    this.loadHeroes();
    logger.info(`${this.componentName} created hook called`);
  },
  computed: {
    fullName() {
      return this.selectedHero
        ? `${this.selectedHero.firstName} ${this.selectedHero.lastName}`
        : '';
    },
    getFullName() {
      return (hero) => `${hero.firstName} ${hero.lastName}`;
    },
  },
  methods: {
    async getHeroes() {
      return new Promise((resolve) => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'getting the heroes, please be patient';
      this.heroes = await this.getHeroes();
      this.message = '';
    },
    cancelHero() {
      this.selectedHero = undefined;
    },
    saveHero(heroCopy) {
      const index = this.heroes.findIndex((h) => h.id === this.selectedHero.id);
      this.heroes.splice(index, 1, heroCopy);
      this.heroes = [...this.heroes];
      this.selectedHero = undefined;
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
};
</script>
