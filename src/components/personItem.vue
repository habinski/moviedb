<template>
  <router-link :to="{ path: '/person/'+ p.id}">
    <img v-if="p.profile_path" :src="`https://image.tmdb.org/t/p/w400/${p.profile_path}`" />

    <img src="@/assets//noimage.png" v-else />
    <h1>{{p.name}}</h1>
  </router-link>
</template>

<script>
export default {
  props: {
    people: {},
    p: Object,
    type: String
  }
};
</script>

<style lang="scss" scoped>
// a {
//   display: grid;
//   align-items: center;
//   justify-items: center;
//   transition: 0.2s ease;
//   text-decoration: none;
//   filter: contrast(50%);
//   &:hover {
//     img {
//       filter: contrast(100%);
//     }
//   }
// }
// h1 {
//   transition: 0.2s ease;
//   // opacity: 0;
//   text-shadow: 1px 1px 2px black;
//   font-size: 40px;
//   display: flex;
//   //   align-items: center;
//   color: white;
//   mix-blend-mode: normal;
//   z-index: 1;
// }
a {
  margin-top: 15px;

  text-decoration: none;
  &:hover {
    img {
      // transition: 0.5s ease-in-out;
      filter: grayscale(0);
    }
  }
}
img {
  //   width: 400px;
  //   height: 600px;
  //   filter: grayscale(100%);
  transition: 0.5s ease;
  filter: grayscale(50%);
  background-size: cover;
  width: 100%;
  height: auto;
  border-radius: 5px;
}
h1 {
  color: #000;
  text-align: center;
  font-size: 25px;
}
</style>