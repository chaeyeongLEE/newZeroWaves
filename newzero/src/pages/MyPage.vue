<template>
  <div :class="$style.pageContainer">
    <div :class="$style.infoBox">
      <h2>{{ userId }}님 안녕하세요</h2>
      <span>내가 기록한 장소</span>
    </div>
    <div :class="$style.cardBox">
      <div :class="$style.card" v-for="(list, idx) in userPlaceList" :key="idx">
        <h3 style="color: #7FA17F">{{ list?.place }}</h3>
        <span style="color: #969696">{{ list?.desc }}</span>
        <p>{{ list?.address }}</p>
        <span>{{ list?.phone }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  mounted() {
    this.GET_USER_PLACE();
  },
  computed: {
    ...mapState('auth', ['userId', 'userPlaceList']),
  },
  methods: {
    ...mapActions('auth', ['GET_USER_PLACE']),
  }
}
</script>

<style module>
.pageContainer {
  padding: 0 6rem;
  box-sizing: border-box;
  overflow-x: hidden;
}

.infoBox {
  color: #0475FF;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 2.5rem 0.5rem;
}
.infoBox > span {
  font-weight: 500;
}
.cardBox {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #7FA17F;
  padding: 1rem;
  align-items: flex-start;
  box-sizing: border-box;
  border-radius: 1rem;
}
.card h3, .card span, .card p {
  margin: 0.5rem 0;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  width: 100%;
}

.card h3 {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card span, .card p {
  height: 45px;
  overflow: auto;
  text-overflow: ellipsis;
  -ms-overflow-style: none;
}
.card span::-webkit-scrollbar, .card p::-webkit-scrollbar {
  display: none;
}
</style>
