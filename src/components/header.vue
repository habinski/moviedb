<template>
  <header>
    <router-link to="/">
      <img src="@/assets/logo.svg" alt="Logo" />
    </router-link>
    <div class="search">
      <input v-model="search" type="text" placeholder="Search" />
      <div v-if="search.length != 0 " class="divRes">
        <router-link
          :key="result.id"
          v-for="result in searchResult"
          :to="{ path: result.media_type + '/' + result.id}"
        >
          <p>
            {{result.name || result.original_title}}
            <span>{{result.release_date || result.first_air_date}}</span>
          </p>
        </router-link>
      </div>
    </div>
    <router-link to="/">Home</router-link>
    <router-link to="/movie">Movies</router-link>
    <router-link to="/tv">TV Shows</router-link>
    <router-link to="/person">People</router-link>
  </header>
</template>

<script>
export default {
  data: () => {
    return {
      search: "",
      searchResult: []
    };
  },
  methods: {
    async getSearchResult(search) {
      console.log(search);
      this.searchResult = await this.$store.dispatch("fetchSearch", {
        search: this.search
      });
      this.searchResult = this.searchResult.results;
      console.log(this.searchResult);
    }
  },
  watch: {
    search: function(search) {
      if (search != 0) {
        search = search.trim().replace(/ /g, "+");
        console.log(this.search);
        this.getSearchResult(this.search);
        result.release_date.spice || result.first_air_date.spice;
      } else if (search.length === 0) {
        let a = document.getElementsByClassName("divRes");
        a.innerHTML = "color: white";
        console.log(this.search.length);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  background-color: rgb(20, 20, 20);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: grid;
  grid-template-columns: 70px minmax(500px, 900px) 1fr 1fr 1fr 1fr;
  grid-template-rows: 75px;
  align-items: center;
  justify-items: center;
  margin-bottom: 35px;
  // grid-gap: 10px;
  .search {
    .divRes {
      // width: 10%;
      display: block;
      margin-top: 25px;
      background: rgb(0, 0, 0);
      padding: 10px;
      border-radius: 25px;
      position: absolute;
      z-index: 4;
      width: auto;
      height: 400px;
      overflow-y: scroll;
      a {
        display: inline;
        text-transform: none;
        color: rgb(255, 255, 255);
        p {
          margin-top: 10px;
        }
        span {
          font-size: 12px;
          color: rgb(117, 117, 117);
        }
      }
    }
  }
  input {
    border-radius: 5px;
    height: 40px;

    // grid-column: minmax(500px, 900px);
    min-width: 500px;
    max-width: 900px;
    text-align: center;
    border-color: #fff;

    text-transform: uppercase;
    font-size: 20px;

    background: inherit;
    color: #fff;
  }
  a {
    text-transform: uppercase;
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    font-weight: 600;
  }
}
</style>