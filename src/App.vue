<template>
  <nav>
    <template v-for="(child, index) in list" :key="child.path">
      <template v-if="index != list.length - 1">
        <router-link :to="child.path">{{ child.name }}</router-link> |
      </template>
      <template v-else>
        <router-link :to="child.path">{{ child.name }}</router-link>
      </template>

    </template>
  </nav>
  <router-view />
</template>

<script setup>
import { reactive } from 'vue'
const list = reactive([
  { name: '表格拖拽', path: '/' },
  { name: 'Ref and Reactive Compare', path: '/compare' },
  { name: 'mobile adaptation', path: '/adapt' },
  { name: 'grid layout', path: '/grid' },
  { name: 'key important', path: '/key' },
  { name: 'theme toggle', path: '/theme' },
  { name: 'vue draggable', path: '/vuedrag' },
])
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
