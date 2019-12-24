<template>
  <div>
    <h1>about</h1>
    <h1>{{news.title}}</h1>
    <p>{{news.content}}</p>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch('getNews')
  },
  computed: {
    news() {
      return this.$store.state.news
    }
  }
}
</script>