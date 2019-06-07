<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="tableData[props.$index].productionProcessSemi">
            <el-table-column label="半成品名称" prop="semiProductName"></el-table-column>
            <el-table-column label="单位" prop="semiProductUnit"></el-table-column>
            <el-table-column label="单价" prop="semiProductUnitPrice"></el-table-column>
            <el-table-column label="数量" prop="semiProductNumber"></el-table-column>
            <el-table-column label="实际成本金额" prop="semiProductTotalPrice"></el-table-column>
            <el-table-column label="备注" prop="remarks"></el-table-column>
            <el-table-column
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleSemiEdit(props.$index ,scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleSemiDelete(props.$index ,scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button class="add-icon" icon="el-icon-plus" circle @click="handleSemiAdd(props.$index)"></el-button>
          <el-button class="refresh-icon" icon="el-icon-refresh" circle @click="handleSemiRefresh(props.$index)"></el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        prop="productName">
      </el-table-column>
      <el-table-column
        label="产品成本"
        prop="productTotalPrice">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleProductEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleProductDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加半成品" :visible.sync="dialogSemiAddFormVisible">
      <el-form :model="addSemiForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.semiProductUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.semiProductUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.semiProductNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSemiAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleSemiAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改产品生产流程" :visible.sync="dialogProductEditFormVisible">
      <el-form :model="editProductForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="editProductForm.productName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleProductEditCancel">取 消</el-button>
        <el-button type="primary" @click="handleProductEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加产品生产流程" :visible.sync="dialogProductAddFormVisible">
      <el-form :model="addProductForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="addProductForm.productName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleProductAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleProductAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="搜索产品生产流程" :visible.sync="dialogProductSearchFormVisible">
      <el-form :model="searchProductForm">
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="searchProductForm.productName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleProductSearchCancel">取 消</el-button>
        <el-button type="primary" @click="handleProductSearchConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button class="add-icon" icon="el-icon-plus" circle @click="handleProductAdd"></el-button>
    <el-button class="search-icon" icon="el-icon-search" circle @click="handleProductSearch"></el-button>
    <el-button class="refresh-icon" icon="el-icon-refresh" circle @click="handleProductRefresh"></el-button>
    <el-dialog title="修改半成品" :visible.sync="dialogSemiEditFormVisible">
      <el-form :model="editSemiForm">
        <el-form-item label="半成品名称" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.semiProductUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.semiProductUnitPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.semiProductNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSemiEditCancel">取 消</el-button>
        <el-button type="primary" @click="handleSemiEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'productionProcess',
  data () {
    return {
      tableData: [],
      editProductForm: {
        productName: '',
        _id: ''
      },
      addProductForm: {
        productName: ''
      },
      searchProductForm: {
        productName: ''
      },
      editSemiForm: {
        semiProductName: '',
        semiProductUnit: '',
        semiProductUnitPrice: '',
        semiProductNumber: '',
        remarks: '',
        _id: ''
      },
      addSemiForm: {
        semiProductName: '',
        semiProductUnit: '',
        semiProductUnitPrice: '',
        semiProductNumber: '',
        remarks: '',
        product_id: ''
      },
      dialogProductEditFormVisible: false,
      dialogProductAddFormVisible: false,
      dialogSemiEditFormVisible: false,
      dialogSemiAddFormVisible: false,
      dialogProductSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('productionProcess/find').then(
      (response) => {
        let res = response.data
        console.log(res.result)
        this.tableData = res.result
        console.log(this.tableData)
      }
    )
  },
  methods: {
    handleProductRefresh () {
      axios.post('productionProcess/find').then(
        (response) => {
          let res = response.data
          console.log(res.result)
          this.tableData = res.result
          console.log(this.tableData)
        }
      )
    },
    handleProductSearch () {
      this.dialogProductSearchFormVisible = true
    },
    handleProductSearchCancel () {
      this.dialogProductSearchFormVisible = false
    },
    handleProductSearchConfirm () {
      this.dialogProductSearchFormVisible = false
      axios.post('productionProcess/search', {
        productName: this.searchProductForm.productName
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          this.tableData = res.result
        }
      )
    },
    handleProductEdit (index, row) {
      console.log(index, row)
      this.editProductForm.productName = row.productName
      this.editProductForm._id = row._id
      this.dialogProductEditFormVisible = true
      console.log(this.editForm)
    },
    handleProductDelete (index, row) {
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
        axios.post('productionProcess/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('productionProcess/find').then(
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleProductEditCancel () {
      this.dialogProductEditFormVisible = false
    },
    handleProductEditConfirm (index, row) {
      console.log(index, row)
      axios.post('productionProcess/edit', {
        productName: this.editProductForm.productName,
        _id: this.editProductForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('productionProcess/find').then(
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
      this.dialogProductEditFormVisible = false
    },
    handleProductAdd () {
      this.dialogProductAddFormVisible = true
    },
    handleProductAddCancel () {
      this.dialogProductAddFormVisible = false
    },
    handleProductAddConfirm () {
      this.dialogProductAddFormVisible = false
      axios.post('productionProcess/add', {
        productName: this.addProductForm.productName
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addProductForm.productName = ''
            axios.post('productionProcess/find').then(
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
    },
    handleSemiDelete (prop, index, row) {
      console.log(prop, index, row)
      console.log(this.tableData[prop])
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        axios.post('productionProcess/deleteSemi', {
          product_id: this.tableData[prop]._id,
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('productionProcess/find').then(
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSemiEdit (prop, index, row) {
      console.log(prop, index, row)
      this.editSemiForm.semiProductName = row.semiProductName
      this.editSemiForm.semiProductUnit = row.semiProductUnit
      this.editSemiForm.semiProductUnitPrice = row.semiProductUnitPrice
      this.editSemiForm.semiProductNumber = row.semiProductNumber
      this.editSemiForm.remarks = row.remarks
      this.editSemiForm._id = row._id
      this.dialogSemiEditFormVisible = true
      console.log(this.editSemiForm)
    },
    handleSemiEditCancel () {
      this.dialogSemiEditFormVisible = false
    },
    handleSemiEditConfirm (index, row) {
      console.log(index, row)
      console.log(this.editSemiForm)
      axios.post('productionProcess/editSemi', {
        semiProductName: this.editSemiForm.semiProductName,
        semiProductUnit: this.editSemiForm.semiProductUnit,
        semiProductUnitPrice: this.editSemiForm.semiProductUnitPrice,
        semiProductNumber: this.editSemiForm.semiProductNumber,
        remarks: this.editSemiForm.remarks,
        _id: this.editSemiForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('productionProcess/find').then(
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
      this.dialogSemiEditFormVisible = false
    },
    handleSemiRefresh (index) {
      console.log(this.tableData[index]._id)
      axios.post('productionProcess/calculate', {
        _id: this.tableData[index]._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res.result)
          this.tableData = res.result
          console.log(this.tableData)
        }
      )
    },
    handleSemiAdd (index) {
      console.log(index)
      console.log(this.tableData[index]._id)
      this.addSemiForm.product_id = this.tableData[index]._id
      this.dialogSemiAddFormVisible = true
    },
    handleSemiAddCancel () {
      this.dialogSemiAddFormVisible = false
    },
    handleSemiAddConfirm () {
      this.dialogSemiAddFormVisible = false
      axios.post('productionProcess/addSemi', {
        semiProductName: this.addSemiForm.semiProductName,
        semiProductUnit: this.addSemiForm.semiProductUnit,
        semiProductUnitPrice: this.addSemiForm.semiProductUnitPrice,
        semiProductNumber: this.addSemiForm.semiProductNumber,
        remarks: this.addSemiForm.remarks,
        product_id: this.addSemiForm.product_id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addSemiForm.semiProductName = ''
            this.addSemiForm.semiProductUnit = ''
            this.addSemiForm.semiProductUnitPrice = ''
            this.addSemiForm.semiProductNumber = ''
            this.addSemiForm.remarks = ''
            axios.post('productionProcess/find').then(
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
  .search-icon
    float right
    margin-right 10px
    margin-top 20px
  .refresh-icon
    float right
    margin-right 10px
    margin-top 20px
</style>
