<template>
  <div class="reviews">
    <h2>Reviews</h2>
    <hr />
    <div class="review" :key="review.id" v-for="review in reviews.results">
      <a :href="review.url">{{review.author}}</a>
      <!-- <h5>Name</h5> -->
      <p>{{review.content}}</p>
    </div>
    <p v-if="!reviews.results[0]">No reviews</p>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    media_type: String,
    reviews: Object
  },

  async mounted() {
    // this.reviews = await this.$store.dispatch("fetchInfo", {
    //   media_type: this.media_type,
    //   id: this.id,
    //   get: "reviews"
    // });
    // console.log("review");
    // console.log(
    //   `https://api.themoviedb.org/3/${this.media_type}/${this.id}/reviews?api_key=6b776a3a940ec5542bf489cd16b7b5e5&language=en-US`
    // );
    // console.log(this.reviews);
    // this.reviews = this.reviews.results;
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
}
hr {
  margin: 5px 0 15px 0;
  background-color: #000;
  width: 90%;
  display: grid;
  justify-items: center;
  height: 1px;
}
.review {
  margin-top: 25px;
  max-width: 900px;
  // width: 80vw;
}
a {
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 20px;
}
p {
  margin: 10px 0;
  font-size: 17px;
}
@media (max-width: 1000px) {
  p {
    font-size: 15px;
    // display: none;
  }
}
</style>