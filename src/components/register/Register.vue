<template>
  <div class="wrapper">
    <div class="logo">
      <img class="wrapper-logo-img" src="../../assets/image/logo.png" height="200" width="200"/>
    </div>
    <div class="register">
      <div class="title">
        <router-link
          class="login-title"
          :class="{ login_title_hover: active }"
          @mouseenter.native="enter"
          @mouseleave.native="leave"
          to="/login">登 陆</router-link>
        <b>·</b>
        <router-link
          class="register-title"
          to="/register">
          注 册
        </router-link>
      </div>
      <el-form ref="registerForm" :model="form">
        <el-form-item>
          <el-input
            v-model="form.registerAccount"
            class="register-account-input"
            placeholder="请输入用户名"
            type="text"
          ></el-input>
          <el-input
            v-model="form.password"
            class="register-password-input"
            placeholder="请输入密码"
            type="password"
            v-if="pwdType"
          >
            <i slot="suffix" class="el-input__icon el-icon-close-eye" @click="showpassword"></i>
          </el-input>
          <el-input
            v-model="form.password"
            class="register-password-input"
            palceholder="请输入密码"
            type="text"
            v-else
          >
            <i slot="suffix" class="el-input__icon el-icon-open-eye" @click="hidepassword"></i>
          </el-input>
          <el-input
            v-model="form.passwordConfirm"
            class="register-password-input"
            placeholder="请确认密码"
            type="password"
            v-if="pwdType"
          >
            <i slot="suffix" class="el-input__icon el-icon-close-eye" @click="showpassword"></i>
          </el-input>
          <el-input
            v-model="form.passwordConfirm"
            class="register-password-input"
            palceholder="请确认密码"
            type="text"
            v-else
          >
            <i slot="suffix" class="el-input__icon el-icon-open-eye" @click="hidepassword"></i>
          </el-input>
        </el-form-item>
        <p
          class="errortip"
          v-show="errorTip"
        >两次输入密码不一致</p>
        <p
          class="errortip"
          v-show="errorTip2"
        >该用户已存在</p>
        <el-form-item>
          <el-button
            type="primary"
            round
            class="register-button"
            @click="submit"
          >
            注 册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Register',
  data () {
    return {
      active: true,
      pwdType: true,
      form: {
        registerAccount: '',
        password: '',
        passwordConfirm: ''
      },
      errorTip2: false
    }
  },
  computed: {
    errorTip: function () {
      if (this.form.password === this.form.passwordConfirm) {
        return false
      } else {
        return true
      }
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
    submit () {
      // console.log(this.errorTip)
      if (!this.errorTip) {
        axios.post('userInformation/register', {
          userName: this.form.registerAccount,
          userPwd: this.form.password
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            console.log('success')
            this.$router.push({path: '/login'})
          } else {
            console.log('fail')
            this.errorTip2 = true
          }
        })
      }
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
    .register
      width 400px
      height 450px
      background-color #ffffff
      margin auto
      border-radius 10px
      box-shadow 0 0 10px 2px #e5e5e5
      text-align center
      .title
        width 100%
        padding-top 40px
        .register-title
          font-weight 700
          font-size 20px
          padding 10px
          border-bottom solid 2px #25a4bb
        .login-title
          font-weight 700
          font-size 20px
          color: #959595
          padding 10px
        .login_title_hover
          border-bottom solid 2px #25a4bb
      .register-account-input
        width 80%
        margin-top 60px
      .register-password-input
        width 80%
        margin-top 20px
      .errortip
        color red
        height 20px
      .register-button
        width 200px
        margin-top 40px
</style>
