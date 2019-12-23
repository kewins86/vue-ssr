<template>
  <ul>
    <li v-for="blog in blogList" :key="blog.id">
      <h2>{{blog.name}}</h2>
    </li>
  </ul>
</template>

<script>
export default {
  asyncData( { store }) {
    return store.dispatch('getList')
  },

  computed: {
    blogList() {
      return this.$store.state.blogList
    }
  }
}
</script>