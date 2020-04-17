<template >
  <div
    class="background"
    v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/w500/' + trend.backdrop_path + ')' }"
  >
    <router-link :to="{ path: type
           + '/'+ info.id}" :key="info.id" :info="info">
      <div class="item">
        <h2>{{ info.name || info.title || info.original_title}}</h2>
        <div class="info">
          <div class="country">
            <p
              :key="country.id"
              v-for="country in info.production_countries || info.production_companies"
            >{{ country.name }}</p>
          </div>
          <p
            class="release"
          >{{new Date( info.release_date || info.first_air_date).toLocaleDateString('en-EN', options) }}</p>
          <p class="vote">{{ trend.vote_average }} ({{ trend.vote_count }} votes)</p>
          <div class="genre-block">
            <p class="genre" :key="ganre.id" v-for="ganre in info.genres">{{ ganre.name }}</p>
          </div>
        </div>
        <img
          v-if="trend.poster_path | trend.poster_path != null"
          :src="`https://image.tmdb.org/t/p/w500/${trend.poster_path}`"
        />
        <img v-else src="@/assets//noimage.png" />
        <p class="overview">{{info.overview}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    trend: {},
    type: String
  },
  data() {
    return {
      info: [],
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    };
  },

  methods: mapActions(["fetchFullInfo"]),
  async mounted() {
    this.info = await this.$store.dispatch("fetchFullInfo", {
      media_type: this.type,
      id: this.trend.id
    });
    const media_type = this.trend.media_type;
    const id = this.trend.id;
    // console.log(this.info);
  }
};
</script>
<style lang="scss" scoped>
.background {
  background-color: #0f0f0f;
  background-repeat: no-repeat;
  // background-size: 100%;
  border-radius: 10px;
  background-size: cover;
}
.item {
  height: auto;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  display: grid;
  grid-template-columns: 275px auto;
  grid-template-rows: auto;
  backdrop-filter: blur(5px) grayscale(40%);
  border-radius: 10px;
  grid-template-areas:
    "poster title"
    "poster info"
    "poster overview";
  .country {
    display: grid;
    // align-items: center;
    justify-items: center;
    text-transform: capitalize;
  }
}
a {
  color: white;
  text-decoration: none;
  // mix-blend-mode: difference;
}
h2 {
  font-size: 25px;
  text-align: center;
  grid-area: title;
  text-transform: uppercase;
  width: 90%;
  margin-top: 15px;

  mix-blend-mode: difference;
}
.info {
  // mix-blend-mode: difference;
  // grid-area: info;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  // text-transform: uppercase;
  text-align: center;
}
.overview {
  // mix-blend-mode: difference;
  // grid-area: overview;
  margin: 0;
  margin-right: 10px;
  // width: 95%;
  // align-self: center;
  margin: 20px 15px 20px 10px;
  height: 125px;
  overflow: hidden;
}
img {
  // width: 270px;
  height: 350px;
  grid-area: poster;
  margin: 20px;
}
.genre {
  display: inline-block;
  text-transform: none;
  background-color: rgb(123, 133, 190);
  border-radius: 10px;
  margin: 3px;
  padding: 2px;
  align-self: center;
}
// ???????????????????????????????????????
@media screen and (max-width: 1000px) {
  .background {
  }
  img {
    display: grid;
    align-self: center;
    width: 95%;
    height: auto;
    justify-self: center;
    margin: 10px 0 20px;
  }
  .item {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "title"
      "poster"
      "info"
      "overview";
  }

  .overview {
    // margin-bottom: 10px;
    text-align: center;
  }
  h2 {
    width: 100%;
  }
}
</style>