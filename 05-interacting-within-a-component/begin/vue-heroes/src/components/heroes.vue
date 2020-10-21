<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="card" v-show="heroes.length">
          <header class="card-header">
            <p class="card-header-title">heroes list</p>
          </header>
          <ul class="list is-hoverable">
            <li v-for="hero in heroes" :key="hero.id">
              <a
                class="list-item"
                @click="selectHero(hero)"
                :class="{ 'is-active': selectedHero === hero }"
              >
                <span>{{ fullNameGivenHero(hero) }}</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>

      <div class="column is-4" v-if="selectedHero">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ fullName }}</p>
          </header>
          <p>{{ fullNameWithGetterAndSetter }}</p>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label" for="id">id</label>
                <label class="input" id="id" readonly>{{
                  selectedHero.id
                }}</label>
              </div>
              <div class="field">
                <label class="label" for="firstName">first name</label>
                <input
                  class="input"
                  id="firstName"
                  v-model="selectedHero.firstName"
                />
              </div>
              <div class="field">
                <label class="label" for="lastName">last name</label>
                <input
                  class="input"
                  id="lastName"
                  v-model="selectedHero.lastName"
                />
              </div>
              <div class="field">
                <label class="label" for="description">description</label>
                <input
                  class="input"
                  id="description"
                  v-model="selectedHero.description"
                />
              </div>

              <div class="field">
                <label class="label" for="originDate">origin date</label>
                <input
                  class="input"
                  id="originDate"
                  type="date"
                  v-model="selectedHero.originDate"
                />
                <p class="comment">
                  My origin story began on
                  {{ selectedHero.originDate | shortDate }}.
                </p>
              </div>

              <div class="field">
                <label class="label" for="capeCounter">cape counter</label>
                <input
                  class="input"
                  id="capeCounter"
                  type="number"
                  v-model="selectedHero.capeCounter"
                />
              </div>

              <div class="field">
                <label class="label" for="capeMessage">cape message</label>
                <label class="input" name="capeMessage" readonly>{{
                  capeMessage
                }}</label>
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <button
              class="link card-footer-item cancel-button"
              @click="cancelHero()"
            >
              <i class="fas fa-undo"></i>
              <span>Cancel</span>
            </button>
            <button class="link card-footer-item" @click="saveHero()">
              <i class="fas fa-save"></i>
              <span>Save</span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
const inputDateFormat = 'YYYY-MM-DD';
const displayDateFormat = 'MMM DD, YYYY';
const ourHeroes = [
  {
    id: 10,
    firstName: 'Ella',
    lastName: 'Papa',
    capeCounter: 1,
    originDate: format(new Date(1970, 11, 2), inputDateFormat),
    description: 'fashionista',
  },
  {
    id: 20,
    firstName: 'Madelyn',
    lastName: 'Papa',
    capeCounter: 3,
    originDate: format(new Date(1976, 12, 24), inputDateFormat),
    description: 'the cat whisperer',
  },
  {
    id: 30,
    firstName: 'Haley',
    lastName: 'Papa',
    capeCounter: 2,
    originDate: format(new Date(1996, 11, 22), inputDateFormat),
    description: 'pen wielder',
  },
  {
    id: 40,
    firstName: 'Landon',
    lastName: 'Papa',
    capeCounter: 0,
    originDate: format(new Date(2012, 12, 2), inputDateFormat),
    description: 'arc trooper',
  },
];
export default {
  name: 'Heroes',
  data() {
    return {
      selectedHero: undefined,
      message: '',
      capeMessage: '',
      heroes: [],
    };
  },
  methods: {
    async getHeroes() {
      // simulate getting heroes from an API
      return new Promise((resolve) => {
        setTimeout(() => resolve(ourHeroes), 1500);
      });
    },
    async loadHeroes() {
      this.heroes = [];
      this.message = 'Getting the heroes...';
      this.heroes = await this.getHeroes();
      this.message = 'Here are the heroes!';
    },
    handleTheCapes(newValue) {
      const value = parseInt(newValue, 10);
      switch (value) {
        case 0:
          this.capeMessage = 'Where is my cape?';
          break;
        case 1:
          this.capeMessage = 'One is all I need';
          break;
        case 2:
          this.capeMessage = 'Always have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
    cancelHero() {
      this.selectedHero = undefined;
      this.message = '';
    },
    saveHero() {
      // This only updates when you click the save button
      this.message = JSON.stringify(this.selectedHero, null, '\n ');
    },
    selectHero(hero) {
      this.selectedHero = hero;
    },
  },
  computed: {
    fullName() {
      return `${this.selectedHero.firstName} ${this.selectedHero.lastName}`;
    },
    fullNameGivenHero() {
      return (hero) => `${hero.firstName} ${hero.lastName}`;
    },
    fullNameWithGetterAndSetter: {
      get() {
        let name = this.selectedHero.firstName;
        name += this.selectedHero.lastName
          ? ` ${this.selectedHero.lastName}`
          : '';
        return name;
      },
      set(newFullName) {
        let names = newFullName.split(' ');
        this.selectedHero.firstName = names[0];
        this.selectedHero.lastName =
          names.length === 1 ? '' : names[names.length - 1];
      },
    },
  },
  created() {
    this.loadHeroes();
  },
  watch: {
    'selectedHero.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(`Watcher evaluated. old=${oldValue}, new=${newValue}`);
        this.handleTheCapes(newValue);
      },
    },
  },
  filters: {
    shortDate: function (value) {
      return format(value, displayDateFormat);
    },
  },
};
</script>
