<template>
  <div>
    <div class="type">
      <h1>What are you looking for?</h1>
      <button
        @click="media_type = 'movie'"
        v-bind:class="{ activeButton: media_type == 'movie' }"
      >Movies</button>
      <button
        @click="media_type = 'tv'"
        v-bind:class="{ activeButton: media_type == 'tv' }"
      >TV shows</button>
    </div>

    <div class="genres">
      <h1>What genres are you looking for?</h1>
      <p>
        <span
          :key="g.id"
          v-for="g in genres"
          @click="Push(g)"
          v-bind:class="{ activeButton: genresSelect(g) }"
        >{{g.name}}</span>
      </p>
    </div>
    <div class="section">
      <div class="min_vote">
        <h5>Minimum {{min_vote}}/10 rate</h5>
        <input v-model="min_vote" type="range" min="0" max="10" step="1" />
      </div>
      <div class="min_vote_count">
        <h5>minimum {{min_vote_count}} vote count</h5>
        <input v-model="min_vote_count" type="range" min="0" max="1000" step="10" />
      </div>

      <div class="timeInterval">
        <h5>Select years</h5>
        <div class="min-max_year">
          <div class="min_year">
            <p>From</p>
            <input v-model="min_year" placeholder="YYYY" type="number" />
          </div>

          <div class="max_year">
            <p>To</p>
            <input v-model="max_year" placeholder="YYYY" type="number" />
          </div>
        </div>
        <p
          v-if="min_year.length < 4 && max_year.length < 4"
        >Looking for {{media_type}} of all the time</p>
        <p
          v-if="min_year.length == 4 && min_year > 1896 && min_year < thisYear + 2 && max_year.length < 4"
        >Looking for {{media_type}} from 1 January, {{min_year}}</p>
        <p
          v-if="max_year.length == 4 && max_year > 1896 && max_year < thisYear + 2 && min_year.length < 4"
        >Looking {{media_type}} until December 31, {{max_year}}</p>
        <p
          class="error"
          v-if="min_year.length >= 4 && min_year < 1896 || max_year.length >= 4 && max_year < 1896 "
        >Year can't be less than 1896</p>
        <p
          class="error"
          v-if="min_year.length >= 4 && min_year > thisYear + 2 || max_year.length >= 4 && max_year > thisYear + 2 "
        >Year can't be more {{thisYear + 2}}</p>
        <p
          v-if="min_year.length == 4 && max_year.length == 4 && min_year < thisYear + 2 && min_year > 1896  && max_year < thisYear + 2 && max_year > 1896 "
        >Looking for {{media_type}} from January 1, {{min_year}} to December 31, {{max_year}}</p>
      </div>
    </div>
    <div class="sort">
      <h5>Sorted by</h5>
      <select v-model="sortType" v-if="media_type == 'movie'">
        <option value="popularity">popularity</option>
        <option value="release_date">release date</option>
        <option value="revenue">revenue</option>
        <option value="primary_release_date">primary release date</option>
        <option value="original_title">original title</option>
        <option value="vote_average">vote average</option>
        <option value="vote_count">vote count</option>
      </select>

      <select v-model="sortType" v-if="media_type == 'tv'">
        <option value="popularity">popularity</option>
        <option value="vote_average">vote average</option>
        <option value="first_air_date">first air date</option>
      </select>
      <p
        v-if="asc_desc == 'asc'"
        @click="asc_desc == 'asc' ? asc_desc = 'desc' : asc_desc = 'asc'"
      >↑</p>
      <p
        v-if="asc_desc == 'desc'"
        @click="asc_desc == 'asc' ? asc_desc = 'desc' : asc_desc = 'asc'"
      >↓</p>
    </div>
    <div class="grid">
      <trendItem :key="trend.id" :type="media_type" :trend="trend" v-for="trend in result.results" />
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
export default {
  components: {
    trendItem
  },
  data() {
    return {
      genres: Object,
      genre: Object,
      genreList: [],
      media_type: "movie",
      min_vote: 7,
      min_vote_count: 10,
      page: 1,
      countries: Object,
      selectRegion: "World",
      ButtonActive: true,
      max_year: "",
      min_year: "",
      thisYear: Number,
      sort_by: "popularity.desc",
      generString: "28",
      result: Object,
      sortType: "popularity",
      asc_desc: "desc"
    };
  },
  methods: {
    async fetchGenres(media_type) {
      this.genres = await this.$store.dispatch("fetchGenre", {
        media_type: this.media_type
      });
      this.genres = this.genres.genres;
      // console.log(this.genres);
    },
    async getCoutries() {
      this.countries = await this.$store.dispatch("fetchCountries");
    },
    Push(g) {
      for (let a = 0; a <= this.genreList.length; a++) {
        // console.log(a);
        let el = this.genreList[a];
        if (el == g) {
          // console.log("mathing is true");
          this.genreList.splice(a, 1);
          break;
        }
        if (a >= this.genreList.length) {
          // console.log("no matthing");
          this.genreList.push(g);
          break;
        }
      }
      console.log(this.genreList);
    },
    genresSelect(g) {
      for (let a = 0; a < this.genreList.length; a++) {
        const el = this.genreList[a];
        if (g.id === el.id) {
          // console.log(g.id === el.id);
          return true;
        }
      }
    },
    async discover(
      media_type,
      sort_by,
      page,
      min_year,
      max_year,
      vote_count,
      vote_average,
      geners
    ) {
      min_year != "" ? (min_year += "-01-01") : (min_year = "");
      max_year != "" ? (max_year += "-12-31") : (max_year = "");
      console.log(min_year);
      this.result = await this.$store.dispatch("discover", {
        media_type: media_type,
        sort_by: sort_by,
        page: page,
        min_year: min_year,
        max_year: max_year,
        vote_count: vote_count,
        vote_average: vote_average,
        geners: geners
      });

      console.log(this.result.results);
    }
  },

  created() {
    document.title = "Discover";
    this.fetchGenres(this.media_type);
    this.getCoutries();
    this.thisYear = new Date();
    this.thisYear = this.thisYear.getFullYear();

    this.discover(
      this.media_type,
      this.sort_by,
      this.page,
      this.min_year,
      this.max_year,
      this.min_vote_count,
      this.min_vote,
      this.generString
    );
  },
  watch: {
    media_type: function(media_type) {
      this.fetchGenres(this.media_type);
      this.genreList = [];
      this.sortType = "popularity";
      this.asc_desc = "desc";
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    // sort_by: function() {
    //   this.discover(
    //     this.media_type,
    //     this.sort_by,
    //     this.page,
    //     this.min_year,
    //     this.max_year,
    //     this.min_vote_count,
    //     this.min_vote,
    //     this.generString
    //   );
    // },
    page: function() {
      scroll(0, 0);
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },

    max_year: function() {
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    min_year: function() {
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    min_vote_count: function() {
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    min_vote: function() {
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },

    genreList: function() {
      this.generString = "";
      for (let i = 0; i <= this.genreList.length; i++) {
        if (i == 0) {
          this.generString += this.genreList[i].id;
        } else this.generString += "," + this.genreList[i].id;
        console.log(this.generString);
      }
    },
    generString: function() {
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    asc_desc: function() {
      this.sort_by = this.sortType + "." + this.asc_desc;
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    },
    sortType: function() {
      this.sort_by = this.sortType + "." + this.asc_desc;
      this.discover(
        this.media_type,
        this.sort_by,
        this.page,
        this.min_year,
        this.max_year,
        this.min_vote_count,
        this.min_vote,
        this.generString
      );
    }
  }
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 30px;
  color: #000;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 25px;
}
.type {
  text-align: center;
  margin-bottom: 25px;
}
button {
  border: none;
  background-color: rgb(201, 201, 201);
  padding: 20px;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  text-transform: uppercase;
  transition: 0.3s;
}

.activeButton {
  background-color: #000;
  color: #fff;
}
.genres {
  text-align: center;
  span {
    cursor: pointer;
    user-select: none;
    display: inline-block;
    margin: 5px;
    background-color: #cfcfcf;
    padding: 5px;
    color: rgb(0, 0, 0);
    border-radius: 5px;
    transition: 0.3s;
  }
  .activeButton {
    background-color: #000;
    color: #fff;
  }
}

.section {
  margin: 50px 50px 0;
  // background-color: red;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  h5 {
    text-align: center;
    text-transform: uppercase;
    font-size: 20px;
    margin-bottom: 5px;
  }

  .region {
    display: grid;
    justify-content: center;
    align-content: center;
    display: none;
  }
  .timeInterval {
    .min-max_year {
      display: grid;
      grid-template-columns: 100px 100px;
      justify-content: center;
      gap: 7px;
    }

    p {
      margin-top: 5px;
      text-align: center;
    }
    .error {
      font-weight: 600;
      color: #af0000;
      text-transform: uppercase;
    }
    display: grid;
    justify-content: center;
    align-content: center;
    input {
      width: 100px;
      text-align: center;
      background: inherit;
      border: 3px solid #000;
      border-radius: 5px;
      height: 25px;
      font-size: 20px;
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
  .min_vote {
    display: grid;
    justify-content: center;
    align-content: center;
  }

  .min_vote_count {
    display: grid;
    justify-content: center;
    align-content: center;
  }
  /// sliders
  input[type="range"] {
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
  }
  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    // animate: 0.2s;
    // box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #cfcfcf;
    border-radius: 50px;
    // border: 0px solid #000101;
  }
  input[type="range"]::-webkit-slider-thumb {
    // box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 2px solid #000000;
    height: 25px;
    width: 25px;
    border-radius: 50px;
    background: #cfcfcf;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -9px;
  }
  // input[type="range"]:focus::-webkit-slider-runnable-track {
  //   background: #ac51b5;
  // }

  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 7px;
    cursor: pointer;
    // animate: 0.2s;
    // box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: #cfcfcf;
    border-radius: 50px;
    // border: 0px solid #000101;
  }
  input[type="range"]::-moz-range-thumb {
    // box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 2px solid #000000;
    height: 25px;
    width: 25px;
    border-radius: 50px;
    // background: #000000;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -9px;
  }
}

.sort {
  font-size: 25px;
  margin: 50px 0 30px;
  text-align: center;
  text-transform: uppercase;
  select {
    text-align: center;
    text-transform: uppercase;
    margin: 0 5px;
    border: 3px solid #000;
    border-radius: 5px;
    background-color: inherit;
    font-weight: 600;
    font-size: 20px;
    width: 280px;
    cursor: pointer;
    option {
      font-size: 15px;
      text-align: center;
    }
  }
  h5 {
    display: inline-block;
  }
  p {
    font-size: 20px;
    margin-left: 5px;
    color: #ffffff;
    background-color: #000;
    padding: 4px 20px;
    height: 100%;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-template-rows: repeat(5, auto);
  grid-gap: 35px;
  margin: 50px 35px 0;
  min-height: 100vh;
}
.pageButton {
  background: inherit;
  font-size: 25px;
  border: none;
}
@media (max-width: 1300px) {
  .grid {
    grid-template-columns: 1fr;
    margin: 0 15px;
  }
  .section {
    grid-template-columns: 1fr;
    gap: 50px;
  }
}
</style>