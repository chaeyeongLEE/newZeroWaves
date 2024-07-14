<template>
  <div>
    <h1>kakaoMap</h1>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "MapPage",
  data() {
    return {
      map: null
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
      // 6fff259c639722b1a997ad8472e9a88a
      script.src ="//dapi.kakao.com/v2/maps/sdk.js?appkey=6fff259c639722b1a997ad8472e9a88a&autoload=false"
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
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667)
      const marker = new window.kakao.maps.Marker({position:markerPosition})
      marker.setMap(this.map);
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>