<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <div class="site-menu mb-2"></div>
    <header-menu />
    <horizontal-menu />
  </div>
</template>

<script>
import HorizontalMenu from './components/HorizontalMenu.vue';
import HeaderMenu from './components/Header.vue';

export default {
  name: 'App',
  components: { HeaderMenu, HorizontalMenu },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.site-menu {
  height: 40px;
  background-color: #9e1c64;
}
</style>
