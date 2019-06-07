<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.userName" :aria-placeholder="this.form.userName"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.userPwd" :aria-placeholder="this.form.userPwd"></el-input>
      </el-form-item>
      <el-form-item label="用户公司名称">
        <el-input v-model="form.userCompanyName" :aria-placeholder="this.form.userCompanyName"></el-input>
      </el-form-item>
      <el-form-item label="用户公司地址">
        <el-input v-model="form.userCompanyAddress" :aria-placeholder="this.form.userCompanyAddress"></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="form.userPhoneNumber" :aria-placeholder="this.form.userPhoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.userEmail" :aria-placeholder="this.form.userEmail"></el-input>
      </el-form-item>
      <el-form-item label="用户传真">
        <el-input v-model="form.userFax" :aria-placeholder="this.form.userFax"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button type="danger" @click="logOut">退出登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserMessage',
  data () {
    return {
      userName: sessionStorage.getItem('currentUser'),
      form: {
        userName: '',
        userPwd: '',
        userCompanyName: '',
        userCompanyAddress: '',
        userPhoneNumber: '',
        userEmail: '',
        userFax: '',
        _id: ''
      }
    }
  },
  beforeMount () {
    console.log(this.$store.state.user.currentUser)
    axios.post('userInformation/userFind', {
      userName: this.userName
    }).then(
      (response) => {
        let res = response.data
        this.form.userName = res.result.userName
        this.form.userPwd = res.result.userPwd
        this.form.userCompanyName = res.result.userCompanyName
        this.form.userCompanyAddress = res.result.userCompanyAddress
        this.form.userPhoneNumber = res.result.userPhoneNumber
        this.form.userEmail = res.result.userEmail
        this.form.userFax = res.result.userFax
        this.form._id = res.result._id
      }
    )
  },
  methods: {
    onSubmit () {
      axios.post('userInformation/userChange', {
        userName: this.form.userName,
        userPwd: this.form.userPwd,
        userCompanyName: this.form.userCompanyName,
        userCompanyAddress: this.form.userCompanyAddress,
        userPhoneNumber: this.form.userPhoneNumber,
        userEmail: this.form.userEmail,
        userFax: this.form.userFax,
        _id: this.form._id
      }).then((response) => {
        let res = response.data
        console.log(res)
      })
    },
    logOut () {
      sessionStorage.removeItem('currentUser')
      sessionStorage.removeItem('url')
      this.$store.dispatch('user/setUser')
      console.log(this.$store.state.user.currentUser)
      console.log(this.$store.state.user.isLogin)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
