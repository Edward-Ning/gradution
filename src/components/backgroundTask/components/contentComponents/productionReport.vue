<template>
  <div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="productUseUnit"
        label=订货单位>
      </el-table-column>
      <el-table-column
        prop="orderProductionDate"
        label="订货日期">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="产品名称">
      </el-table-column>
      <el-table-column
        prop="productSpecification"
        label="规格型号">
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
        prop="productDeliveryDate"
        label="交货日期">
      </el-table-column>
      <el-table-column
        prop="productReceiptNumber"
        label="发票号">
      </el-table-column>
      <el-table-column
        prop="productPayBack"
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
          <el-dialog title="修改产品报表信息" :visible.sync="dialogEditFormVisible">
            <el-form :model="editForm">
              <el-form-item label="订货单位" :label-width="formLabelWidth">
                <el-input v-model="editForm.productUseUnit" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="订货日期" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="editForm.orderProductionDate"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="产品名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.productName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="规格型号" :label-width="formLabelWidth">
                <el-input v-model="editForm.productSpecification" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="数量" :label-width="formLabelWidth">
                <el-input v-model="editForm.productNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="材质" :label-width="formLabelWidth">
                <el-input v-model="editForm.productGum" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="重量" :label-width="formLabelWidth">
                <el-input v-model="editForm.productWeight" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="单价" :label-width="formLabelWidth">
                <el-input v-model="editForm.productUnitPrice" autocomplete="off"></el-input>
              </el-form-item>
              <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
                <!--<el-input v-model="editForm.productTotalPrice" autocomplete="off"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item label="交货日期" :label-width="formLabelWidth">
                <el-input v-model="editForm.productDeliveryDate" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="发票号" :label-width="formLabelWidth">
                <el-input v-model="editForm.productReceiptNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="回款状况" :label-width="formLabelWidth">
                <el-input v-model="editForm.productPayBack" autocomplete="off"></el-input>
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
    <el-dialog title="添加产品报表信息" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="订货单位" :label-width="formLabelWidth">
          <el-input v-model="addForm.productUseUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订货日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="addForm.orderProductionDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" :label-width="formLabelWidth">
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
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="addForm.productUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
          <!--<el-input v-model="addForm.productTotalPrice" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="交货日期" :label-width="formLabelWidth">
          <el-input v-model="addForm.productDeliveryDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票号" :label-width="formLabelWidth">
          <el-input v-model="addForm.productReceiptNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回款状况" :label-width="formLabelWidth">
          <el-input v-model="addForm.productPayBack" autocomplete="off"></el-input>
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
    <el-dialog title="搜索产品报表信息" :visible.sync="dialogSearchFormVisible">
      <el-form :model="searchForm">
        <el-form-item label="订货单位" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productUseUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="订货日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="searchForm.orderProductionDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productSpecification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="材质" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productGum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="总价" :label-width="formLabelWidth">-->
        <!--<el-input v-model="searchForm.productTotalPrice" autocomplete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="交货日期" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productDeliveryDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="发票号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productReceiptNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="回款状况" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productPayBack" autocomplete="off"></el-input>
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
  name: 'productionReport',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        productUseUnit: '',
        orderProductionDate: '',
        productName: '',
        productSpecification: '',
        productNumber: '',
        productGum: '',
        productWeight: '',
        productUnitPrice: '',
        productTotalPrice: '',
        productDeliveryDate: '',
        productReceiptNumber: '',
        productPayBack: '',
        remarks: '',
        _id: ''
      },
      addForm: {
        productUseUnit: '',
        orderProductionDate: '',
        productName: '',
        productSpecification: '',
        productNumber: '',
        productGum: '',
        productWeight: '',
        productUnitPrice: '',
        productTotalPrice: '',
        productDeliveryDate: '',
        productReceiptNumber: '',
        productPayBack: '',
        remarks: ''
      },
      searchForm: {
        productUseUnit: '',
        orderProductionDate: '',
        productName: '',
        productSpecification: '',
        productNumber: '',
        productGum: '',
        productWeight: '',
        productUnitPrice: '',
        productTotalPrice: '',
        productDeliveryDate: '',
        productReceiptNumber: '',
        productPayBack: '',
        remarks: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('productionReport/find').then(
      (response) => {
        let res = response.data.result
        for (let i = 0; i < res.length; i++) {
          res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
        }
        this.tableData = res
      }
    )
  },
  updated () {
  },
  methods: {
    handleRefresh () {
      axios.post('productionReport/find').then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
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
      axios.post('productionReport/search', {
        productUseUnit: this.searchForm.productUseUnit,
        orderProductionDate: this.searchForm.orderProductionDate,
        productName: this.searchForm.productName,
        productSpecification: this.searchForm.productSpecification,
        productNumber: this.searchForm.productNumber,
        productGum: this.searchForm.productGum,
        productWeight: this.searchForm.productWeight,
        productUnitPrice: this.searchForm.productUnitPrice,
        productTotalPrice: this.searchForm.productTotalPrice,
        productDeliveryDate: this.searchForm.productDeliveryDate,
        productReceiptNumber: this.searchForm.productReceiptNumber,
        productPayBack: this.searchForm.productPayBack,
        remarks: this.searchForm.remarks
      }).then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
          }
          this.tableData = res
        }
      )
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.editForm.productUseUnit = row.productUseUnit
      this.editForm.orderProductionDate = row.orderProductionDate
      this.editForm.productName = row.productName
      this.editForm.productSpecification = row.productSpecification
      this.editForm.productNumber = row.productNumber
      this.editForm.productGum = row.productGum
      this.editForm.productWeight = row.productUseUnit
      this.editForm.productUnitPrice = row.productUnitPrice
      this.editForm.productTotalPrice = row.productTotalPrice
      this.editForm.productDeliveryDate = row.productDeliveryDate
      this.editForm.productReceiptNumber = row.productReceiptNumber
      this.editForm.productPayBack = row.productPayBack
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
        axios.post('productionReport/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('productionReport/find').then(
                (response) => {
                  let res = response.data.result
                  for (let i = 0; i < res.length; i++) {
                    res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
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
      axios.post('productionReport/edit', {
        productUseUnit: this.editForm.productUseUnit,
        orderProductionDate: this.editForm.orderProductionDate,
        productName: this.editForm.productName,
        productSpecification: this.editForm.productSpecification,
        productNumber: this.editForm.productNumber,
        productGum: this.editForm.productGum,
        productWeight: this.editForm.productWeight,
        productUnitPrice: this.editForm.productUnitPrice,
        productTotalPrice: this.editForm.productTotalPrice,
        productDeliveryDate: this.editForm.productDeliveryDate,
        productReceiptNumber: this.editForm.productReceiptNumber,
        productPayBack: this.editForm.productPayBack,
        remarks: this.editForm.remarks,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('productionReport/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
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
      axios.post('productionReport/add', {
        productUseUnit: this.addForm.productUseUnit,
        orderProductionDate: this.addForm.orderProductionDate,
        productName: this.addForm.productName,
        productSpecification: this.addForm.productSpecification,
        productNumber: this.addForm.productNumber,
        productGum: this.addForm.productGum,
        productWeight: this.addForm.productWeight,
        productUnitPrice: this.addForm.productUnitPrice,
        productTotalPrice: this.addForm.productTotalPrice,
        productDeliveryDate: this.addForm.productDeliveryDate,
        productReceiptNumber: this.addForm.productReceiptNumber,
        productPayBack: this.addForm.productPayBack,
        remarks: this.addForm.remarks
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.productUseUnit = ''
            this.addForm.orderProductionDate = ''
            this.addForm.productName = ''
            this.addForm.productSpecification = ''
            this.addForm.productNumber = ''
            this.addForm.productGum = ''
            this.addForm.productWeight = ''
            this.addForm.productUnitPrice = ''
            this.addForm.productTotalPrice = ''
            this.addForm.productDeliveryDate = ''
            this.addForm.productReceiptNumber = ''
            this.addForm.productPayBack = ''
            this.addForm.remarks = ''
            axios.post('productionReport/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].orderProductionDate = new Date(res[i].orderProductionDate.toString()).toLocaleDateString()
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
