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
        <li v-if="isLoginFlag">
          <button type="submit" @click="logout()" :class="$style.logoutBtn">Logout</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

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
      return this.tabMenus.filter(menu => {
        if (menu === 'Login') {
          return !this.isLoginFlag;
        }
        //로그인 쪽은 UI 좀 더 고민 필요
        if (menu === 'Join') {
          return this.isLoginFlag ? 'MyPage' : 'Join';
        }
        return true;
      }).map(menu => {
        if (menu === 'Join' && this.isLoginFlag) {
          return 'MyPage';
        }
        return menu;
      });
    }
  },
  methods: {
    ...mapMutations('auth', ['SET_USER_LOGOUT']),
    handleScroll() {
      this.isScrolled = window.scrollY > 0;
    },
    async logout()  {
      if(confirm("로그아웃 하시겠습니까?")){
        alert("정상적으로 로그아웃 되었습니다.");
        await this.SET_USER_LOGOUT();
        await this.$router.push('/home');
        return;
      }
    },
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
}

.tabMenu.scrolled {
  background-color: #ffffff;
  opacity: 50%;
  border-bottom: none;
}

.tabMenu > li a, .tabMenu > li {
  color: #57cc99;
  font-size: 1.25rem;
  font-weight: bold;
  text-decoration: none;
}

.logo {
  width: 75px;
  height: auto;
}

.logoutBtn {
  background-color: #57cc99;
  border-radius: 1rem;
  border: 1px #57cc99 solid;
  padding: 0.5rem;
  color: #ffffff;
}
</style>