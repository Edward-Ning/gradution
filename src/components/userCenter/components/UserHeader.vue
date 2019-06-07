<template>
  <div class="wrapper">
    <div class="wrapper-title">
      个人中心
    </div>
    <div class="wrapper-user">
      <div class="wrapper-user-name">{{currentUser}}</div>
      <div class="quit-button">
        <el-button type="text" @click="quit">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHeader',
  data () {
    return {
      currentUser: sessionStorage.getItem('currentUser')
    }
  },
  methods: {
    quit () {
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
