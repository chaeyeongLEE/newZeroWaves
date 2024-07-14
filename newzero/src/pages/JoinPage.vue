<template>
  <main>
    <div :class="$style.Section1">
      <h1 style="color: #0475FF">Join</h1>
      <form :class="$style.joinBox" @submit.prevent="isJoin">
        <input type="text" placeholder="이름" @change="isChangeUser($event, 'name')" />
        <input type="text" placeholder="아이디" @change="isChangeUser($event, 'id')" />
        <input type="email" placeholder="이메일" @change="isChangeUser($event, 'email')" />
        <input type="password" placeholder="비밀번호" @change="isChangeUser($event, 'pw')" />
        <input type="password" placeholder="비밀번호확인" @change="isChangeUser($event, 'pwCheck')" />
        <span v-if="newUser.pw && newUser.pwCheck && (newUser.pw !== newUser.pwCheck)">비밀번호가 동일하지않습니다.</span>
        <button type="submit">회원가입</button>
      </form>
    </div>
  </main>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      newUser: {
        id: '',
        pw: '',
        pwCheck: '',
        email: '',
        name: '',
      }
    }
  },
  methods: {
    ...mapMutations('auth', ['SET_USER']),
    ...mapActions('auth',['GET_JOIN_USER']),
    isChangeUser(e, field) {
      this.newUser[field] = e.target.value;
    },
    async isJoin() {
      if (!this.newUser.id) {
        alert('아이디를 입력해주세요.');
        return;
      }
      if (!this.newUser.pw) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (this.newUser.pw !== this.newUser.pwCheck) {
        alert('비밀번호와 비밀번호확인이 동일하지않습니다.');
        return;
      }
      if (!this.newUser.email) {
        alert('이메일을 입력해주세요.');
        return;
      }
      // if (!this.user.email) { 이메일 유효성 체크 로직 추가하기
      //   alert('이메일을 입력해주세요.');
      //   return;
      // }
      this.GET_JOIN_USER(this.newUser);
      this.resetUser();
    },
    async resetUser() {
      this.newUser = {};
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

.joinBox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 450px;
  border: 1.5px solid #0475FF;
  margin-top: 1rem;
  border-radius: 0.2rem;
}

.joinBox > input {
  width: 250px;
  border-width: 0 0 1px;
  padding: 1rem;
}
.joinBox > input:focus {
  outline: none;
}

.joinBox > button {
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

.joinBox > button:hover {
  background-color: #035bc0;
  transition: 0.25s all ease-in-out;
}
.joinBox > span {
  display: flex;
  margin: 0.5rem 8rem 0 0;
  font-size: 0.7rem;
  color: #0475FF;
}
</style>
