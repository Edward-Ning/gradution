<template>
  <div class="wrapper">
    <div class="box">
      <div class="company-introduction">
        <div class="company-introduction-title-cn">公司简介</div>
        <div class="company-introduction-title-en">Abaout Us</div>
        <div class="company-introduction-contents">
          {{this.form.info}}
        </div>
      </div>
      <!--<div class="products-introduction">-->
        <!--<div class="products-introduction-title-cn">产品介绍</div>-->
        <!--<span class="iconfont separating-icon">&#xe61e;</span>-->
        <!--<div class="products-introduction-title-en">Products</div>-->
        <!--<div class="products-introduction-contents">-->
          <!--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="separating-solid"></div>-->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeIntroduction',
  data () {
    return {
      form: {
        info: ''
      }
    }
  },
  mounted () {
    axios.post('companyInformation/find').then((response) => {
      let res = response.data.result[0]
      this.form.info = res.companyAbout
    })
  }
}
</script>

<style scoped lang="stylus">
  .wrapper
    width 100
    border-top solid #25a4bb 10px
    overflow hidden
    .box
      width 70%
      margin-left 15%
      .company-introduction
        float: left
        margin-top 20px
        width 48%
        .company-introduction-title-cn
          height 30px
          line-height 30px
          float left
          font-weight 400
          font-size 18px
        .company-introduction-title-en
          height 30px
          line-height 30px
          float left
        .separating-icon
          height 30px
          line-height 30px
          float left
        .company-introduction-contents
          clear both
          word-wrap break-word
      .products-introduction
        float right
        margin-top 20px
        width 48%
        .products-introduction-title-cn
          height 30px
          line-height 30px
          float left
          font-weight 400
          font-size 18px
        .products-introduction-title-en
          height 30px
          line-height 30px
          float left
        .separating-icon
          height 30px
          line-height 30px
          float left
        .products-introduction-contents
          clear both
          word-wrap break-word
      .separating-solid
        border-bottom solid #cacaca 1px
        height 40px
        clear both
</style>
