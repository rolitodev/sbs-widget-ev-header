<template>
  <nav>
    <div
      v-if="itemMenu && itemMenu.length > 0"
      class="d-flex sectionOne align-items-center justify-content-center">
      <div class="container-fluid container px-3">
        <div class="row justify-content-center align-items-center">
          <div
            v-for="item in itemMenu"
            :id="'itemMenu-' + item.applicationCode"
            :key="item.applicationCode"
            class="col text-center itemMenu">
            <div
              class="d-flex justify-content-center align-items-center"
              @click="changeTab(item.url)">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav
      v-if="itemSubMenu && itemSubMenu.length > 0"
      class="container-subnav">
      <div class="brand-content-container container px-3">
        <div class="row justify-content-center align-items-center">
          <div
            v-for="subItem in itemSubMenu"
            :id="'itemSubMenu' + subItem.title"
            :key="subItem.applicationCode"
            class="col text-center itemSubMenu">
            <div
              class="d-flex justify-content-center align-items-center"
              @click="changeSubMenu(subItem.url)">
              {{ subItem.title }}
            </div>
          </div>
        </div>
      </div>
    </nav>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
/* eslint-disable no-undef */
/* eslint-disable vue/valid-v-bind */

export default {
  name: 'HorizontalMenu',
  data() {
    return {
      itemMenu: [],
      itemSubMenu: [],
    };
  },
  computed: {
    ...mapState(['availableApplications']),
  },
  watch: {
    availableApplications() {
      this.setApplications();
    },
  },
  methods: {
    setApplications() {
      const itemMenu = this.$store.getters.getAplicationsByLevel(1);
      const itemSubMenu = this.$store.getters.getAplicationsByLevel(2, '706');
      this.itemMenu = [];
      this.itemSubMenu = [];
      this.itemMenu = itemMenu;
      this.itemSubMenu = itemSubMenu;
    },
    changeTab(value) {
      if (value !== '/consultas-produccion') {
        sessionStorage.setItem('previousRoute', value);
        // eslint-disable-next-line no-restricted-globals
        const link = location.origin;
        // eslint-disable-next-line no-restricted-globals, prefer-template
        location.href = link + '/escritorio-virtual';
      }
    },
    changeSubMenu(value) {
      // eslint-disable-next-line no-restricted-globals
      const link = `/escritorio-virtual/consultas-produccion/${value}`;
      // eslint-disable-next-line no-restricted-globals, prefer-template
      location.href = link;
    },
  },
};
</script>

<style lang="scss" scoped>
.sectionOne {
  background-color: #f5f5f5;
  height: 40px;
  .itemMenu {
    color: #9e1c64;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .itemMenu:hover,
  .is-active {
    width: -moz-fit-content;
    width: fit-content;
    margin: 0 auto;
    border-bottom: 2px solid #9e1c64;
    margin-bottom: -2px;
  }
}
.container-subnav {
  background-color: #9e1c64;
  height: 40px;
  .itemSubMenu {
    color: white;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    height: 40px;
    display: flex;
    justify-content: center;
  }
  .itemSubMenu:hover,
  .is-active-sub {
    width: -moz-fit-content;
    width: fit-content;
    margin: 0 auto;
    border-bottom: 2px solid white;
    margin-bottom: -2px;
  }
}
</style>
