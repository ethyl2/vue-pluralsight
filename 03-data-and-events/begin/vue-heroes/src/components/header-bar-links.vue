<template>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a :href="hisGithub" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github fa-2x" aria-hidden="true"></i>
          </a>
          <a :href="hisTwitter" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter fa-2x" aria-hidden="true"></i>
          </a>

          <a :href="myGithub" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-github-square fa-2x" aria-hidden="true"></i>
          </a>
          <a :href="myTwitter" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter-square fa-2x" aria-hidden="true"></i>
          </a>
          <a :href="myLinkedIn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin fa-2x" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderBarLinks',
  data() {
    return {
      hisGithub: 'https://github.com/johnpapa/vue-getting-started',
      myGithub: 'https://github.com/ethyl2',
      hisTwitter: 'https://twitter.com/john_papa',
      myTwitter: 'https://twitter.com/ethyl22000',
      myLinkedIn: 'https://www.linkedin.com/in/heather-nuffer/',
    };
  },
};
</script>
