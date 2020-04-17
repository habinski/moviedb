<template>
  <div class="main">
    <div class="back">
      <h1>{{info.name}}</h1>
      <div class="info-block">
        <img
          v-if="info.profile_path"
          :src="`https://image.tmdb.org/t/p/original/${info.profile_path}`"
        />
        <img src="@/assets//noimage.png" v-else />
        <div class="info">
          <p v-if="info.birthday">
            Birthday: {{new Date(info.birthday).toLocaleDateString('en-EN', options) }}
            <span
              v-if="!info.deathday"
            >({{Math.floor((new Date() - new Date(info.birthday)) / 3.154e+10 )}} years)</span>
          </p>
          <p v-if="info.deathday">
            Deathday: {{new Date(info.deathday).toLocaleDateString('en-EN', options) }}
            <span
              v-if="info.deathday"
            >({{Math.floor((new Date(info.deathday) - new Date(info.birthday)) / 3.154e+10)}} years)</span>
          </p>

          <p v-if="info.place_of_birth">Place of birth: {{info.place_of_birth}}</p>
          <p v-if="info.known_for_department">Known for department: {{info.known_for_department}}</p>

          <div class="biography" v-if="info.biography">
            <h5>biography</h5>
            <p>{{info.biography}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div :key="i" v-for="i in images">
      <img :src="`https://image.tmdb.org/t/p/original/${i.file_path}`" />
    </div>-->
    <div class="blocks">
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
              :href="`https://www.imdb.com/name/` + external_ids.imdb_id"
              v-if="external_ids.imdb_id"
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
          <div class="AlterTitles" v-if="info.also_known_as.length != 0  |  undefined">
            <h5>Also known as</h5>
            <hr />
            <p
              class="alterTitle"
              :key="also_known_as"
              v-for="also_known_as in info.also_known_as"
            >{{also_known_as}}</p>
          </div>
        </div>
      </div>
      <div class="right-block">
        <div v-if="movie_credits.cast.length != 0">
          <h1>Filmography</h1>
          <hr />
          <h2>Actor in {{movie_credits.cast.length}} movies</h2>
          <personCreditsBlock :credits="movie_credits.cast" media_type="movie" />
        </div>

        <div v-if="movie_credits.crew.length != 0">
          <h2>Crew in {{movie_credits.crew.length}} movies</h2>
          <personCreditsBlock :credits="movie_credits.crew" media_type="movie" />
        </div>

        <div v-if="tv_credits.cast.length != 0">
          <h2>Actor in {{tv_credits.cast.length}} serials</h2>
          <personCreditsBlock :credits="tv_credits.cast" media_type="tv" />
        </div>

        <div v-if="tv_credits.crew.length != 0">
          <h2>Crew in {{tv_credits.crew.length}} serials</h2>
          <personCreditsBlock :credits="tv_credits.crew" media_type="tv" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import similarBlock from "@/components/similarBlock";
import personCreditsBlock from "@/components/personCreditsBlock";

export default {
  data() {
    return {
      id: String,
      info: Object,
      images: Object,
      external_ids: Object,
      // combined_credits: Object,
      movie_credits: Object,
      tv_credits: Object,
      options: {
        year: "numeric",
        month: "long",
        day: "numeric"
      }
    };
  },
  components: { similarBlock, personCreditsBlock },
  methods: {
    async fetchFullInfo() {
      this.id = this.$route.params.id;
      this.media_type = this.$route.name.toLowerCase();
      this.info = await this.$store.dispatch("fetchFullInfo", {
        media_type: this.media_type,
        id: this.id
      });
      console.log(this.info);
      this.images = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "images"
      });
      document.title = this.info.name;
      this.images = this.images.profiles;
      console.log(this.images);

      this.external_ids = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "external_ids"
      });
      console.log(this.external_ids);

      this.movie_credits = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "movie_credits"
      });
      console.log("movie_credits");
      console.log(this.movie_credits);
      this.tv_credits = await this.$store.dispatch("fetchInfo", {
        media_type: this.media_type,
        id: this.id,
        get: "tv_credits"
      });
      console.log("tv_credits");
      console.log(this.tv_credits);
    }
  },

  mounted() {
    scroll(0, 0);
    this.fetchFullInfo();
  },
  watch: {
    $route(to, from) {
      this.fetchFullInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  display: grid;
  gap: 20px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "info-block info-block"
    "blocks blocks";
}
.back {
  background: #000;
  background: linear-gradient(
    90deg,
    rgba(88, 88, 88, 1) 0%,
    rgba(0, 0, 0, 1) 70%
  );
  color: rgb(255, 255, 255);

  h1 {
    font-size: 40px;
    color: #fff;
    padding-top: 30px;
    text-align: center;
    text-transform: uppercase;
  }
}
.info-block {
  display: grid;
  grid-area: "info-block";
  grid-template-columns: auto 1fr;
  padding: 50px 0 20px 0;
  gap: 20px;
  img {
    width: 400px;
    margin: 0 0 20px 20px;
  }
  p {
    font-size: 17px;
    margin-bottom: 10px;
  }
}
.biography {
  h5 {
    text-transform: uppercase;
    font-size: 23px;
    margin: 15px 0 10px 0;
  }
  p {
    margin-left: 10px;
    max-width: 900px;
    line-height: 25px;
  }
}
.blocks {
  display: grid;
  grid-area: blocks;
  grid-template-columns: 350px 1fr;
  gap: 20px;
  grid-template-areas: "left-block right-block";
}
.left-block {
  margin-top: 20px;
  grid-area: left-block;
}
.right-block {
  margin-top: 20px;
  grid-area: right-block;
  h1 {
    font-size: 25px;
    // text-transform: uppercase;
    // margin-bottom: 10px;
    // text-align: center;
  }
  h2 {
    width: 90%;
    font-size: 25px;
    text-align: center;
    margin-bottom: 20px;
  }
  hr {
    margin: 5px 0 15px 0;
    background-color: #000;
    width: 90%;
    height: 1px;
  }
}

.links-block {
  margin: 0 20px;
  grid-area: links;
  hr {
    margin: 5px 0 15px 0;
    background-color: #000;
    // width: 90%;
    height: 1px;
  }
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
.AlterTitles {
  margin-top: 15px;
  grid-area: AlterTitles;
  .alterTitle {
    font-size: 17px;
    color: rgb(95, 95, 95);
    text-align: center;
  }
}
@media (max-width: 1000px) {
  main {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    grid-template-areas:
      "info-block"
      "info-block"
      "blocks"
      "blocks";
  }
  .blocks {
    grid-template-columns: 1fr;
    gap: 20px;
    grid-template-areas: "left-block" "right-block";
  }
  .right-block {
    margin: 0 20px;
    hr {
      width: 100%;
    }
  }
  .info-block {
    grid-template-columns: 1fr;
    padding: 25px 0 20px 0;
    gap: 30px;
    text-align: center;
    img {
      justify-self: center;
      width: 90%;
      margin: 0;
    }
    .biography {
      width: 90%;
      margin: 15px 5%;
    }
  }
  h2 {
    width: 100%;
  }
}
</style>