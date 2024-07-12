<template>
  <div>
    <nav>
      <ul :class="[$style.tabMenu, { [$style.scrolled]: isScrolled }]">
        <!--        isScrolled가 true일때  scrolled 스타일 적용 -->
        <li v-for="(menu, idx) in updateMenu" :key="idx">
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
<!--        <li v-if="isLoginFlag">-->
        <li v-if="false">
          <button type="submit">로그아웃</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      tabMenus: [
        'Home', 'Map', 'logo', 'Login', 'Join'
      ],
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters('auth', ['isLoginFlag']),
    updateMenu() {
      return this.tabMenus.map(menu => {
        if (menu === 'Login') {
          return this.isLoginFlag ? 'Logout' : 'Login';
        }
        //로그인 쪽은 UI 좀 더 고민 필요
        if (menu === 'Join') {
          return this.isLoginFlag ? 'MyPage' : 'Join';
        }
        return menu;
      })
    }
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    }
  }
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
  /* top: -17px;
   width: 100%;
   z-index: 100;*/
}

.tabMenu.scrolled {
  background-color: #ffffff;
  opacity: 50%;
  border-bottom: none;
}

.tabMenu > li a, .tabMenu > li {
  color: #00ED5D;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}

.logo {
  width: 75px;
  height: auto;
}
</style>