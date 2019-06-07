<template>
  <div class="wrapper">
    <div class="wrapper-header">
        <div class="wrapper-logo">
          <img class="wrapper-logo-img" src="@/assets/image/logo.png">
        </div>
        <router-link class="wrapper-link" to="/">
          <div class="home-button">首页</div>
        </router-link>
        <router-link class="wrapper-link" to="/login" v-if="!this.isLogin">  <!--v-if中的判断值最好是data或者computed否则在刷新页面时不会保存状态-->
          <div class="connect-button">登陆/注册</div>
        </router-link>
        <router-link class="wrapper-link" :to="this.url" v-if="this.isLogin">
          <div class="connect-button" >个人中心</div>
        </router-link>
      </div>
    <swiper class="home-swiper" :options="swiperOption">
      <swiper-slide>
        <img class="img" src="http://www.ctr-rubber.com/comm/upimage/w_151515_05020.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="img" src="http://www.ctr-rubber.com/comm/upimage/w_151515_05021.jpg"/>
      </swiper-slide>
      <swiper-slide>
        <img class="img" src="http://www.ctr-rubber.com/comm/upimage/w_151515_05022.jpg"/>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <!--<div class="wrapper-navigation-bar">-->
        <!--<div class="bar-word">-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">公司简介</div>-->
          <!--</router-link>-->
          <!--<i slot="suffix" class="el-input__icon el-icon-Separator separating-icon"></i>-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">厂区/办公环境</div>-->
          <!--</router-link>-->
          <!--<i slot="suffix" class="el-input__icon el-icon-Separator separating-icon"></i>-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">认证证书</div>-->
          <!--</router-link>-->
          <!--<i slot="suffix" class="el-input__icon el-icon-Separator separating-icon"></i>-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">材质性能报告</div>-->
          <!--</router-link>-->
          <!--<i slot="suffix" class="el-input__icon el-icon-Separator separating-icon"></i>-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">产品介绍</div>-->
          <!--</router-link>-->
          <!--<i slot="suffix" class="el-input__icon el-icon-Separator separating-icon"></i>-->
          <!--<router-link class="wrapper-link-bar" to="/">-->
            <!--<div class="bar-button">联系我们</div>-->
          <!--</router-link>-->
        <!--</div>-->
      <!--</div>-->
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HomeHeader',
  components: {
    swiper,
    swiperSlide
  },
  beforeMount () {
    console.log('sessionhome' + sessionStorage.getItem('currentUser'))
    if (sessionStorage.getItem('currentUser')) {
      this.$store.dispatch('user/setUser', sessionStorage.getItem('currentUser'))
    }
  },
  mounted () {
    console.log(sessionStorage.getItem('url'))
    console.log(this.$store.state.user.url)
    if (sessionStorage.getItem('url') === '/') {
      this.url = '/userCenter'
      console.log(2)
    } else {
      console.log(1)
      this.url = '/backgroundTask'
    }
  },
  data () {
    return {
      url: '/userCenter',
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      }
    }
  },
  computed: {
    isLogin: function isLogin () {
      if (sessionStorage.getItem('currentUser')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // isLogin () {
    //   if (sessionStorage.getItem('userName') && sessionStorage.getItem('userToken')) {
    //     this.$store.commit('userStatus', sessionStorage.getItem('userName'))
    //     console.log(this.$store.state.currentUser)
    //   } else {
    //     this.$store.commit('userStatus', null)
    //   }
    //   return this.$store.state.isLogin
    // },
    // signOut () {
    //   axios.post('users/logout').then((response) => {
    //     let res = response.data
    //     if (res.status === '3') {
    //       sessionStorage.clear()
    //       this.$store.dispatch('user/setUser', null)
    //       console.log(this.$store.getters.isLogin)
    //     }
    //   })
    // }
  }
}
</script>

<style scoped lang="stylus">
  .wrapper
    position: relative
    width 100%
    background-color #eee
    clear both
    .wrapper-header
      position absolute
      margin-left 15%
      margin-right 10%
      margin-top 20px
      display flex
      flex-direction row
      justify-content space-between
      z-index 10
      width 70%
      clear both
      .wrapper-logo
        flex 7
        height 50px
        width 50px
        .wrapper-logo-img
          width auto
          height auto
          max-height 100%
          max-width 100%
      .wrapper-link
        flex 1
        height 100%
        text-align center
        color: #25a4bb
        .connect-button
          width 90px
          height 20px
          border solid 1px
          border-radius 7px
          line-height 20px
        .home-button
          width 90px
          height 20px
          border solid 1px
          border-radius 7px
          line-height 20px
    .home-swiper
      width 100%
      .swiper-pagination
        text-align end
        width 70%
        margin-left 10%
        margin-bottom 80px
        margin-right 10px
      .img
        width 100%
        height auto
        max-height 100%
        max-width 100%
    .wrapper-navigation-bar
      position absolute
      bottom 0
      left 0
      width 100%
      height 70px
      background-color: #13132f6b
      z-index: 100
      .bar-word
        display flex
        flex-direction row
        width 70%
        height 70px
        margin-left 15%
        .wrapper-link-bar
          flex 2
          text-align center
          line-height: 70px
          .bar-button
            font-size 17px
            color: #eee
            text-shadow 0.5px 0.5px 0 #000, -0.5px -0.5px 0 #000, -0.5px -0.5px 0 #000, -0.5px -0.5px 0 #000
        .separating-icon
          float left
          color #25a4bb
          font-size 60px
          line-height 70px
</style>
