<template>
  <div :class="$style.container">
    <form :class="$style.searchBox" @submit.prevent="searchPlace">
      <input type="text" v-model="searchData" placeholder="장소명을 검색해주세요." id="keyword"/>
      <button type="submit" id="submitBtn" @click.prevent="searchPlace">검색</button>
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
      ps: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.ps = new window.kakao.maps.services.Places();
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.onload = () => window.kakao.maps.load(this.loadMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=1a9bd286f80311a96542bac4808401e1&autoload=false&libraries=services";
      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 1,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },
    searchPlace() {
      const keyword = this.searchData.trim();
      if (!keyword) {
        alert('키워드를 입력해주세요!');
        return;
      }
      this.ps.keywordSearch(keyword, this.placesSearchCB);
    },
    placesSearchCB(data, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        this.displayPlaces(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
      }
    },
    displayPlaces(places) {
      const bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < places.length; i++) {
        this.displayMarker(places[i]);
        bounds.extend(new window.kakao.maps.LatLng(places[i].y, places[i].x));
      }
      this.map.setBounds(bounds);
    },
    displayMarker(place) {
      const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(this.map);
    }
  }
};
</script>

<style module>
.container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.searchBox {
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
