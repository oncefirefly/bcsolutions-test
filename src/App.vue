<template>
  <header class="header">
    <div class="header__content content">
      <nav>
        <router-link to="/bssolutions-test/converter">Converter</router-link>
        <router-link to="/bcsolutions-test/portfolio">Portfolio</router-link>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss">
@import './assets/style';
</style>

<script>
export default {
  name: 'App',
};
</script>
