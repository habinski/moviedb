<template :info="info">
  <div
    class="background"
    v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/w500/' + trend.backdrop_path + ')' }"
  >
    <div class="item">
      <h2>
        <router-link
          :to="{ path: trend.media_type + '/'+ info.id}"
          :key="info.id"
          :info="info"
        >{{ info.name || info.original_title || info.title}}</router-link>
      </h2>
      <div class="info">
        <p class="release">{{ trend.media_type }}</p>
        <p class="release">{{ info.release_date || info.first_air_date }}</p>
        <p class="release">{{ trend.vote_average }} ({{ trend.vote_count }} votes)</p>
        <div class="release">
          <p class="genre" :key="ganre.id" v-for="ganre in info.genres">{{ ganre.name }}</p>
        </div>
      </div>
      <img v-bind:src="`https://image.tmdb.org/t/p/w500/${trend.poster_path}`" />
      <p>{{info.overview}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    trend: {}
  },
  data() {
    return {
      info: []
    };
  },

  methods: mapActions(["fetchFullInfo"]),
  async mounted() {
    console.log(this.trend.media_type);
    console.log(this.trend.id);
    this.info = await this.$store.dispatch("fetchFullInfo", {
      media_type: this.trend.media_type,
      id: this.trend.id
    });
    const media_type = this.trend.media_type;
    const id = this.trend.id;
    console.log(this.info);
  }
};
</script>
<style lang="scss" scoped>
.background {
  background-repeat: no-repeat;
  background-size: 100%;
  border-radius: 10px;
}
.item {
  height: auto;
  color: rgb(255, 255, 255);
  text-shadow: 1px 1px 2px rgb(0, 0, 0);
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 0.1fr 1fr 1.1fr;
  backdrop-filter: blur(5px) grayscale(40%);
  border-radius: 10px;
  grid-template-areas:
    "poster title"
    "poster info"
    "poster overview";
}

h2 {
  font-size: 25px;
  text-align: center;
  grid-area: title;
  text-transform: uppercase;
  width: 90%;
  margin-top: 15px;
  // mix-blend-mode: difference;

  ////
}
.info {
  // mix-blend-mode: difference;
  // grid-area: info;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  text-transform: uppercase;
}
p {
  // mix-blend-mode: difference;
  // grid-area: overview;
  margin: 0;
  // width: 95%;
  align-self: center;
  margin: 0 10px;
}
img {
  width: auto;
  height: 350px;
  grid-area: poster;
  padding: 20px;
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
</style>