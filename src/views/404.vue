<template>
  <div class="err">
    <h2>Ooops! Noting was found.</h2>
    <h1
      v-bind:style="{ 'background-image': 'url(https://image.tmdb.org/t/p/original/' + movie + ')' }"
    >404</h1>
    <p>We can't find the page you're looking for.</p>
    <router-link to="/">Home page</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: String
    };
  },
  async mounted() {
    document.title = "404";
    this.movie = await this.$store.dispatch("fetchTrends", {
      selectType: "popular",
      type: "movie",
      selectRegion: ""
    });
    this.movie = this.movie.results[0].backdrop_path;
  }
};
</script>


<style lang="scss" scoped>
.err {
  text-align: center;
  margin-bottom: 100px;
  height: 80vh;
  h2 {
    margin: 100px 0 10px 0;
  }
  h1 {
    font-size: 200px;
    background: center;
    background-size: contain;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 5px;
  }
  p {
    margin-bottom: 50px;
  }
  a {
    background-color: #000;
    padding: 20px;
    color: #fff;
    border-radius: 5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.3s;
    font-style: bold;
    &:hover {
      background-color: rgb(124, 124, 124);
      color: rgb(0, 0, 0);
    }
  }
}
</style>