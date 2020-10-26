<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ hero.fullName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ hero.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="firstName">first name</label>
              <input class="input" name="firstName" v-model="hero.firstName" />
            </div>
            <div class="field">
              <label class="label" for="lastName">last name</label>
              <input class="input" name="lastName" v-model="hero.lastName" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input
                class="input"
                name="description"
                v-model="hero.description"
              />
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
          <button class="link card-footer-item" @click="askToDelete()">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
          </button>
        </footer>
      </div>
    </div>
    <Modal
      :message="modalMessage"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deleteHero"
    >
    </Modal>
  </div>
</template>

<script>
// import { dataService } from '../shared';
import { mapGetters, mapActions } from 'vuex';
import { cloneDeep } from 'lodash';
import Modal from '@/components/modal';

export default {
  name: 'HeroDetail',
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      hero: {},
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  created() {
    if (this.isAddMode) {
      this.hero = {
        id: undefined,
        firstName: '',
        lastName: '',
        description: '',
      };
    } else {
      // this.hero = await dataService.getHero(this.id);
      // this.hero = { ...this.getHeroById(this.id) }; // makes a shallow copy. Wouldn't be enough if state is nested.
      this.hero = cloneDeep(this.getHeroById(this.id));
    }
  },
  computed: {
    ...mapGetters(['getHeroById']),
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? 'Add' : 'Edit'} Hero`;
    },
    modalMessage() {
      //return 'Are you sure you want to delete this hero?';
      return this.showModal
        ? `Would you like to delete ${this.hero.fullName} ?`
        : '';
    },
  },
  methods: {
    ...mapActions(['updateHeroAction', 'addHeroAction', 'deleteHeroAction']),
    askToDelete() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    cancelHero() {
      this.$router.push({ name: 'heroes' });
    },
    async saveHero() {
      // this.hero.id
      //   ? await dataService.updateHero(this.hero)
      //   : await dataService.addHero(this.hero);
      this.hero.id
        ? await this.updateHeroAction(this.hero)
        : await this.addHeroAction(this.hero);
      this.$router.push({ name: 'heroes' });
    },
    async deleteHero() {
      this.closeModal();
      await this.deleteHeroAction(this.hero);
      this.$router.push({ name: 'heroes' });
    },
  },
};
</script>
