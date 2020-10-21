<template>
  <div>
    <h3 style="margin-bottom: 2rem">
      {{ heroCopy.firstName }} {{ titleMessage }}
    </h3>

    <div>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ heroCopy.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input
                class="input"
                name="firstName"
                v-model="heroCopy.firstName"
              />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input
                class="input"
                name="lastName"
                v-model="heroCopy.lastName"
              />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input
                class="input"
                name="description"
                v-model="heroCopy.description"
              />
            </div>
            <div class="field">
              <label class="label" for="originDate">origin date</label>
              <input
                type="date"
                class="input"
                id="originDate"
                v-model="heroCopy.originDate"
              />
              <p class="comment">
                My origin story began on
                {{ heroCopy.originDate | shortDate }}
              </p>
            </div>
            <div class="field">
              <label class="label" for="capeCounter">cape counter</label>
              <input
                class="input"
                name="capeCounter"
                type="number"
                v-model="heroCopy.capeCounter"
              />
            </div>
            <div class="field">
              <label class="label" for="capeMessage">cape message</label>
              <label class="input" name="capeMessage">{{ capeMessage }}</label>
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
          <button class="link card-footer-item" @click="backToOriginal()">
            <i class="fas fa-arrow-left"></i>
            <span>Back to Original</span>
          </button>
          <button class="link card-footer-item" @click="handleSaveHero()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { displayDateFormat, lifecycleHooks } from '../shared';
export default {
  name: 'HeroDetail',
  props: {
    hero: {
      type: Object,
      default: () => {},
    },
    titleMessage: {
      type: String,
      validator: function (value) {
        const possibleMessages = [
          'is my hero!',
          'is amazing!',
          'changes the world for good',
        ];
        return possibleMessages.indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      capeMessage: '',
      heroCopy: { ...this.hero },
    };
  },
  mixins: [lifecycleHooks],
  computed: {
    fullName() {
      return this.heroCopy
        ? `${this.heroCopy.firstName} ${this.heroCopy.lastName}`
        : '';
    },
  },
  filters: {
    shortDate: function (value) {
      return format(value, displayDateFormat);
    },
  },
  methods: {
    backToOriginal() {
      this.heroCopy = { ...this.hero };
    },
    cancelHero() {
      this.$emit('cancel');
    },
    handleSaveHero() {
      this.$emit('save', this.heroCopy);
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
          this.capeMessage = 'Alway have a spare';
          break;
        default:
          this.capeMessage = 'You can never have enough capes';
          break;
      }
    },
  },
  watch: {
    'heroCopy.capeCounter': {
      immediate: true,
      handler(newValue, oldValue) {
        console.log(
          `CapeCounter watcher evalauted. old=${oldValue}, new=${newValue}`,
        );
        this.handleTheCapes(newValue);
      },
    },
  },
};
</script>
