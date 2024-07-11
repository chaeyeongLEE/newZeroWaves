<template>
  <main>
    <div :class="$style.Section1">
      <h1 style="color: #0475FF">Login</h1>
      <form :class="$style.loginBox" @submit.prevent="isLogin">
        <input type="text" placeholder="아이디" @change="isChangeUser($event, 'id')" />
        <input type="password" placeholder="비밀번호" @change="isChangeUser($event, 'pw')" />
        <span>
          <input type="checkbox" /> <label>로그인 상태 유지</label>
        </span>
        <button type="submit">로그인</button>
      </form>
    </div>
  </main>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      user: {
        id: '',
        pw: '',
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['SET_USER', 'SET_LOGIN_FLAG']),
    isChangeUser(e, field) {
      this.user[field] = e.target.value;
    },
    async isLogin() {
      if (!this.user.id || !this.user.pw) {
        alert('아이디 또는 비밀번호를 입력해주세요.');
        return;
      }
      if (this.user.id !== 'yeong') {
        alert('해당 아이디가 존재하지않습니다.');
        return;
      }
      if (this.user.pw !== '123qwe') {
        alert('비밀번호가 올바르지않습니다.');
        return;
      }
      alert('로그인이 완료되었습니다.');
      console.log('this.user', this.user);
      try {
        await this.SET_USER(this.user);
        await this.SET_LOGIN_FLAG(true);
        await this.$router.push('/home');
      } catch (error) {
        alert('로그인에 실패하였습니다.');
        console.error(error);
      } finally {
         await this.resetUser();
      }
    },
    async resetUser() {
      this.user.id = '';
      this.user.pw = '';
    },

  }
}

</script>

<style module>
.Section1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8rem 0;
}

.loginBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 250px;
  border: 1.5px solid #0475FF;
  margin-top: 1rem;
  border-radius: 0.2rem;
}

.loginBox > input {
  width: 250px;
  border-width: 0 0 1px;
  padding: 1rem;
}
.loginBox > input:focus {
  outline: none;
}

.loginBox > button {
  width: 282px;
  margin-top: 2.2rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #0475FF;
  color: white;
  cursor: pointer;
  border-radius: 0.2rem;
  font-weight: 600;
}

.loginBox > button:hover {
  background-color: #035bc0;
  transition: 0.25s all ease-in-out;
}
.loginBox > span {
  display: flex;
  align-items: center;
  margin: 1rem 9.5rem 0 0 ;
  font-size: 0.9rem;
  color: #7D7D7D;
}
</style>
