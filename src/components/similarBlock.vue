<template>
  <div class="similars">
    <h2>Similar</h2>
    <hr />
    <div class="similar">
      <div class="character" :key="s.id" v-for="s in similar">
        <router-link :to=" '/' + media_type +'/' + s.id" exact>
          <img :src="`https://image.tmdb.org/t/p/w500/${s.poster_path}`" :alt="s.original_title" />
          <h5>{{s.title || s.original_title}}</h5>
          <p>★ {{s.vote_average}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    similar: {},
    media_type: String
  }
};
</script>

<style lang="scss" scoped>
.similar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 25px;
  margin-top: 20px;
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
  .similar {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>