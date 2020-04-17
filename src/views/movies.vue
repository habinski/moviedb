<template>
  <div class="home">
    <trends type="movie" :trendTypes="trendTypes" />
  </div>
</template>

<script>
import Trends from "@/components/trends";
import trendItem from "@/components/trendItem";

export default {
  name: "home",
  data() {
    return {
      trends: [],
      trendTypes: [
        { name: "popular", id: "popular" },
        { name: "now playing", id: "now_playing" },
        { name: "top rated", id: "top_rated" },
        { name: "upcoming", id: "upcoming" }
      ]
    };
  },

  components: {
    Trends
  }
};
</script>
