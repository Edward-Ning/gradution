<template>
  <div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="semiProductUseUnit"
        label=订货单位>
      </el-table-column>
      <el-table-column
        prop="orderSemiProductionDate"
        label="订货日期">
      </el-table-column>
      <el-table-column
        prop="semiProductName"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="semiProductSpecification"
        label="规格型号">
      </el-table-column>
      <el-table-column
        prop="semiProductNumber"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="semiProductGum"
        label="材质">
      </el-table-column>
      <el-table-column
        prop="semiProductWeight"
        label="重量">
      </el-table-column>
      <el-table-column
        prop="semiProductUnitPrice"
        label="单价">
      </el-table-column>
      <el-table-column
        prop="semiProductTotalPrice"
        label="总价">
      </el-table-column>
      <el-table-column
        prop="semiProductDeliveryDate"
        label="交货日期">
      </el-table-column>
      <el-table-column
        prop="semiProductReceiptNumber"
        label="发票号">
      </el-table-column>
      <el-table-column
        prop="semiProductPayBack"
        label="回款状况">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-dialog title="修改半成品报表信息" :visible.sync="dialogEditFormVisible">
            <el-form :model="editForm">
              <el-form-item label="订货单位" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductUseUnit" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="订货日期" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="editForm.orderSemiProductionDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="产品名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="规格型号" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductSpecification" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="材质" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductGum" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="重量" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductWeight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单价" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductUnitPrice" autocomplete="off"></el-input>
              </el-form-item>
              <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
              <!--<el-input v-model="editForm.semiProductTotalPrice" autocomplete="off"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="交货日期" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductDeliveryDate" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="发票号" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductReceiptNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="回款状况" :label-width="formLabelWidth">
                <el-input v-model="editForm.semiProductPayBack" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注" :label-width="formLabelWidth">
                <el-input v-model="editForm.remarks" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleEditCancel">取 消</el-button>
              <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加半成品报表信息" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="订货单位" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductUseUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订货日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addForm.orderSemiProductionDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductSpecification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductGum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
        <!--<el-input v-model="addForm.semiProductTotalPrice" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="交货日期" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductDeliveryDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票号" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductReceiptNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回款状况" :label-width="formLabelWidth">
          <el-input v-model="addForm.semiProductPayBack" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="搜索半成品报表信息" :visible.sync="dialogSearchFormVisible">
      <el-form :model="searchForm">
        <el-form-item label="订货单位" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductUseUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订货日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="searchForm.orderSemiProductionDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductSpecification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductGum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
        <!--<el-input v-model="searchForm.semiProductTotalPrice" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="交货日期" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductDeliveryDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductReceiptNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回款状况" :label-width="formLabelWidth">
          <el-input v-model="searchForm.semiProductPayBack" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="searchForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSearchCancel">取 消</el-button>
        <el-button type="primary" @click="handleSearchConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button class="add-icon" icon="el-icon-plus" circle @click="handleAdd"></el-button>
    <el-button class="search-icon" icon="el-icon-search" circle @click="handleSearch"></el-button>
    <el-button class="refresh-icon" icon="el-icon-refresh" circle @click="handleRefresh"></el-button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'semisemiProductionReport',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        semiProductUseUnit: '',
        orderSemiProductionDate: '',
        semiProductName: '',
        semiProductSpecification: '',
        semiProductNumber: '',
        semiProductGum: '',
        semiProductWeight: '',
        semiProductUnitPrice: '',
        semiProductTotalPrice: '',
        semiProductDeliveryDate: '',
        semiProductReceiptNumber: '',
        semiProductPayBack: '',
        remarks: '',
        _id: ''
      },
      addForm: {
        semiProductUseUnit: '',
        orderSemiProductionDate: '',
        semiProductName: '',
        semiProductSpecification: '',
        semiProductNumber: '',
        semiProductGum: '',
        semiProductWeight: '',
        semiProductUnitPrice: '',
        semiProductTotalPrice: '',
        semiProductDeliveryDate: '',
        semiProductReceiptNumber: '',
        semiProductPayBack: '',
        remarks: ''
      },
      searchForm: {
        semiProductUseUnit: '',
        orderSemiProductionDate: '',
        semiProductName: '',
        semiProductSpecification: '',
        semiProductNumber: '',
        semiProductGum: '',
        semiProductWeight: '',
        semiProductUnitPrice: '',
        semiProductTotalPrice: '',
        semiProductDeliveryDate: '',
        semiProductReceiptNumber: '',
        semiProductPayBack: '',
        remarks: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('semiProductionReport/find').then(
      (response) => {
        let res = response.data.result
        for (let i = 0; i < res.length; i++) {
          res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
        }
        this.tableData = res
      }
    )
  },
  updated () {
  },
  methods: {
    handleRefresh () {
      axios.post('semiProductionReport/find').then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
          }
          this.tableData = res
        }
      )
    },
    handleSearch () {
      this.dialogSearchFormVisible = true
    },
    handleSearchCancel () {
      this.dialogSearchFormVisible = false
    },
    handleSearchConfirm () {
      this.dialogSearchFormVisible = false
      axios.post('semiProductionReport/search', {
        semiProductUseUnit: this.searchForm.semiProductUseUnit,
        orderSemiProductionDate: this.searchForm.orderSemiProductionDate,
        semiProductName: this.searchForm.semiProductName,
        semiProductSpecification: this.searchForm.semiProductSpecification,
        semiProductNumber: this.searchForm.semiProductNumber,
        semiProductGum: this.searchForm.semiProductGum,
        semiProductWeight: this.searchForm.semiProductWeight,
        semiProductUnitPrice: this.searchForm.semiProductUnitPrice,
        semiProductTotalPrice: this.searchForm.semiProductTotalPrice,
        semiProductDeliveryDate: this.searchForm.semiProductDeliveryDate,
        semiProductReceiptNumber: this.searchForm.semiProductReceiptNumber,
        semiProductPayBack: this.searchForm.semiProductPayBack,
        remarks: this.searchForm.remarks
      }).then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
          }
          this.tableData = res
        }
      )
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.editForm.semiProductUseUnit = row.semiProductUseUnit
      this.editForm.orderSemiProductionDate = row.orderSemiProductionDate
      this.editForm.semiProductName = row.semiProductName
      this.editForm.semiProductSpecification = row.semiProductSpecification
      this.editForm.semiProductNumber = row.semiProductNumber
      this.editForm.semiProductGum = row.semiProductGum
      this.editForm.semiProductWeight = row.semiProductUseUnit
      this.editForm.semiProductUnitPrice = row.semiProductUnitPrice
      this.editForm.semiProductTotalPrice = row.semiProductTotalPrice
      this.editForm.semiProductDeliveryDate = row.semiProductDeliveryDate
      this.editForm.semiProductReceiptNumber = row.semiProductReceiptNumber
      this.editForm.semiProductPayBack = row.semiProductPayBack
      this.editForm.remarks = row.remarks
      this.editForm._id = row._id
      this.dialogEditFormVisible = true
      console.log(this.editForm)
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        axios.post('semiProductionReport/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('semiProductionReport/find').then(
                (response) => {
                  let res = response.data.result
                  for (let i = 0; i < res.length; i++) {
                    res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
                  }
                  this.tableData = res
                }
              )
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEditCancel () {
      this.dialogEditFormVisible = false
    },
    handleEditConfirm (index, row) {
      console.log(index, row)
      axios.post('semiProductionReport/edit', {
        semiProductUseUnit: this.editForm.semiProductUseUnit,
        orderSemiProductionDate: this.editForm.orderSemiProductionDate,
        semiProductName: this.editForm.semiProductName,
        semiProductSpecification: this.editForm.semiProductSpecification,
        semiProductNumber: this.editForm.semiProductNumber,
        semiProductGum: this.editForm.semiProductGum,
        semiProductWeight: this.editForm.semiProductWeight,
        semiProductUnitPrice: this.editForm.semiProductUnitPrice,
        semiProductTotalPrice: this.editForm.semiProductTotalPrice,
        semiProductDeliveryDate: this.editForm.semiProductDeliveryDate,
        semiProductReceiptNumber: this.editForm.semiProductReceiptNumber,
        semiProductPayBack: this.editForm.semiProductPayBack,
        remarks: this.editForm.remarks,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('semiProductionReport/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
                }
                this.tableData = res
              }
            )
          }
        }
      )
      this.dialogEditFormVisible = false
    },
    handleAdd () {
      this.dialogAddFormVisible = true
    },
    handleAddCancel () {
      this.dialogAddFormVisible = false
    },
    handleAddConfirm () {
      this.dialogAddFormVisible = false
      axios.post('semiProductionReport/add', {
        semiProductUseUnit: this.addForm.semiProductUseUnit,
        orderSemiProductionDate: this.addForm.orderSemiProductionDate,
        semiProductName: this.addForm.semiProductName,
        semiProductSpecification: this.addForm.semiProductSpecification,
        semiProductNumber: this.addForm.semiProductNumber,
        semiProductGum: this.addForm.semiProductGum,
        semiProductWeight: this.addForm.semiProductWeight,
        semiProductUnitPrice: this.addForm.semiProductUnitPrice,
        semiProductTotalPrice: this.addForm.semiProductTotalPrice,
        semiProductDeliveryDate: this.addForm.semiProductDeliveryDate,
        semiProductReceiptNumber: this.addForm.semiProductReceiptNumber,
        semiProductPayBack: this.addForm.semiProductPayBack,
        remarks: this.addForm.remarks
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.semiProductUseUnit = ''
            this.addForm.orderSemiProductionDate = ''
            this.addForm.semiProductName = ''
            this.addForm.semiProductSpecification = ''
            this.addForm.semiProductNumber = ''
            this.addForm.semiProductGum = ''
            this.addForm.semiProductWeight = ''
            this.addForm.semiProductUnitPrice = ''
            this.addForm.semiProductTotalPrice = ''
            this.addForm.semiProductDeliveryDate = ''
            this.addForm.semiProductReceiptNumber = ''
            this.addForm.semiProductPayBack = ''
            this.addForm.remarks = ''
            axios.post('semiProductionReport/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].orderSemiProductionDate = new Date(res[i].orderSemiProductionDate.toString()).toLocaleDateString()
                }
                this.tableData = res
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
  .search-icon
    float right
    margin-right 10px
    margin-top 20px
  .refresh-icon
    float right
    margin-right 10px
    margin-top 20px
</style>
