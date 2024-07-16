<template>
  <div :class="$style.modalWrap">
    <div :class="$style.container">
      <form
          :class="$style.content"
          :style="{ width: width }"
          @submit.prevent="$emit('onSubmit')"
      >
        <h3 :class="$style.modalTitle">
          <slot name="title"></slot>
        </h3>
        <div :class="$style.desc">
          <slot name="desc"></slot>
        </div>
        <div :class="$style.btnWrap">
          <slot name="btnWrap"></slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    width: {
      type: String,
      default: '450px',
    },
  },
  computed: {
    ...mapState('auth', ['modal']),
  },
  methods: {
    ...mapMutations('auth', ['SET_MODAL']),
    toggleModal() {
      this.SET_MODAL('favoriteModal');
    }
  }
}
</script>

<style module>
.modalWrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.container {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.content {
  width: 100%;
  max-width: 550px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 1rem;
  animation: scaleUp 0.3s;
}

.modalTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-size: 1.2rem;
  font-weight: 600;
}
.modalTitle p {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  font-size: 0.8rem;
  font-weight: 400;
  color: #969696;
}

.btnWrap {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  margin-top: 2rem;
}

</style>
