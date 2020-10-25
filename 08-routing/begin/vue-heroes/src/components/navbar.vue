<template>
  <nav class="column is-narrow menu">
    <p class="menu-label">Menu</p>
    <ul class="menu-list">
      <router-link to="/heroes">Heroes</router-link>
      <router-link to="/villains">Villains</router-link>
      <router-link to="/about">About</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

