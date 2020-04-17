<template>
  <div class="block">
    <h2>Videos</h2>
    <hr />
    <div class="trailers">
      <div :key="video.id" v-for="video in videos" class="trailer">
        <iframe
          :src="`https://www.${video.site}.com/embed/${video.key}?list=${video.id}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h5>{{video.type}}: {{video.name}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    videos: {}
  }
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 25px;
  font-weight: 600;
  padding: 0 5px;
}
hr {
  margin: 5px 0 15px 0;

  background-color: #000;
  width: 90%;
  display: grid;
  justify-items: center;
  height: 1px;
}
.trailers {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 10px;
  .trailer {
    margin-top: 10px;
    text-align: center;
    // &:nth-child(even) {
    //   margin-right: 25px;
    // }
    h5 {
      color: #000;
      font-size: 17px;
    }
  }
}
iframe {
  width: 100%;
  height: calc((72vh / 16) * 9);
  border-radius: 5px;
  background-color: #000;
}
@media (max-width: 1000px) {
  .block {
    display: none;
    // margin: 0 10px;
    // width: calc(100% - 20px);
    display: grid;
    // align-self: center;
  }
  .trailers {
    grid-template-columns: 1fr;
    // margin-left: 10px;
    justify-items: center;
    // .trailer {
    // width: 59vh;
    // &:nth-child(even) {
    //   margin-right: 0px;
    // }
    // }
    iframe {
      align-self: center;
      width: 320px;
      height: calc((300px / 16) * 9);
    }
  }
}
</style>
