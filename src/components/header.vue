<template>
  <header>
    <router-link to="/" class="logo">
      <img src="@/assets/logo.svg" alt="Logo" />
    </router-link>
    <div class="search">
      <select v-model="searchtype">
        <option value="multi">all</option>
        <option value="person">people</option>
        <option value="tv">TV Shows</option>
        <option value="movie">movies</option>
      </select>
      <input v-model="search" type="text" placeholder="Search" @mouseover="divResShow = true" />
      <div
        @mouseleave="divResShow = false"
        v-if="search.length != 0 && divResShow == true"
        class="divRes"
      >
        <div v-if="searchtype == 'multi'">
          <router-link
            :key="result.id"
            v-for="result in searchResult"
            :to=" '/' + result.media_type + '/' + result.id"
          >
            <p>
              {{result.name || result.original_title}}
              <span>{{result.release_date || result.first_air_date}}</span>
            </p>
          </router-link>
        </div>

        <div v-else>
          <router-link
            :key="result.id"
            v-for="result in searchResult"
            :to=" '/' + searchtype + '/' + result.id"
          >
            <p>
              {{result.name || result.original_title}}
              <span>{{result.release_date || result.first_air_date}}</span>
            </p>
          </router-link>
        </div>
        <p class="search-error" v-if="!searchResult[0]">No results found</p>
      </div>
    </div>
    <router-link class="item-Home" to="/">Home</router-link>
    <router-link class="item-Discover" to="/discover">Discover</router-link>
    <router-link class="item-Movies" to="/movie">Movies</router-link>
    <router-link class="item-Shows" to="/tv">TV Shows</router-link>
    <router-link class="item-People" to="/person">People</router-link>

    <button
      class="butter"
      @click="butterMenuShow == true ? butterMenuShow = false : butterMenuShow = true"
    >
      <img src="@/assets/burger.svg" alt />
      <div class="butter-menu-items" v-if=" butterMenuShow == true">
        <p>
          <router-link to="/">Home</router-link>
        </p>
        <p>
          <router-link to="/discover">Discover</router-link>
        </p>
        <p>
          <router-link to="/movie">Movies</router-link>
        </p>
        <p>
          <router-link to="/tv">TV Shows</router-link>
        </p>
        <p>
          <router-link to="/person">People</router-link>
        </p>
      </div>
    </button>
  </header>
</template>

<script>
import selectRegion from "@/components/selectRegion";
export default {
  data: () => {
    return {
      search: "",
      searchResult: [],
      divResShow: true,
      searchtype: "multi",
      butterMenuShow: false,
      result: Array
    };
  },
  methods: {
    async getSearchResult(search, searchtype) {
      console.log(search);
      this.searchResult = await this.$store.dispatch("fetchSearch", {
        search: this.search,
        searchtype: this.searchtype
      });
      this.searchResult = this.searchResult.results;
      console.log(this.searchResult);
    },
    hideDivRes() {
      alert("mouse over");
    }
  },
  watch: {
    search: function(search, searchtype) {
      if (search != 0) {
        search = search.trim().replace(/ /g, "+");
        this.getSearchResult(this.search, this.searchtype);
        this.result.release_date.spice || this.result.first_air_date.spice;
      } else if (search.length === 0) {
        let a = document.getElementsByClassName("divRes");
        a.innerHTML = "color: white";
      }
    },
    searchtype: function() {
      this.getSearchResult(this.search, this.searchtype);
    }
  },
  components: {
    selectRegion
  }
};
</script>

<style lang="scss" scoped>
header {
  grid-template-columns: 100px minmax(300px, 100%) repeat(5, 110px);
  grid-template-areas: "logo search item-Home item-Discover item-Movies item-Shows item-People";
  background-color: #131313;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  display: grid;
  grid-template-rows: 75px;
  align-items: center;
  justify-items: center;
  margin-bottom: 0px;
  grid-gap: 10px;
  .logo {
    grid-area: logo;
    // width: 100%;
    img {
      display: grid;
      width: 90%;
      height: 90%;
      // margin-right: 5%;
      margin-left: 7px;
    }
    opacity: 0.7;
    transition: 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
  ::placeholder {
    text-transform: initial;
  }
  .search {
    grid-area: search;
    width: 100%;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 2px;
    select {
      align-self: center;
      height: 35px;
      width: auto;
      text-transform: uppercase;
      border-radius: 5px 0px 0px 5px;
      border: none;
      color: #838383;
      background: #000000;

      text-align-last: center;

      option {
        color: #fff;
        text-transform: capitalize;
        font-size: 17px;
      }
    }
    select.decorated option:hover {
      box-shadow: 0 0 10px 100px #1882a8 inset;
    }
    input {
      border-radius: 0px 5px 5px 0px;
      height: 35px;

      // grid-column: minmax(0, 40%);
      width: 100%;
      text-align: center;
      border: none;
      text-transform: capitalize;
      font-size: 20px;
      background: inherit;
      color: #fff;
      background-color: #000000;
    }
  }
  .item-Home {
    grid-area: item-Home;
  }
  .item-Discover {
    grid-area: item-Discover;
  }
  .item-Movies {
    grid-area: item-Movies;
  }
  .item-Shows {
    grid-area: item-Shows;
  }
  .item-People {
    grid-area: item-People;
  }

  .divRes {
    display: block;
    margin-top: 25px;
    background: #000000;
    padding: 10px;
    border-radius: 25px 0px 0px 25px;
    position: absolute;
    z-index: 4;
    min-width: 10px;
    width: auto;
    min-height: 100px;
    max-height: 400px;
    overflow-y: scroll;
    .search-error {
      display: grid;
      text-align: center;
      color: #ffffff;
      tab-size: 25px;
      text-transform: uppercase;
      margin-top: 50px;
    }
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
  a {
    text-transform: uppercase;
    font-size: 20px;
    text-decoration: none;
    color: #fff;
    font-weight: 600;
    opacity: 0.7;
    transition: 0.3s ease;
    &:hover {
      opacity: 1;
    }
  }
  .butter {
    display: none;
    grid-area: butter;
    background-color: initial;
    border: none;
    color: #fff;
    .butter-menu-items {
      position: absolute;
      right: 0;
      background: #131313;
      border-radius: 10px;
      width: 200px;
      border: 5px solid #000;
      z-index: 5;
      p {
        margin: 50px 0;
      }
      img {
        display: grid;
        justify-content: center;
        width: auto;
      }
    }
  }
}

@media (max-width: 1000px) {
  header {
    grid-template-columns: 60px minmax(0, 1000px) 60px;
    grid-template-areas: "logo search butter";
    .item-Home {
      display: none;
    }
    .item-Discover {
      display: none;
    }
    .item-Movies {
      display: none;
    }
    .item-Shows {
      display: none;
    }
    .item-People {
      display: none;
    }

    .butter {
      display: block;
    }
  }
}
</style>