<template>
  <div :class="$style.container">
    <form :class="$style.searchBox" @submit="searchPlace()">
      <input type="text" v-model="searchData" placeholder="장소명을 검색해주세요." />
      <button type="submit">검색</button>
    </form>
    <div id="map" :class="$style.map"></div>
  </div>
</template>

<script>
export default {
  name: "MapPage",
  data() {
    return {
      map: null,
      searchData: '',
    };
  },
  mounted() {
    if(window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript(){
      const script = document.createElement("script");
      script.src ="//dapi.kakao.com/v2/maps/sdk.js?appkey=1a9bd286f80311a96542bac4808401e1&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    loadMap(){
      const container = document.getElementById("map"); //지도를 담을 DOM 영역
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.loadMaker();
    },
    loadMaker() {
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const marker = new window.kakao.maps.Marker({ position:markerPosition });
      marker.setMap(this.map);
    },
    searchPlace() {
    }
  }
}
</script>

<style module>
.container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.searchBox{
  width: 300px;
  background-color: #e9edc9;
  padding: 1rem;
  border-radius: 0.3rem;
}
.searchBox > input {
  border: 0;
  outline: none;
  border-radius: 0.3rem;
  width: 170px;
  padding: 0.3rem;
}
.searchBox > button {
  border-radius: 0.3rem;
  border: 1px solid #d4a373;
  background-color: #d4a373;
  padding: 0.2rem;
  width: 50px;
  margin-left: 10px;
  color: #ffffff;
}
.map {
  width: 100%;
  height: 700px;
  border-radius: 0.3rem;
}
</style>