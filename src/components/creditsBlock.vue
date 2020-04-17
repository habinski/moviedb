<template>
  <div class="credits">
    <h2>Cast</h2>
    <hr />
    <div class="cast">
      <div class="character" :key="c.cast_id" v-for="c in credits.cast">
        <router-link :to=" '/person/' + c.id">
          <img
            v-if="c.profile_path"
            :src="`https://image.tmdb.org/t/p/w500/${c.profile_path}`"
            :alt="c.name"
          />
          <img src="@/assets//noimage.png" v-else />
          <h5>{{c.character}}</h5>
          <p>{{c.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    credits: Object
  },
  mounted() {
    console.log(this.credits);
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
}
.cast {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
}
h3 {
  margin-top: 20px;
  font-size: 20px;
  margin-left: 10px;
}
hr {
  margin: 5px 0 15px 0;
  background-color: #000;
  width: 90%;
  height: 1px;
}

h5 {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #000;
}
p {
  text-align: center;

  font-size: 20px;
  color: #000;
}
.character {
  a {
    text-decoration: none;
  }
}
img {
  width: 100%;
}
@media (max-width: 1000px) {
  // .credits {
  //    margin: 0 10px;
  //    width: calc(100% - 20px);
  // }
  .cast {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>