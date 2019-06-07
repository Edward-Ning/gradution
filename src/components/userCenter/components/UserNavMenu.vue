<template>
  <div>
    <keep-alive>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
        <el-menu-item index="1"><span slot="title">个人中心</span></el-menu-item>
        <el-menu-item index="2"><span slot="title">订单管理</span></el-menu-item>
      </el-menu>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'UserNavMenu',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      let bgKey = ''
      switch (key) {
        case '1':
          bgKey = 'user-message'
          this.$store.dispatch('user/confirmBgKey', bgKey)
          console.log(this.$store.state.user.bgKey)
          break
        case '2':
          bgKey = 'user-order'
          this.$store.dispatch('user/confirmBgKey', bgKey)
          console.log(this.$store.state.user.bgKey)
          break
      }
    }
  }
}
</script>

<style scoped>

</style>
