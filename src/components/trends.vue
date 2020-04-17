<template>
  <div>
    <h1>
      <select v-model="selectType">
        <!-- <option selected>{{selectType}}</option> -->
        <option :key="p.id" v-for="p in trendTypes" :value="p.id">{{p.name}}</option>
      </select>
      {{ type }}
      <span v-if="type !== 'tv' ">{{"in "}}</span>
      <select class="selectRegion" v-model="selectRegion" v-if="type !== 'tv'">
        <option value="World" selected>the world</option>
        <option :key="c.iso_3166_1" v-for="c in countries" :value="c.iso_3166_1">{{c.english_name}}</option>
      </select>
    </h1>
    <div class="grid">
      <trendItem :key="trend.id" :type="type" :trend="trend" v-for="trend in trends" />
    </div>
    <h1>
      <button class="pageButton" v-if="page !=1" v-on:click="page -= 1">-</button>
      {{page}}
      <button class="pageButton" v-on:click="page += 1">+</button>
    </h1>
  </div>
</template>


<script>
import trendItem from "@/components/trendItem";

// import { mapActions } from "vuex";
export default {
  components: {
    trendItem
  },

  props: {
    type: String,
    trendTypes: Array
  },
  data: () => {
    return {
      trends: {},
      period: ["week", "day"],
      // selectTime: "day",
      selectType: "popular",
      selectRegion: "World",
      countries: Object,
      page: 1,
      allTrends: Object
    };
  },

  methods: {
    async getTrends(selectType, type, selectRegion, page) {
      this.trends = await this.$store.dispatch("fetchTrends", {
        selectType: this.selectType,
        type: this.type,
        selectRegion: this.selectRegion,
        page: this.page
      });
      this.trends = this.trends.results;

      // this.trends = Object.assign(this.trends, this.allTrends);
      console.log(this.trends);
      // this.trends = this.trends.concat(this.allTrends);
    },
    async getCoutries() {
      this.countries = await this.$store.dispatch("fetchCountries");
      // console.log(this.countries);
    }
  },
  created() {
    document.title = this.type.toUpperCase() + "s";
    this.getCoutries();
    this.getTrends(this.selectType, this.type, this.selectRegion, this.page);
  },
  watch: {
    selectType: function(selectType, type, selectRegion, page) {
      this.page = 1;
      this.getTrends(this.selectType, this.type, this.selectRegion, this.page);
    },
    page: function(selectType, type, electRegion, page) {
      // console.log(selectType, selectTime);
      this.getTrends(this.selectType, this.type, this.selectRegion, this.page);
      scroll(0, 0);
    },
    selectRegion: function(selectType, type, electRegion, page) {
      this.page = 1;
      this.getTrends(this.selectType, this.type, this.selectRegion, this.page);
    }
  }
};
</script>
    
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: repeat(5, auto);
  grid-gap: 35px;
  margin: 0 35px;
  min-height: 100vh;
}
h1 {
  // display: grid;
  margin-top: 30px;
  color: #000;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 25px;
  select {
    text-align-last: right;
    border: none;
    background-color: inherit;
    font-size: 30px;
    text-transform: uppercase;
    width: 235px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    option {
      font-size: 15px;
      text-transform: capitalize;
    }
  }
  .selectRegion {
    text-align-last: left;
  }

  .pageButton {
    background: inherit;
    font-size: 25px;
    border: none;
  }
}

@media (max-width: 1300px) {
  h1 {
    // font-size: 25px;
    select {
      text-align-last: center;
      // font-size: 25px;
      width: 90%;
    }
    .selectRegion {
      text-align-last: center;
    }
  }
  .grid {
    grid-template-columns: 1fr;
    margin: 0 15px;
  }
}
</style>