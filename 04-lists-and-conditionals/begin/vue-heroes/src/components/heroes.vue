<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Heroes</h2>
    </div>
    <div class="columns">
      <div class="column is-3">
        <header class="card-header">
          <p class="card-header-title">heroes list</p>
        </header>
        <ul class="list is-hoverable">
          <li v-for="hero in heroes" :key="hero.id">
            <a
              href="#"
              class="list-item"
              @click="selectedHero = hero"
              :class="{ 'is-active': selectedHero === hero }"
            >
              <span>{{ hero.firstName }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="columns" v-if="selectedHero">
      <div class="column is-3">
        <header class="card-header">
          <p class="card-header-title">{{ selectedHero.firstName }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" id="id" readonly>
                {{ selectedHero.id }}
              </label>
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
              <div class="control">
                <label for="show" class="checkbox">
                  <input
                    type="checkbox"
                    class="is-primary"
                    id="show"
                    v-model="showMore"
                  />
                  Show More</label
                >
              </div>
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="lastName">last name</label>
              <input
                class="input"
                id="lastName"
                v-model="selectedHero.lastName"
              />
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="description">description</label>
              <input
                class="input"
                id="description"
                v-model="selectedHero.description"
              />
            </div>
            <div class="field" v-show="showMore">
              <label class="label" for="spiritAnimal">spirit animal</label>
              <input
                class="input"
                id="spiritAnimal"
                v-model="selectedHero.spiritAnimal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Heroes',
  data() {
    return {
      selectedHero: undefined,
      showMore: false,
      heroes: [
        {
          id: 10,
          firstName: 'Rose',
          lastName: 'N',
          description: 'fashionista',
          spiritAnimal: 'axelotl',
        },
        {
          id: 20,
          firstName: 'Thomas',
          lastName: 'N',
          description: 'the cat whisperer',
          spiritAnimal: 'squirrel',
        },
        {
          id: 30,
          firstName: 'Heather',
          lastName: 'N',
          description: 'pen wielder',
          spiritAnimal: 'beaver',
        },
        {
          id: 40,
          firstName: 'Paul',
          lastName: 'N',
          description: 'arc trooper',
          spiritAnimal: 'panther',
        },
      ],
    };
  },
};
</script>
