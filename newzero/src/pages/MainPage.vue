<template>
  <main>
    <section :class="$style.card" style="margin-top: 5rem">
      <img :src="require('@/assets/mainImg.png')" alt="mainImg" :class="$style.img" />
      <div :class="$style.textBox">
        <h2>제로 웨이브 <br /> <span style="color: #00ED5D; font-size: medium;">Zero Wave</span></h2>
        <p>제로웨이브는 일상 속에서 환경보호를 실천할 수 있게 도움을 주는<br /> 제로웨이스트 커뮤니티 서비스입니다. </p>
      </div>
    </section>
    <section :class="$style.card">
      <div :class="$style.textBox">
        <h1 style="color: #0475FF">우리의 지구는 건강한가요?</h1>
        <p>세계적으로 산업화가 확산되면서 폐기물의 양이 크게 증가하고 있습니다. <br /> 2012년, 세계은행은
          도시 인구에 의해 13억 톤의 도시 폐기물이 생산 되었다고 발표했으며 <br />그 수는 2025년에는
          22억 톤에 이를 것이라고 예측하고 있습니다. <br /><br />
          환경으로부터 자원은 한정되어 있으나 전세계 인구는 점점 증가하고 있습니다. 따라서 이용 가능한<br />
          자원을 위해 낭비를 막는 것이 더욱 중요해진 상황입니다. 이제 환경에 대해 고민하는 것에 머물지<br />
          않고 실천해야 할 타이밍입니다.
        </p>
      </div>
      <img :src="require('@/assets/mainImg2.png')" alt="mainImg" :class="$style.img2" />

    </section>
    <section :class="$style.card">
      <img :src="require('@/assets/mainImg3.png')" alt="mainImg" :class="$style.img2" />
      <div :class="$style.textBox">
        <h3>Why <br /> <span style="color: #00ED5D; font-size: 2.2rem">Zero Waste?</span></h3>
        <p>제로 웨이스트(zero waste)는 모든 제품, 포장 및 자재를 태우지 않고, <br />재사용될 것을 목표로 합니다.
          즉, 환경이나 인간의 건강을 위협할 수 있는<br />
          토지, 해양, 공기로 배출하지 않고 생산, 소비, 재사용 및 회수를 통해 <br />모든 자원을 보존 및 재활용하는 것 입니다.
          제로 웨이스트를 통해 폐기물을 제거하면 <br />환경 오염을 줄일 수 있고,
          또한 원자재에 대한 필요성이 줄어들어 비용도 절감할 수 있습니다.<br /><br />
          제로 웨이브는 일상 속에서 제로웨이스트를 실천할 수 있는 방안을 모색하고 <br />
          많은 제로웨이스터들이 모일 수 있는 커뮤니티로서 기능해 <br />
          제로 웨이스트의 흐름이 만연한 사회의 도래를 목표로 합니다.<br /><br />
          제로 웨이브를 통해 환경보호에 동참해주세요</p>
      </div>
    </section>
    <section :class="$style.card2">
      <div :class="$style.textBox2">
        <h1>Zero Wave는 제로웨이스트를 실천합니다</h1>
        <span style="color: #00ED5D;">제로웨이스트를 위한 제로웨이브의 기능을 소개합니다</span>
      </div>
    </section>
    <section :class="$style.card">
      <div :class="$style.textBox2">
        <img :src="require('@/assets/mainImg4.png')" alt="mainImg" :class="$style.smallLogo" />
        <h2 >Wave Map</h2>
        <span style="line-height: 130%">제로웨이스트를 실천하고 있는 공간에<br />
        대한 정보를 한 눈에 파악할 수 있습니다.<br />
        또한 직접 용기내 챌린지가 가능한 가게에<br />
        대한 정보를 추가할 수 있습니다.</span>
        <router-link to="/map">
          <p>둘러보기</p>
        </router-link>
      </div>
      <div :class="$style.textBox">
        <h3 style="background-color: #00ED5D; padding: 0.7rem; border-radius: 1rem">제로 웨이스트 샵 정보 제공</h3>
        <span style="margin: 0.5rem 0 3rem 0.5rem">제로웨이스트를 실천하고 있는 공간에 대한 정보를 한 눈에 파악할 수 있습니다.</span>

        <h3 style="background-color: #00ED5D; padding: 0.7rem; border-radius: 1rem">직접 용기내 챌린지 샵 정보 추가</h3>
        <span style="margin: 0.5rem 0 0 0.5rem">용기내 챌린지가 가능한 가게에 대한 정보를 추가해보세요</span>
      </div>
    </section>

  </main>
</template>

<script>
export default {
  data() {
    return {
    }
  },
}
</script>

<style module>
.card{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 0;
}

.card2{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
}

.textBox {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 1rem 3rem;
}
.textBox2 {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 3rem;
}
.img {
  width: 400px;
  height: 250px;
}

.img2 {
  width: 300px;
  height: 400px;
}
.smallLogo {
  width: 200px;
  height: auto;
}
</style>
