<template>
  <div>
    <keep-alive>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect">
        <el-submenu index="1">
          <span slot="title">公司（产品）管理</span>
            <el-menu-item index="1-1">公司信息管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <span slot="title">员工资料管理</span>
          <el-menu-item index="2-1">员工基本信息管理</el-menu-item>
          <el-menu-item index="2-2">员工日生产信息</el-menu-item>
          <el-menu-item index="2-4">员工生产报表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <span slot="title">产品（半成品）管理</span>
          <el-menu-item index="3-1">产品报表</el-menu-item>
          <el-menu-item index="3-2">半成品报表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <span slot="title">设备管理</span>
          <el-menu-item index="4-1">设备基本信息</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <span slot="title">产品（半成品）生产流程管理</span>
          <el-menu-item index="5-1">产品生产流程管理</el-menu-item>
          <el-menu-item index="5-2">半成品生产流程管理</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <span slot="title">用户管理</span>
          <el-menu-item index="6-1">用户基本信息</el-menu-item>
          <el-menu-item index="6-2">用户订单信息</el-menu-item>
        </el-submenu>
      </el-menu>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'BgNavMenu',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      console.log(this.$store.state.company.bgKey)
      let bgKey = ''
      switch (key) {
        case '1-1':
          bgKey = 'company-message'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          break
        case '1-2':
          bgKey = 'company-product'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          break
        case '2-1':
          bgKey = 'staff-information'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '2-2':
          bgKey = 'staff-daily-production'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '2-4':
          bgKey = 'staff-production-report'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '3-1':
          bgKey = 'production-report'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '3-2':
          bgKey = 'semi-production-report'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '4-1':
          bgKey = 'device-information'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '5-1':
          bgKey = 'production-process'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '5-2':
          bgKey = 'semi-production-process'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '6-1':
          bgKey = 'user-information'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
        case '6-2':
          bgKey = 'user-order-information'
          this.$store.dispatch('company/confirmBgKey', bgKey)
          console.log(this.$store.state.company.bgKey)
          break
      }
      console.log(this.$store.state.company.bgKey)
    }
  }
}
</script>

<style scoped>

</style>
