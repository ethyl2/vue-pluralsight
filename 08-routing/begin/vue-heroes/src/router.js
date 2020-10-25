import Vue from 'vue';
import Router from 'vue-router';

// import Heroes from './views/heroes.vue';
// import HeroDetail from './views/hero-detail.vue';
// import About from './views/about.vue';
import Villains from './views/villains';
import PageNotFound from './views/page-not-found';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/heroes',
      name: 'heroesHome',
      // component: Heroes,
      component: () =>
        import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
    },
    {
      path: '/heroes',
      name: 'heroes',
      //component: Heroes,
      component: () =>
        import(/* webpackChunkName: "bundle-heroes" */ './views/heroes.vue'),
    },
    {
      path: '/heroes/:id',
      name: 'hero-detail',
      //component: HeroDetail,
      component: () =>
        import(/* webpackChunkName: "bundle-heroes" */ './views/hero-detail.vue'),
      // props: true // if you didn't need to parse the param
      props: route => ({ id: parseInt(route.params.id) }),
    },
    {
      path: '/villains',
      name: 'villains',
      component: Villains, // example of eager loading
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.

      component: () =>
        import(/* webpackChunkName: "bundle-about" */ './views/about.vue'),
      //component: About,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
