<template>
  <div>
    <el-container>
      <el-header>
        <user-header></user-header>
      </el-header>
      <el-container>
        <el-aside>
          <user-nav-menu></user-nav-menu>
        </el-aside>
        <el-main>
          <user-content><router-view></router-view></user-content>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import UserHeader from './components/UserHeader'
import UserNavMenu from './components/UserNavMenu'
import UserContent from './components/UserContent'
export default {
  name: 'userCenter',
  components: {
    UserHeader,
    UserNavMenu,
    UserContent
  }
}
</script>

<style scoped lang="stylus">
</style>
