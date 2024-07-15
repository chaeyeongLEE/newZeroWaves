<template>
  <div :class="$style.mapWrap">
    <div id="map" style="width:100%;height:500px;position:relative;overflow:hidden;"></div>

    <div :class="[$style.menuWrap, 'bg_white']">
      <div :class="$style.option">
        <div>
          <form @submit.prevent="searchPlaces">
            <input type="text" v-model="keyword">
            <button type="submit">검색</button>
          </form>
        </div>
      </div>
      <hr>
      <ul id="placesList" :class="$style.placesList">
        <li v-for="(place, index) in places" :key="index" :class="$style.item">
          <span :class="['markerbg', $style['marker_' + (index + 1)]]"></span>
          <div :class="$style.info">
            <h4>{{ place.place_name }}</h4>
            <span v-if="place.road_address_name">{{ place.road_address_name }}</span>
            <span :class="$style.gray">{{ place.address_name }}</span>
            <span :class="$style.tel">{{ place.phone }}</span>
          </div>
        </li>
      </ul>
      <div id="pagination" :class="$style.pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '제로웨이스트',
      places: [],
      map: null,
      markers: [],
      infowindow: new kakao.maps.InfoWindow({ zIndex: 1 })
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3
      };

      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
    searchPlaces() {
      if (!this.keyword.trim()) {
        alert('키워드를 입력해주세요!');
        return;
      }

      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(this.keyword, this.placesSearchCB);
    },
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        this.places = data;
        this.displayPlaces(data);
        this.displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    },
    displayPlaces(places) {
      const bounds = new kakao.maps.LatLngBounds();
      this.removeMarkers();

      places.forEach((place, index) => {
        const placePosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = this.addMarker(placePosition, index);

        bounds.extend(placePosition);

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          this.displayInfowindow(marker, place.place_name);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          this.infowindow.close();
        });
      });

      this.map.setBounds(bounds);
    },
    displayPagination(pagination) {
      const paginationEl = document.getElementById('pagination');
      while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
      }

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement('a');
        el.href = '#';
        el.innerHTML = i;

        if (i === pagination.current) {
          el.className = 'on';
        } else {
          el.addEventListener('click', () => {
            pagination.gotoPage(i);
          });
        }

        paginationEl.appendChild(el);
      }
    },
    addMarker(position, index) {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
      const imageSize = new kakao.maps.Size(36, 37);
      const imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10),
        offset: new kakao.maps.Point(13, 37)
      };

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
      const marker = new kakao.maps.Marker({
        position: position,
        image: markerImage
      });

      marker.setMap(this.map);
      this.markers.push(marker);

      return marker;
    },
    removeMarkers() {
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
    },
    displayInfowindow(marker, title) {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      this.infowindow.setContent(content);
      this.infowindow.open(this.map, marker);
    }
  }
};
</script>

<style module>
.mapWrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.menuWrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  margin: 10px 0 30px 10px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
}

.option {
  text-align: center;
}

.option p {
  margin: 10px 0;
}
.option input {
  border: 0;
  width: 180px;
  outline: none;
  border-radius: 0.3rem;
  padding: 0.3rem;
}

.option button {
  margin-left: 5px;
  border-radius: 0.3rem;
  border: 1px solid #d4a373;
  background-color: #d4a373;
  padding: 0.2rem;
  width: 50px;
  color: #ffffff;
}

.placesList {
  padding: 0;
  list-style: none;
}

.item {
  list-style: none;
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
  padding: 10px;
  margin-top: -1rem;
}

.item span {
  display: block;
  margin-top: 4px;
}

.item h5,
.info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.gray {
  color: #8a8a8a;
}

.jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
}

.tel {
  color: #009900;
}

.markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}

.marker_1 {
  background-position: 0 -10px;
}

.marker_2 {
  background-position: 0 -56px;
}

.marker_3 {
  background-position: 0 -102px;
}

.pagination {
  margin: 10px auto;
  text-align: center;
}

.pagination a {
  display: inline-block;
  margin-right: 10px;
}

.pagination .on {
  font-weight: bold;
}
</style>
