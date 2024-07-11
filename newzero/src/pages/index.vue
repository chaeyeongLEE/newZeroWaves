<template>
  <div :class="$style.app">
    <main :class="$style.main">
      <TheHeader />
      <router-view />
    </main>
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";

export default {
  name:'MainLayout',
  components: {TheHeader},
}
</script>
<style module>
.app {
  display: flex;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  margin: 0 auto;
  white-space: nowrap;
  overflow-x: auto;
}
.main {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>