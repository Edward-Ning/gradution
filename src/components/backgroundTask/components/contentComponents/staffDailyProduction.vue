<template>
  <div>
  <el-table
    :data="tableData"
  >
    <el-table-column
      prop="staffDPDay"
      label=日期>
    </el-table-column>
    <el-table-column
      prop="deviceNumber"
      label="设备号">
    </el-table-column>
    <el-table-column
      prop="staffName"
      label="操作人">
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
      prop="productGum"
      label="胶料">
    </el-table-column>
    <el-table-column
      prop="productUseUnit"
      label="使用单位">
    </el-table-column>
    <el-table-column
      prop="productTotalNumber"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="productQualifiedNumber"
      label="合格数量计件">
    </el-table-column>
    <el-table-column
      prop="staffShift"
      label="班次">
    </el-table-column>
    <el-table-column
      prop="productTotal"
      label="合计">
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
        <el-dialog title="修改员工日生产信息" :visible.sync="dialogEditFormVisible">
          <el-form :model="editForm">
            <el-form-item label="日期" :label-width="formLabelWidth">
              <el-date-picker
                v-model="editForm.staffDPDay"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="设备号" :label-width="formLabelWidth">
              <el-input v-model="editForm.deviceNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作人" :label-width="formLabelWidth">
              <el-input v-model="editForm.staffName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" :label-width="formLabelWidth">
              <el-input v-model="editForm.productName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="规格型号" :label-width="formLabelWidth">
              <el-input v-model="editForm.productSpecification" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="胶料" :label-width="formLabelWidth">
              <el-input v-model="editForm.productGum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="使用单位" :label-width="formLabelWidth">
              <el-input v-model="editForm.productUseUnit" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth">
              <el-input v-model="editForm.productTotalNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="合格计件数量" :label-width="formLabelWidth">
              <el-input v-model="editForm.productQualifiedNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="班次" :label-width="formLabelWidth">
              <el-input v-model="editForm.staffShift" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="合计" :label-width="formLabelWidth">
              <el-input v-model="editForm.productTotal" autocomplete="off"></el-input>
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
  <el-dialog title="添加员工日生产信息" :visible.sync="dialogAddFormVisible">
    <el-form :model="addForm">
      <el-form-item label="日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="addForm.staffDPDay"
          type="date"
          format="yyyy/MM/dd"
          value-format="yyyy/MM/dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="设备号" :label-width="formLabelWidth">
        <el-input v-model="addForm.deviceNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="操作人" :label-width="formLabelWidth">
        <el-input v-model="addForm.staffName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" :label-width="formLabelWidth">
        <el-input v-model="addForm.productName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="规格型号" :label-width="formLabelWidth">
        <el-input v-model="addForm.productSpecification" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="胶料" :label-width="formLabelWidth">
        <el-input v-model="addForm.productGum" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="使用单位" :label-width="formLabelWidth">
        <el-input v-model="addForm.productUseUnit" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input v-model="addForm.productTotalNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="合格计件数量" :label-width="formLabelWidth">
        <el-input v-model="addForm.productQualifiedNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班次" :label-width="formLabelWidth">
        <el-input v-model="addForm.staffShift" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="合计" :label-width="formLabelWidth">
        <el-input v-model="addForm.productTotal" autocomplete="off"></el-input>
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
    <el-dialog title="搜索员工日生产信息" :visible.sync="dialogSearchFormVisible">
      <el-form :model="searchForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="searchForm.staffDPDay"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="设备号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.deviceNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">
          <el-input v-model="searchForm.staffName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格型号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productSpecification" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="胶料" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productGum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="使用单位" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productUseUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productTotalNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合格计件数量" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productQualifiedNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班次" :label-width="formLabelWidth">
          <el-input v-model="searchForm.staffShift" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="合计" :label-width="formLabelWidth">
          <el-input v-model="searchForm.productTotal" autocomplete="off"></el-input>
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
  name: 'staffDailyProduction',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        staffDPDay: '',
        deviceNumber: '',
        staffName: '',
        productName: '',
        productSpecification: '',
        productGum: '',
        productUseUnit: '',
        productTotalNumber: '',
        productQualifiedNumber: '',
        staffShift: '',
        productTotal: '',
        remarks: '',
        _id: ''
      },
      addForm: {
        staffDPDay: '',
        deviceNumber: '',
        staffName: '',
        productName: '',
        productSpecification: '',
        productGum: '',
        productUseUnit: '',
        productTotalNumber: '',
        productQualifiedNumber: '',
        staffShift: '',
        productTotal: '',
        remarks: ''
      },
      searchForm: {
        staffDPDay: '',
        deviceNumber: '',
        staffName: '',
        productName: '',
        productSpecification: '',
        productGum: '',
        productUseUnit: '',
        productTotalNumber: '',
        productQualifiedNumber: '',
        staffShift: '',
        productTotal: '',
        remarks: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('staffDailyProduction/find').then(
      (response) => {
        let res = response.data.result
        for (let i = 0; i < res.length; i++) {
          res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
        }
        this.tableData = res
      }
    )
  },
  updated () {
  },
  methods: {
    handleRefresh () {
      axios.post('staffDailyProduction/find').then(
        (response) => {
          let res = response.data.result
          console.log(res)
          for (let i = 0; i < res.length; i++) {
            res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
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
      axios.post('staffDailyProduction/search', {
        staffDPDay: this.searchForm.staffDPDay,
        deviceNumber: this.searchForm.deviceNumber,
        staffName: this.searchForm.staffName,
        productName: this.searchForm.productName,
        productSpecification: this.searchForm.productSpecification,
        productGum: this.searchForm.productGum,
        productUseUnit: this.searchForm.productUseUnit,
        productTotalNumber: this.searchForm.productTotalNumber,
        productQualifiedNumber: this.searchForm.productQualifiedNumber,
        staffShift: this.searchForm.staffShift,
        productTotal: this.searchForm.productTotal,
        remarks: this.searchForm.remarks
      }).then(
        (response) => {
          let res = response.data.result
          for (let i = 0; i < res.length; i++) {
            res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
          }
          this.tableData = res
        }
      )
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.editForm.staffDPDay = row.staffDPDay
      this.editForm.deviceNumber = row.deviceNumber
      this.editForm.staffName = row.staffName
      this.editForm.productName = row.productName
      this.editForm.productSpecification = row.productSpecification
      this.editForm.productGum = row.productGum
      this.editForm.productUseUnit = row.productUseUnit
      this.editForm.productTotalNumber = row.productTotalNumber
      this.editForm.productQualifiedNumber = row.productQualifiedNumber
      this.editForm.staffShift = row.staffShift
      this.editForm.productTotal = row.productTotal
      this.editForm.remarks = row.remarks
      this.editForm._id = row._id
      this.dialogEditFormVisible = true
      console.log(this.editForm)
    },
    handleDelete (index, row) {
      console.log(index, row)
      console.log(row.productName)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        axios.post('staffDailyProduction/delete', {
          _id: row._id,
          productName: row.productName
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('staffDailyProduction/find').then(
                (response) => {
                  let res = response.data.result
                  for (let i = 0; i < res.length; i++) {
                    res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
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
      console.log(this.editForm.staffDPDay)
      axios.post('staffDailyProduction/edit', {
        staffDPDay: this.editForm.staffDPDay,
        deviceNumber: this.editForm.deviceNumber,
        staffName: this.editForm.staffName,
        productName: this.editForm.productName,
        productSpecification: this.editForm.productSpecification,
        productGum: this.editForm.productGum,
        productUseUnit: this.editForm.productUseUnit,
        productTotalNumber: this.editForm.productTotalNumber,
        productQualifiedNumber: this.editForm.productQualifiedNumber,
        staffShift: this.editForm.staffShift,
        productTotal: this.editForm.productTotal,
        remarks: this.editForm.remarks,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('staffDailyProduction/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
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
      // console.log(this.addForm.staffDPDay)
      // let date = new Date(this.addForm.staffDPDay).toString()
      // console.log(date)
      console.log(this.addForm.staffDPDay)
      axios.post('staffDailyProduction/add', {
        staffDPDay: this.addForm.staffDPDay,
        deviceNumber: this.addForm.deviceNumber,
        staffName: this.addForm.staffName,
        productName: this.addForm.productName,
        productSpecification: this.addForm.productSpecification,
        productGum: this.addForm.productGum,
        productUseUnit: this.addForm.productUseUnit,
        productTotalNumber: this.addForm.productTotalNumber,
        productQualifiedNumber: this.addForm.productQualifiedNumber,
        staffShift: this.addForm.staffShift,
        productTotal: this.addForm.productTotal,
        remarks: this.addForm.remarks
      }).then(
        (response) => {
          let res = response.data
          // console.log(res)
          if (res.status === '0') {
            this.addForm.staffDPDay = ''
            this.addForm.deviceNumber = ''
            this.addForm.staffName = ''
            this.addForm.productName = ''
            this.addForm.productSpecification = ''
            this.addForm.productGum = ''
            this.addForm.productUseUnit = ''
            this.addForm.productTotalNumber = ''
            this.addForm.productQualifiedNumber = ''
            this.addForm.staffShift = ''
            this.addForm.productTotal = ''
            this.addForm.remarks = ''
            axios.post('staffDailyProduction/find').then(
              (response) => {
                let res = response.data.result
                for (let i = 0; i < res.length; i++) {
                  res[i].staffDPDay = new Date(res[i].staffDPDay).toLocaleDateString()
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
