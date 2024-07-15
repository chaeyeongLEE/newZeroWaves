<template>
  <div class="map_wrap">
    <div id="map" style="width:100%;height:500px;position:relative;overflow:hidden;"></div>

    <div id="menu_wrap" class="bg_white">
      <div class="option">
        <div>
          <form @submit.prevent="searchPlaces">
            키워드 : <input type="text" v-model="keyword" size="15">
            <button type="submit">검색하기</button>
          </form>
        </div>
      </div>
      <hr>
      <ul id="placesList">
        <li v-for="(place, index) in places" :key="index" class="item">
          <span class="markerbg" :class="'marker_' + (index + 1)"></span>
          <div class="info">
            <h5>{{ place.place_name }}</h5>
            <span v-if="place.road_address_name">{{ place.road_address_name }}</span>
            <span class="jibun gray">{{ place.address_name }}</span>
            <span class="tel">{{ place.phone }}</span>
          </div>
        </li>
      </ul>
      <div id="pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: '이태원 맛집',
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
      this.removeAllChildNodes(document.getElementById('placesList'));
      this.removeMarkers();

      places.forEach((place, index) => {
        const placePosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = this.addMarker(placePosition, index);
        const itemEl = this.getListItem(index, place);

        bounds.extend(placePosition);

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          this.displayInfowindow(marker, place.place_name);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          this.infowindow.close();
        });

        itemEl.addEventListener('mouseover', () => {
          this.displayInfowindow(marker, place.place_name);
        });

        itemEl.addEventListener('mouseout', () => {
          this.infowindow.close();
        });

        document.getElementById('placesList').appendChild(itemEl);
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
    },
    getListItem(index, place) {
      const el = document.createElement('li');
      let itemStr = `<span class="markerbg marker_${index + 1}"></span>`;
      itemStr += '<div class="info">';
      itemStr += `   <h5>${place.place_name}</h5>`;
      if (place.road_address_name) {
        itemStr += `    <span>${place.road_address_name}</span>`;
        itemStr += `    <span class="jibun gray">${place.address_name}</span>`;
      } else {
        itemStr += `    <span>${place.address_name}</span>`;
      }
      itemStr += `  <span class="tel">${place.phone}</span>`;
      itemStr += '</div>';

      el.innerHTML = itemStr;
      el.className = 'item';

      return el;
    },
    removeAllChildNodes(parentNode) {
      while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
      }
    }
  }
};
</script>

<style scoped>
/* Add your CSS styles here */
.map_wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.map_wrap #menu_wrap {
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

.map_wrap #menu_wrap .option {
  text-align: center;
}

.map_wrap #menu_wrap .option p {
  margin: 10px 0;
}

.map_wrap #menu_wrap .option button {
  margin-left: 5px;
}

.map_wrap #placesList li {
  list-style: none;
}

.map_wrap #placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}

.map_wrap #placesList .item span {
  display: block;
  margin-top: 4px;
}

.map_wrap #placesList .item h5,
.map_wrap #placesList .item .info {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.map_wrap #placesList .info .gray {
  color: #8a8a8a;
}

.map_wrap #placesList .info .jibun {
  padding-left: 26px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png) no-repeat;
}

.map_wrap #placesList .info .tel {
  color: #009900;
}

.map_wrap #placesList .item .markerbg {
  float: left;
  position: absolute;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png) no-repeat;
}

.map_wrap #placesList .item .marker_1 {
  background-position: 0 -10px;
}

.map_wrap #placesList .item .marker_2 {
  background-position: 0 -56px;
}

.map_wrap #placesList .item .marker_3 {
  background-position: 0 -102px;
}

/* Define marker styles up to marker_15 as per your need */

.map_wrap #pagination {
  margin: 10px auto;
  text-align: center;
}

.map_wrap #pagination a {
  display: inline-block;
  margin-right: 10px;
}

.map_wrap #pagination .on {
  font-weight: bold
}