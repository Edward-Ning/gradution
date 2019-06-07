<template>
  <div>
    <home-swiper></home-swiper>
    <home-introduction></home-introduction>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeSwiper from './components/HomeSwiper'
import HomeIntroduction from './components/HomeIntroduction'
import HomeFooter from './components/HomeFooter'
export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeIntroduction,
    HomeFooter
  }
}
</script>

<style scoped>

</style>
