<template>
  <div class="home">
    <router-link to="/tv">
      <div
        class="tv"
        v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/original/' + tv + ')' }"
      >
        <h1>TV</h1>
      </div>
    </router-link>

    <router-link to="/movie">
      <div
        class="movie"
        v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/original/' + movie + ')' }"
      >
        <h1>MOVIES</h1>
      </div>
    </router-link>

    <router-link to="/person">
      <div
        class="people"
        v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/original/' + person + ')' }"
      >
        <h1>PEOPLE</h1>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {
      movie: Object,
      tv: Object,
      person: Object,
      selectType: "popular",
      type: "",
      selectRegion: "",
      page: 1
    };
  },

  async mounted() {
    document.title = "Home";
    this.movie = await this.$store.dispatch("fetchTrends", {
      selectType: "popular",
      type: "movie",
      selectRegion: ""
    });
    this.movie = this.movie.results[0].backdrop_path;

    this.tv = await this.$store.dispatch("fetchTrends", {
      selectType: "popular",
      type: "tv",
      selectRegion: ""
    });
    this.tv = this.tv.results[0].backdrop_path;

    this.person = await this.$store.dispatch("fetchTrends", {
      selectType: "popular",
      type: "person",
      selectRegion: ""
    });
    this.person = this.person.results[0].profile_path;
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 4px;
  gap: 4px;
  grid-template-areas: "tv movie people";
  a {
    text-decoration: none;
  }
  .tv {
    grid-area: tv;
  }
  .movie {
    grid-area: movie;
  }
  .people {
    grid-area: people;
  }
  div {
    // border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #000000bf;
    text-decoration: none;
    height: 90vh;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    background-color: #000;
    justify-items: center;
    filter: grayscale(100%);
    h1 {
      text-shadow: 1px 1px 2px rgb(0, 0, 0);
      font-size: 70px;
      display: flex;
      // text-align: center;
      align-items: center;
      // justify-content: center;
      text-transform: capitalize;
      // padding-top: calc(100vh / 2 - 70px);
      color: white;
      mix-blend-mode: difference;
    }
    transition: 0.2s;
    &:hover {
      filter: none;
      background-color: #161616;
    }
  }
}
@media (max-width: 1000px) {
  .home {
    grid-template-areas:
      "tv"
      "movie"
      "people";
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 1fr;

    div {
      height: 30vh;
    }
  }
}
</style>


