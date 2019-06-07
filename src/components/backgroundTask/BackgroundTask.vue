<template>
  <div>
    <el-container>
      <el-header>
        <bg-header></bg-header>
      </el-header>
      <el-container>
        <el-aside>
          <bg-nav-menu></bg-nav-menu>
        </el-aside>
        <el-main>
          <bg-content><router-view></router-view></bg-content>
        </el-main>
      </el-container>
      <el-footer>
        <bg-footer></bg-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import BgHeader from './components/BgHeader'
import BgNavMenu from './components/BgNavMenu'
import BgContent from './components/BgContent'
import BgFooter from './components/BgFooter'
export default {
  name: 'BackgroundTask',
  components: {
    BgHeader,
    BgNavMenu,
    BgContent,
    BgFooter
  },
  mounted () {
    let url = sessionStorage.getItem('url')
    if (url) {
      if (url === '/') {
        this.$router.push({path: '/'})
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .title
    width 100%
  .center
    width 100%
</style>
