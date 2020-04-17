<template>
  <div class="home">
    <trends type="tv" :trendTypes="trendTypes" />
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
        { name: "airing today", id: "airing_today" },
        { name: "on the air", id: "on_the_air" },
        { name: "top rated", id: "top_rated" }
      ]
    };
  },

  components: {
    Trends
  }
};
</script>
