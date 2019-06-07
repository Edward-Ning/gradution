<template>
  <div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="productName"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="productSpecification"
        label="产品规格">
      </el-table-column>
      <el-table-column
        prop="productNumber"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="productGum"
        label="材质">
      </el-table-column>
      <el-table-column
        prop="productWeight"
        label="重量">
      </el-table-column>
      <el-table-column
        prop="productUnitPrice"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="productTotalPrice"
        label="总价">
      </el-table-column>
      <el-table-column
        prop="productState"
        label="订单状态">
      </el-table-column>
      <el-table-column
        prop="productExpectedDeliveryDate"
        label="预定交货日期">
      </el-table-column>
    </el-table>
    <el-dialog title="创建订单信息" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品规格" :label-width="formLabelWidth">
          <el-input v-model="addForm.productSpecification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="addForm.productNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" :label-width="formLabelWidth">
          <el-input v-model="addForm.productGum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input v-model="addForm.productWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="预定交货日期" :label-width="formLabelWidth">
          <el-input v-model="addForm.productExpectedDeliveryDate" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button class="add-icon" icon="el-icon-plus" circle @click="handleAdd"></el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'UserOrder',
  data () {
    return {
      tableData: [],
      userName: sessionStorage.getItem('currentUser'),
      addForm: {
        productName: '',
        productSpecification: '',
        productNumber: '',
        productGum: '',
        productWeight: '',
        productExpectedDeliveryDate: '',
        productState: '待处理'
      },
      dialogAddFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('userOrderInformation/userFind', {
      userName: this.userName
    }).then(
      (response) => {
        let res = response.data
        console.log(res.result)
        this.tableData = res.result
        console.log(this.tableData)
      }
    )
  },
  methods: {
    handleAdd () {
      this.dialogAddFormVisible = true
    },
    handleAddCancel () {
      this.dialogAddFormVisible = false
    },
    handleAddConfirm () {
      this.dialogAddFormVisible = false
      axios.post('userOrderInformation/addUserOrder', {
        userName: this.userName,
        productName: this.addForm.productName,
        productSpecification: this.addForm.productSpecification,
        productNumber: this.addForm.productNumber,
        productGum: this.addForm.productGum,
        productWeight: this.addForm.productWeight,
        productExpectedDeliveryDate: this.addForm.productExpectedDeliveryDate,
        productState: this.addForm.productState
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.productName = ''
            this.addForm.productSpecification = ''
            this.addForm.productNumber = ''
            this.addForm.productGum = ''
            this.addForm.productWeight = ''
            this.addForm.productExpectedDeliveryDate = ''
            axios.post('userOrderInformation/userFind', {
              userName: this.userName
            }).then(
              (response) => {
                let res = response.data
                console.log(res.result)
                this.tableData = res.result
                console.log(this.tableData)
              }
            )
          }
        }
      )
    }
  }
}
</script>

<style scoped lang="stylus">
  .add-icon
    float right
    margin-top 20px
</style>
