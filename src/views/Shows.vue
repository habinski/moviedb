<template>
  <div class="home">
    <trends type="tv" />
  </div>
</template>

<script>
import Trends from "@/components/trends";
import trendItem from "@/components/trendItem";

export default {
  name: "home",
  data() {
    return {
      trends: []
    };
  },

  components: {
    Trends
  }
};
</script>
