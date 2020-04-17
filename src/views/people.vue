<template>
  <div>
    <h1>popular people</h1>
    <div class="grid">
      <personItem :key="p.id" :p="p" v-for="p in people" />
    </div>
    <h1>
      <button class="pageButton" v-if="page !=1" v-on:click="page -= 1">-</button>
      {{page}}
      <button class="pageButton" v-on:click="page += 1">+</button>
    </h1>
  </div>
</template>

<script>
import personItem from "@/components/personItem";
export default {
  components: {
    personItem
  },

  data: () => {
    return {
      selectType: "popular",
      type: "person",
      selectRegion: "",
      page: 1,
      people: []
    };
  },
  methods: {
    async getTrends() {
      // this.selectType = selectType.replace(/ /g, "_");
      this.people = await this.$store.dispatch("fetchTrends", {
        selectType: this.selectType,
        type: this.type,
        selectRegion: this.selectRegion,
        page: this.page
      });
      this.people = this.people.results;
      console.log(this.people);
    }
  },
  mounted() {
    document.title = "People";
    scroll(0, 0);
    this.getTrends();
  },
  watch: {
    page: function(selectType, type, electRegion, page) {
      this.getTrends();
    }
  }
};
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  margin: 0 20px 30px 20px;
  grid-template-columns: repeat(5, 1fr);
  // grid-template-rows: repeat(5, auto);
  grid-gap: 20px;
  // margin: 0 20px;
}
h1 {
  margin-top: 30px;
  color: #000;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.pageButton {
  align-self: center;
  background: inherit;
  font-size: 25px;
  border: none;
}

@media (max-width: 950px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (max-width: 750px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>