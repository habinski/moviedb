
<template>
  <select v-model="selectedCountry">
    <option value=" " selected>World</option>
    <option :key="c.iso_3166_1" v-for="c in countries" :value="c.iso_3166_1">{{c.english_name}}</option>
  </select>
</template>

<script>
import { async } from "q";
export default {
  data: () => {
    return {
      selectedCountry: "World",
      countries: []
    };
  },
  methods: {
    async getCoutries() {
      this.countries = await this.$store.dispatch("fetchCountries");
      // this.trends = this.trends.results;
    }
  },
  mounted() {
    this.getCoutries();

    console.log(this.countries);
  },
  watch: {
    selectedCountry: function(selectedCountry) {
      console.log(selectedCountry);
    }
  }
};
</script>

<style lang:"scss" scoped>
/* select {
  background: red;

  option {
    color: blue;
  }
} */
</style>