<template>
  <div>
    <nav>
      <ul :class="$style.tabMenu">
        <li v-for="(menu, idx) in tabMenus" :key="idx">
          <template v-if="menu === 'logo'">
            <router-link v-if="menu === 'logo'" to="/Home">
              <img :src="require('@/assets/logo.png')" alt="Logo" :class="$style.logo" />
            </router-link>
          </template>
          <template v-else>
            <router-link :to="menu">
              {{ menu }}
            </router-link>
          </template>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabMenus: [
        'Home', 'Map', 'logo', 'Login', 'Join'
      ]
    }
  },
}
</script>

<style module>
.tabMenu {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 1.2rem 1rem;
  list-style: none;
}

.tabMenu > li a {
  color: #00ED5D;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}

.logo {
  width: 65px;
  height: auto;
}
</style>
