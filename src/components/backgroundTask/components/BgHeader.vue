<template>
  <div class="wrapper">
    <div class="wrapper-title">
      公司后台管理界面
    </div>
    <div class="wrapper-user">
      <div class="wrapper-user-name">[管理员]</div>
      <div class="quit-button">
        <el-button type="text" @click="quit">退出</el-button>
      </div>
      <div class="quit-button">
        <el-button type="text" @click="logOut">注销</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BgHeader',
  methods: {
    quit () {
      this.$router.push({path: '/'})
    },
    logOut () {
      sessionStorage.removeItem('currentUser')
      sessionStorage.removeItem('url')
      this.$store.dispatch('user/setUser')
      console.log(this.$store.state.user.currentUser)
      console.log(this.$store.state.user.isLogin)
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped lang="stylus">
  .wrapper
    overflow hidden
    width 100%
    .wrapper-title
      float: left
      font-size 30px
      line-height 60px
    .wrapper-user
      float: right
      .wrapper-user-name
        float: left
        line-height 60px
        margin-right 10px
      .quit-button
        float: left
        line-height 60px
</style>
