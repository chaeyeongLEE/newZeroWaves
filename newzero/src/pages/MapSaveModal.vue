<template>
  <TheModal width="300px" @onSubmit="savePlace">
    <template #title>
      {{ clickPlace.place.place_name }}
      <p>{{ clickPlace.place.category_name}}</p>
    </template>
    <template #desc>
      <div :class="$style.contentWrap">
        <span>📍 {{ clickPlace.place.address_name || '' }}</span>
        <span>{{ clickPlace.place.phone ? '📞 ' + clickPlace.place.phone : '' }}</span>
      </div>
    </template>
    <template #btnWrap>
      <div :class="$style.btnWrap">
        <button type="submit">저장하기</button>
        <button @click="closeModal">닫기</button>
      </div>
    </template>
  </TheModal>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  computed:{
    ...mapState('auth', ['modal', 'clickPlace'])
  },
  methods: {
    ...mapMutations('auth', ['SET_MODAL', 'RESET_CLICK_DATA']),
    ...mapActions('auth', ['ADD_USER_PLACE']),
    closeModal() {
      this.SET_MODAL('favoriteModal');
      this.RESET_CLICK_DATA();
    },
    savePlace() {
      this.SET_MODAL('favoriteModal');
      this.ADD_USER_PLACE();
    }
  },

}
</script>

<style module>
.contentWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 0.9rem;
}
.btnWrap {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 0.6rem;
}
.btnWrap > button {
  cursor: pointer;
  border-radius: 0.3rem;
  border: 1px solid #57cc99;
  width: 75px;
  padding: 0.35rem;
}
.btnWrap > button:nth-child(1) {
  transition: background-color 0.4s ease;
  background-color: #ffffff;
}

.btnWrap > button:nth-child(2) {
  background-color: #80ed99;
}

.btnWrap > button:hover {
  opacity: 0.8;
}

.btnWrap > button:nth-child(1):hover {
  background-color: #80ed99;
}
</style>