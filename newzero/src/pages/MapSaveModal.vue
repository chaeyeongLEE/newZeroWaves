<template>
  <TheModal width="400px" @onSubmit="savePlace">
    <template #title>
      장소 저장하기
    </template>
    <template #desc>
      해당 장소를 저장해볼게요?
    </template>
    <template #btnWrap>
      <div :class="$style.btnWrap">
        <button type="submit">확인</button>
        <button @click="closeModal">닫기</button>
      </div>
    </template>
  </TheModal>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  computed:{
    ...mapState('auth', ['modal'])
  },
  methods: {
    ...mapMutations('auth', ['SET_MODAL']),
    closeModal() {
      this.SET_MODAL('favoriteModal');
    },
    savePlace() {
      console.log('장소 저장하기')
      this.SET_MODAL('favoriteModal');
    }
  },

}
</script>

<style module>
.btnWrap {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 0.6rem;
}
.btnWrap > button {
  cursor: pointer;
  border-radius: 0.3rem;
  border: 1px solid #d4a373;
  width: 70px;
  padding: 0.35rem;
}
.btnWrap > button:nth-child(1) {
  transition: background-color 0.3s ease;
}

.btnWrap > button:nth-child(2) {
  background-color: #d4a373;
}

.btnWrap > button:hover {
  opacity: 0.8;
}

.btnWrap > button:nth-child(1):hover {
  background-color: #d4a373;
}
</style>