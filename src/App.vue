<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <HeaderNav />
    <!-- </div> -->
    <router-view />
    <Footer />
  </div>
</template>
<script>
import HeaderNav from "@/components/header";
import Footer from "@/components/footer";
import store from "./store";

export default {
  components: {
    HeaderNav,
    Footer
  },

  async mounted() {
    // this.$store.dispatch("fetchTrends");
  }
};
</script>
<style lang="scss">
* {
  font-family: "Libre Franklin", sans-serif;
  margin: 0;
  padding: 0;
}
body {
  background-color: rgb(248, 248, 248);
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #000;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(187, 187, 187);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
