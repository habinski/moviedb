<template>
  <div>
    <h1>
      The most popular {{ type }} of this
      <select v-model="selectTime">
        <option :key="p" v-for="p in period">{{p}}</option>
      </select>
    </h1>
    <div class="grid">
      <trendItem :key="trend.id" :trend="trend" v-for="trend in trends" />
    </div>
  </div>
</template>

<script>
import trendItem from "@/components/trendItem";
// import store from "../store/index.js";
import { mapActions } from "vuex";
export default {
  components: {
    trendItem
  },
  props: {
    type: String
  },
  data: () => {
    return {
      trends: [],
      period: ["week", "day"],
      selectTime: "day",
      selectType: ""
    };
  },
  methods: {
    async getTrends(selectType, selectTime) {
      this.trends = await this.$store.dispatch("fetchTrends", {
        selectType: this.type,
        selectTime: selectTime
      });
      this.trends = this.trends.results;
      // console.log(selectType, selectTime);
    }
  },
  mounted() {
    this.getTrends(this.type, this.selectTime);
    // console.log(this.selectType, this.selectTime);
  },
  watch: {
    // selectType: function(selectType, selectTime) {
    //   // console.log(selectType, selectTime);
    //   this.getTrends(selectType, this.selectTime);
    // },
    selectTime: function(type, selectTime) {
      // console.log(selectType, selectTime);
      this.getTrends(this.type, selectTime);
    }
  }
};
</script>
    
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-gap: 35px;
  margin: 0 35px;
}
h1 {
  color: #000;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 25px;
  select {
    border: none;
    background-color: inherit;
    font-size: 30px;
    text-transform: uppercase;
    option {
      font-size: 30px;
      text-transform: uppercase;
    }
  }
}
</style>