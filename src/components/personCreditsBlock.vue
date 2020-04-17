<template>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Character</th>
        <th>Release</th>
        <th>★</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="c.name" v-for="c in credits">
        <td>
          <router-link :to=" '/'+ media_type +'/' + c.id">{{c.original_title || c.original_name }}</router-link>
        </td>
        <td>
          <router-link :to=" '/' + media_type +'/' + c.id">{{c.character || c.job}}</router-link>
        </td>
        <td>
          <router-link
            :to=" '/' + media_type +'/' + c.id"
            v-if="c.release_date ||c.first_air_date"
          >{{new Date(c.release_date ||c.first_air_date).toLocaleDateString('en-EN', options) }}</router-link>
        </td>
        <td>
          <router-link :to=" '/'+ media_type +'/' + c.id">
            <span v-if="c.vote_count != 0">{{c.vote_average}}</span>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      options: {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      }
    };
  },
  props: {
    credits: Array,
    media_type: String
  }
};
</script>

<style lang="scss" >
table {
  width: 90%;
  // border-collapse: collapse;
  margin-bottom: 50px;
}
th,
td {
  border-bottom: 1px solid #ddd;
}
td a {
  text-decoration: none;
  color: #000;
  //   width: 500px;
  &:hover {
    color: rgb(105, 105, 105);
  }
}
th {
  font-weight: 600;
  font-size: 20px;
  color: rgb(110, 110, 110);
  padding-bottom: 10px;
  width: calc(100% / 3);
  text-transform: uppercase;
}
tr {
  text-align: center;
  height: 25px;
  &:hover {
    background-color: #dddddd;
  }
}
@media (max-width: 1000px) {
  table {
    width: 100%;
  }
}
</style>