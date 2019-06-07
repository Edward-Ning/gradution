<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="公司名称">
        <el-input v-model="form.name" :aria-placeholder="this.form.name"></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="form.address" :aria-placeholder="this.form.address"></el-input>
      </el-form-item>
      <el-form-item label="公司电话">
        <el-input v-model="form.phoneNumber" :aria-placeholder="this.form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="公司邮箱">
        <el-input v-model="form.email" :aria-placeholder="this.form.email"></el-input>
      </el-form-item>
      <el-form-item label="公司传真">
        <el-input v-model="form.fax" :aria-placeholder="this.form.fax"></el-input>
      </el-form-item>
      <el-form-item label="公司简介">
        <el-input type="textarea" v-model="form.info" :aria-placeholder="this.form.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'companyMessage',
  data () {
    return {
      form: {
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        fax: '',
        info: ''
      }
    }
  },
  mounted () {
    axios.post('companyInformation/find').then((response) => {
      let res = response.data.result[0]
      this.form.name = res.companyName
      this.form.address = res.companyAddress
      this.form.phoneNumber = res.companyPhone
      this.form.email = res.companyEmail
      this.form.fax = res.companyFax
      this.form.info = res.companyAbout
    })
  },
  methods: {
    onSubmit: function () {
      console.log(this.form)
      axios.post('companyInformation/change', {
        companyName: this.form.name,
        companyAddress: this.form.address,
        companyPhone: this.form.phoneNumber,
        companyEmail: this.form.email,
        companyFax: this.form.fax,
        companyInfo: this.form.info
      }).then((response) => {
        let res = response.data
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
