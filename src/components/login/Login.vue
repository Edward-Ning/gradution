<template>
  <div class="wrapper">
    <div class="logo">
      <img class="wrapper-logo-img" src="../../assets/image/logo.png" height="200" width="200"/>
    </div>
    <div class="login">
      <div class="title">
        <router-link class="login-title" to="/login">登 陆</router-link>
        <b>·</b>
        <router-link
          class="register-title"
          :class="{ register_title_hover: active }"
          @mouseenter.native="enter"
          @mouseleave.native="leave"
          to="/register">
          注 册
        </router-link>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.login_account"
            class="login-account-input"
            placeholder="请输入邮箱或手机号"
            type="text"
          ></el-input>
          <el-input
            v-model="form.login_password"
            class="login-password-input"
            placeholder="请输入密码"
            type="password"
            v-if="pwdType"
          >
            <i slot="suffix" class="el-input__icon el-icon-close-eye" @click="showpassword"></i>
          </el-input>
          <el-input
            v-model="form.login_password"
            class="login-password-input"
            palceholder="请输入密码"
            type="text"
            v-else
          >
            <i slot="suffix" class="el-input__icon el-icon-open-eye" @click="hidepassword"></i>
          </el-input>
          <p
            class="errortip"
            v-show="errorTip"
          >请输入正确的账户名和密码</p>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            round
            class="login-button"
            @click="login"
          >
            登陆
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      active: false,
      form: {
        login_account: '',
        login_password: ''
      },
      pwdType: true,
      errorTip: false
    }
  },
  methods: {
    enter () {
      this.active = true
    },
    leave () {
      this.active = false
    },
    showpassword () {
      this.pwdType = false
    },
    hidepassword () {
      this.pwdType = true
    },
    login () {
      axios.post('userInformation/login', {
        userName: this.form.login_account,
        userPwd: this.form.login_password
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.errorTip = false
          console.log(res.result)
          sessionStorage.setItem('currentUser', res.result.userName)
          sessionStorage.setItem('isLogin', true)
          sessionStorage.setItem('url', res.result.url)
          this.$store.dispatch('user/setUser', res.result.userName)
          this.$store.dispatch('user/setPermission', res.result.url)
          // this.$store.dispatch('setToken', res.result.userPwd)
          console.log(this.$store.state.user.isLogin)
          console.log(this.$store.state.user.currentUser)
          console.log(this.$store.state.user.url)
          this.$router.push({path: res.result.url})
        } else {
          this.errorTip = true
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  b
    font-weight 700
    color: #959595
  .wrapper
    width 100%
    .logo
      margin-left 70px
      margin-top 40px
      width 70px
      height 70px
      margin-bottom 20px
      .wrapper-logo-img
        width 100%
        height 100%
        max-height 100%
        max-width 100%
    .login
      width 400px
      height 400px
      background-color #ffffff
      margin auto
      border-radius 10px
      box-shadow 0 0 10px 2px #e5e5e5
      text-align center
      .title
        width 100%
        padding-top 40px
        .login-title
          font-weight 700
          font-size 20px
          padding 10px
          border-bottom solid 2px #25a4bb
        .register-title
          font-weight 700
          font-size 20px
          color: #959595
          padding 10px
        .register_title_hover
          border-bottom solid 2px #25a4bb
      .login-account-input
        width 80%
        margin-top 60px
      .login-password-input
        width 80%
        margin-top 20px
      .errortip
        color red
        height 20px
      .login-button
        width 200px
        margin-top 50px
</style>
