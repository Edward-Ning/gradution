<template>
 <div>
   <el-header>
     <el-button type="text" @click="dialogFormVisible = true">查看员工成品率</el-button>
       <el-dialog title="" :visible.sync="dialogFormVisible">
         <el-form :model="staffForm">
           <el-form-item label="日期范围" :label-width="formLabelWidth">
             <el-date-picker
               v-model="staffForm.dateRange"
               type="daterange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
             </el-date-picker>
           </el-form-item>
           <el-form-item>
             <el-form-item label="员工姓名" :label-width="formLabelWidth">
               <el-input v-model="staffForm.staffName" autocomplete="off"></el-input>
             </el-form-item>
           </el-form-item>
           <el-form-item>
             <el-form-item label="产品名称" :label-width="formLabelWidth">
               <el-input v-model="staffForm.productName" autocomplete="off"></el-input>
             </el-form-item>
           </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click="handleStaffCancel">取 消</el-button>
           <el-button type="primary" @click="handleStaffConfirm">确 定</el-button>
         </div>
       </el-dialog>
   </el-header>
   <el-main>
     <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
   </el-main>
 </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
export default {
  name: 'staffProductionReport',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dialogFormVisible: false,
      staffForm: {
        dateRange: '',
        staffName: '',
        productName: ''
      },
      tableForm: [],
      formLabelWidth: '80px'
    }
  },
  methods: {
    handleStaffCancel () {
      this.dialogFormVisible = false
    },
    handleStaffConfirm () {
      this.dialogFormVisible = false
      console.log(this.staffForm.dateRange)
      axios.post('/staffDailyProduction/findStaffYield', {
        dateRange: this.staffForm.dateRange,
        staffName: this.staffForm.staffName,
        productName: this.staffForm.productName
      }).then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
          }
          this.tableForm = res
          this.drawLine()
        }
      )
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      let xAxis = []
      let series = []
      console.log(this.tableForm)
      for (let i = 0; i < this.tableForm.length; i++) {
        xAxis[i] = this.tableForm[i].staffDPDay
        series[i] = this.tableForm[i].staffYield
      }
      console.log(xAxis)
      console.log(series)
      myChart.setOption({
        title: {
          text: '员工：' + this.staffForm.staffName + '产品：' + this.staffForm.productName
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: series,
          type: 'line'
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
