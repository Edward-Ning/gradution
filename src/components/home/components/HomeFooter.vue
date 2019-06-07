<template>
  <div class="wrapper">
    <div class="company-information">
      <div class="information">
        <strong class="title">地址:</strong>
        <div class="content">{{this.form.address}}</div>
      </div>
      <div class="information">
        <strong class="title">电话:</strong>
        <div class="content">{{this.form.phoneNumber}}&nbsp;&nbsp;</div>
        <strong class="title">传真:</strong>
        <div class="content">{{this.form.fax}}</div>
      </div>
      <div class="information">
        <strong class="title">E-mail:</strong>
        <div class="content">{{this.form.email}}</div>
      </div>
    </div>
    <div class="footer-page">xxxxxxxxxxxxxxxxxx</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeFoot',
  mounted () {
    axios.post('companyInformation/find').then((response) => {
      let res = response.data.result[0]
      this.form.address = res.companyAddress
      this.form.phoneNumber = res.companyPhone
      this.form.email = res.companyEmail
      this.form.fax = res.companyFax
    })
    console.log(this.form)
  },
  data () {
    return {
      form: {
        address: '',
        phoneNumber: '',
        fax: '',
        email: ''
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .wrapper
    width 100%
    background-color #25a4bb
    margin-top 20px
    overflow hidden
    .company-information
      overflow hidden
      padding-top 30px
      margin-left 15%
      width 100%
      .information
        float left
        width 100%
        margin-top 10px
      .title
        font-weight 900
        width auto
        float left
      .content
        float left
    .footer-page
      float right
      margin-right 15%
      margin-bottom 20px
</style>
