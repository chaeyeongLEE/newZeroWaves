<template>
  <div :class="$style.app">
    <TheHeader />
    <div :class="$style.content">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: 'MainLayout',
  components: { TheFooter, TheHeader },
}
</script>

<style module>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}

</style>
