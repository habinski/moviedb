<template>
  <div class="about">
    <h1>Hi there</h1>
    <p>
      This is a non-commercial project based on
      <a href="https://www.themoviedb.org/faq/api">TMDB API</a>.
    </p>
    <p>
      You can read about TMDb following this
      <a href="https://www.themoviedb.org/about">link</a>.
    </p>

    <p class="alert">Website in alfa-version!</p>
  </div>
</template>
<script>
export default {
  mounted() {
    document.title = "About";
  }
};
</script>


<style lang="scss" scoped>
.about {
  margin: 50px 0;
  height: 35vh;
}
h1 {
  margin-top: 25vh;
  font-size: 50px;
  text-align: center;
  font-style: italic;
  margin-bottom: 20px;
  text-transform: uppercase;
}
p {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
a {
  font-weight: 600;
  text-decoration: none;
  color: black;
  transition: 0.3s;
  text-transform: uppercase;
  &:hover {
    color: rgb(83, 83, 83);
  }
}
.alert {
  color: rgb(214, 0, 0);
  text-transform: uppercase;
}
</style>

