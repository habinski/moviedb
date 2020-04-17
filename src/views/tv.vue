<template>
  <div class="main">
    <div
      class="main-info"
      v-bind:style="{ 'background-image': 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/' + info.backdrop_path + ')'  }"
    >
      <img
        v-if="info.poster_path"
        class="poster"
        :src="`https://image.tmdb.org/t/p/w500/${info.poster_path}`"
      />
      <img class="poster" v-else src="@/assets//noimage.png" />
      <div class="titles">
        <h1>{{info.name}}</h1>
        <!-- <h2>{{info.tagline}}</h2> -->
      </div>
      <div class="info">
        <p class="genres" v-if="info.genres[0]">
          Genres:
          <span class="genre" :key="genre.id" v-for="genre in info.genres">{{genre.name}}</span>
        </p>
        <p v-if="info.created_by">
          Producer:
          <span class="producers" :key="c.id" v-for="c in info.created_by">
            <router-link :to=" '/person/' + c.id">{{c.name}}</router-link>
          </span>
        </p>
        <p>Number of seasons: {{info.number_of_seasons}} ({{info.number_of_episodes}} episodes)</p>
        <p>
          First episode in {{new Date(info.first_air_date).toLocaleDateString('en-EN', options) }}
          <span
            v-if="info.in_production"
          >- present time</span>
        </p>
        <p
          v-if="info.last_air_date"
        >Last air date {{new Date(info.last_air_date).toLocaleDateString('en-EN', options) }}</p>
        <p
          v-if="info.next_episode_to_air !== null "
        >Next episode to air in {{new Date(info.next_episode_to_air.air_date).toLocaleDateString('en-EN', options) }}</p>
        <p v-if="info.episode_run_time">
          Runtime:
          <span v-for="c in info.episode_run_time" :key="c">{{c}}</span> minutes
        </p>

        <div class="overview_div" v-if="info.overview">
          <p>
            <b>Overview</b>
          </p>
          <p>{{info.overview}}</p>
        </div>
        <div class="vote">
          <p>
            <b>{{info.vote_average}}/10</b>
            ({{info.vote_count}} votes)
          </p>
        </div>
        <div class="company-logos" v-if="info.production_companies[0] != undefined">
          <div :key="company.id" v-for="company in info.production_companies" :title="company.name">
            <img
              v-if="company.logo_path"
              :src="`https://image.tmdb.org/t/p/w200/${company.logo_path}`"
            />
            <p v-else>{{company.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="left-block">
      <div class="links-block">
        <h5>Links</h5>
        <hr />
        <div class="links">
          <a target="_blank" :href="info.homepage" v-if="info.homepage">
            <img src="@/assets/homepage.svg" alt="Homepage" />
          </a>
          <a
            target="_blank"
            :href="`https://www.imdb.com/title/` + info.imdb_id"
            v-if="info.imdb_id"
          >
            <img src="@/assets/iMDB.svg" alt="IMDB acount" />
          </a>
          <a
            target="_blank"
            :href="`https://www.facebook.com/` + external_ids.facebook_id"
            v-if="external_ids.facebook_id != null"
          >
            <img src="@/assets/facebook.svg" alt="Facebook" />
          </a>
          <a
            target="_blank"
            :href="`https://www.instagram.com/` + external_ids.instagram_id"
            v-if="external_ids.instagram_id != null"
          >
            <img src="@/assets/instagram.svg" alt="Instagram" />
          </a>
          <a
            target="_blank"
            :href="`https://www.twitter.com/` + external_ids.twitter_id"
            v-if="external_ids.twitter_id != null"
          >
            <img src="@/assets/twitter.svg" alt="Twitter" />
          </a>
        </div>
        <div class="AlterTitles" v-if="fetchAlterTitles[0] != undefined">
          <h5>Alternative Titles</h5>
          <hr />
          <p
            class="alterTitle"
            :key="alterTitles.iso_3166_1"
            v-for="alterTitles in fetchAlterTitles"
          >{{alterTitles.title}}</p>
        </div>
        <div class="keywords" v-if="keywords[0] != undefined">
          <h5>Keywords</h5>
          <hr />
          <p class="keyword" :key="keyword.id" v-for="keyword in keywords">{{keyword.name}}</p>
        </div>
      </div>
    </div>
    <div class="right-block">
      <videosBlock class="videos section" :videos="videos" v-if="videos[0] != undefined" />
      <creditsBlock class="creditsBlock section" :credits="credits" />
      <reviewsBlock
        class="reviewsBlock section"
        :id="id"
        :media_type="media_type"
        :reviews="reviews"
      />
      <similarBlock
        :media_type="media_type"
        :similar="similar"
        v-if="similar[0] != undefined"
        class="similarBlock section"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import videosBlock from "@/components/videosBlock";
import reviewsBlock from "@/components/reviewsBlock";
import creditsBlock from "@/components/creditsBlock";
import similarBlock from "@/components/similarBlock";

export default {
  data() {
    return {
      info: [],
      id: String,
      media_type: String,
      external_ids: [],
      fetchInfo: [],
      videos: [],
      fetchAlterTitles: [],
      keywords: [],
      reviews: Object,
      credits: Object,
      similar: Object,
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    };
  },
  components: {
    videosBlock,
    reviewsBlock,
    creditsBlock,
    similarBlock
  },
  methods: {
    async fetchFullInfo(media_type, id) {
      this.info = await this.$store.dispatch("fetchFullInfo", {
        media_type: this.media_type,
        id: this.id
      });
      document.title = this.info.name;

      this.reviews = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "reviews"
      });

      this.external_ids = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "external_ids"
      });

      this.credits = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "credits"
      });

      console.log(this.credits);
      this.fetchInfo = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "videos"
      });

      console.log(this.fetchInfo);
      this.videos = this.fetchInfo.results;

      console.log(this.info);
      this.fetchAlterTitles = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "alternative_titles"
      });
      this.fetchAlterTitles = this.fetchAlterTitles.titles;

      this.keywords = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "keywords"
      });
      this.keywords = this.keywords.keywords;

      this.similar = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "similar"
      });
      this.similar = this.similar.results;
      console.log(this.similar);
    }
  },
  async mounted() {
    scroll(0, 0);
    this.id = this.$route.params.id;
    this.media_type = this.$route.name.toLowerCase();
    this.fetchFullInfo(this.media_type, this.id);
  },

  watch: {
    $route(to, from) {
      this.id = this.$route.params.id;
      this.media_type = this.$route.name.toLowerCase();
      scroll(0, 0);
      this.fetchFullInfo(this.media_type, this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  gap: 20px;
  grid-template-columns: 350px 1fr;
  grid-template-areas:
    "main-info main-info"
    "main-info main-info"
    "left-block right-block";
}

.right-block {
  // overflow: hidden;
  display: grid;
  grid-area: right-block;
  // grid-template-rows: ;

  // margin-right: 100px;
  grid-template-areas:
    "videos"
    "credits"
    "reviews";
}
.creditsBlock {
  grid-area: credits;
}
.left-block {
  grid-area: left-block;
}
//  "links videos"
//     "AlterTitles reviews"
//     "keywords empty";
.main-info {
  background: linear-gradient(90deg, rgb(88, 88, 88) 0%, #00000000 70%);
  grid-area: main-info;
  background-size: cover;
  display: grid;
  grid-template-columns: 450px 1fr;
  grid-template-areas:
    "titles titles"
    "poster info";
}
hr {
  margin-top: 5px;
  background-color: #000;
  width: 100%;
  display: grid;
  justify-items: center;
  height: 1px;
}
.links-block {
  margin: 0 20px;
  grid-area: links;

  .links {
    display: grid;
    grid-area: links;
    font-size: 20px;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
  }
  h5 {
    font-size: 25px;
  }
  a {
    display: grid;
    justify-items: center;
    align-items: center;
    margin: 10px 0;
    background-color: #000;
    width: 50px;
    height: 50px;
    color: #fff;
    border-radius: 5px;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.3s;
    font-style: bold;
    &:hover {
      background-color: rgb(56, 56, 56);
    }
  }
}
.videos {
  grid-area: videos;
}
.AlterTitles {
  margin-top: 15px;
  grid-area: AlterTitles;
  .alterTitle {
    font-size: 17px;
    color: rgb(95, 95, 95);
    text-align: center;
  }
}
.keywords {
  margin-top: 15px;
  grid-area: keywords;
  .keyword {
    font-size: 17px;
    color: rgb(95, 95, 95);
    text-align: center;
    &::first-letter {
      text-transform: capitalize;
    }
  }
}
.reviewsBlock {
  grid-area: reviews;
}
.titles {
  grid-area: titles;
  font-size: 25px;
  color: #fff;
  margin-top: 25px;
  text-align: center;
  text-transform: uppercase;

  h2 {
    font-size: 15px;
  }
}
.poster {
  width: 400px;
  margin: 50px 0 20px 20px;
  // position: absolute;
  grid-area: poster;
  // margin-top: 25vh;
}
.overview_div {
  margin-top: 15px;
  p {
    max-width: 800px;
    margin-right: 25px;
  }
}
p {
  color: #fff;
  font-size: 18px;
  b {
    font-size: 25px;
  }
  &:not(:first-child) {
    margin-top: 10px;
  }
}
.info {
  margin-top: 50px;
  grid-area: info;
  span {
    font-weight: 600;
  }
  span:not(:last-child):not(.producers):after {
    content: ", ";
  }
  a {
    text-decoration: none;
    color: #ffffff;
    transition: 0.3s;
    &:hover {
      color: rgb(179, 179, 179);
    }
  }
}
.company-logos {
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  img {
    margin-top: 20px;
    filter: invert(100%);
    height: 40px;
    width: auto;
    margin-right: 15px;
  }
  p {
    margin-top: 20px;
    margin-right: 15px;
    font-weight: 800;
    text-transform: uppercase;
  }
}
.vote {
  margin-top: 15px;
}
.section {
  margin-bottom: 50px;
  margin-right: 100px;
}
@media (max-width: 1200px) {
  h1 {
    font-size: 45px;
  }
  .links-block {
    width: 90%;
    margin: 0 5%;
  }
  .main {
    grid-template-columns: 1fr;
    grid-template-areas:
      "main-info"
      "left-block"
      "right-block";
    margin-bottom: 50px;
    align-items: center;
  }
  .right-block {
    display: grid;
    grid-area: right-block;
    // grid-template-rows: ;
    grid-template-areas:
      "videos"
      "credits"
      "reviews";
    margin-right: 0;
    // margin: 0 10px;
    // width: 90%;
  }
  .left-block {
    .keywords,
    .AlterTitles {
      display: none;
    }
    hr {
      width: 90%;
    }
  }
  .section {
    display: grid;
    margin: 25px 5%;
  }
  .main-info {
    grid-template-columns: 1fr;
    grid-template-areas:
      "titles"
      "poster"
      "info";
  }
  p {
    font-size: 16px;
    text-align: center;
    span {
      font-weight: 400;
    }
  }
  .poster {
    //1111111
    width: 80%;
    margin: 10px 50px;
    justify-self: center;
    // margin: 50px;
  }
  .overview_div,
  .info {
    width: 90%;
    margin: 15px 5%;
    p {
      width: 100%;
    }
  }
  .company-logos {
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    justify-items: center;
    margin-bottom: 20px;
    img {
      // text-align: center;
      margin-right: 0;
    }
    // .info {
    //   width: 90%;
    // }
  }
}
</style>