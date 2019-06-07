<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="tableData[props.$index].semiProductionProcessRawMaterial">
              <el-table-column label="原材料名称" prop="rawMaterialName"></el-table-column>
              <el-table-column label="单位" prop="rawMaterialUnit"></el-table-column>
              <el-table-column label="单价" prop="rawMaterialPrice"></el-table-column>
              <el-table-column label="数量" prop="rawMaterialNumber"></el-table-column>
              <el-table-column label="金额" prop="rawMaterialTotalPrice"></el-table-column>
              <el-table-column label="备注" prop="remarks"></el-table-column>
              <el-table-column
                label="操作"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleRawEdit(props.$index ,scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleRawDelete(props.$index ,scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button class="add-icon" icon="el-icon-plus" circle @click="handleRawAdd(props.$index)"></el-button>
            <el-button class="refresh-icon" icon="el-icon-refresh" circle @click="handleRawRefresh(props.$index)"></el-button>
          </template>
      </el-table-column>
      <el-table-column
        label="半成品名称"
        prop="semiProductName">
      </el-table-column>
      <el-table-column
        label="半成品金额"
        prop="semiProductTotalPrice">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSemiEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleSemiDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加半成品生产流程" :visible.sync="dialogRawAddFormVisible">
      <el-form :model="addRawForm">
        <el-form-item label="原材料名称" :label-width="formLabelWidth">
          <el-input v-model="addRawForm.rawMaterialName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="addRawForm.rawMaterialUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="addRawForm.rawMaterialPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="addRawForm.rawMaterialNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="addRawForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleRawAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleRawAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改半成品生产流程" :visible.sync="dialogSemiEditFormVisible">
      <el-form :model="editSemiForm">
        <el-form-item label="半成品名称" :label-width="formLabelWidth">
          <el-input v-model="editSemiForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSemiEditCancel">取 消</el-button>
        <el-button type="primary" @click="handleSemiEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加半成品生产流程" :visible.sync="dialogSemiAddFormVisible">
      <el-form :model="addSemiForm">
        <el-form-item label="半成品名称" :label-width="formLabelWidth">
          <el-input v-model="addSemiForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSemiAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleSemiAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="搜索半成品生产流程" :visible.sync="dialogSemiSearchFormVisible">
      <el-form :model="searchSemiForm">
        <el-form-item label="半成品名称" :label-width="formLabelWidth">
          <el-input v-model="searchSemiForm.semiProductName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleSemiSearchCancel">取 消</el-button>
        <el-button type="primary" @click="handleSemiSearchConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button class="add-icon" icon="el-icon-plus" circle @click="handleSemiAdd"></el-button>
    <el-button class="search-icon" icon="el-icon-search" circle @click="handleSemiSearch"></el-button>
    <el-button class="refresh-icon" icon="el-icon-refresh" circle @click="handleSemiRefresh"></el-button>
    <el-dialog title="修改半成品生产流程" :visible.sync="dialogRawEditFormVisible">
      <el-form :model="editRawForm">
        <el-form-item label="原材料名称" :label-width="formLabelWidth">
          <el-input v-model="editRawForm.rawMaterialName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="editRawForm.rawMaterialUnit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="editRawForm.rawMaterialPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth">
          <el-input v-model="editRawForm.rawMaterialNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editRawForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleRawEditCancel">取 消</el-button>
        <el-button type="primary" @click="handleRawEditConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'semiProductionProcess',
  data () {
    return {
      tableData: [],
      editSemiForm: {
        semiProductName: '',
        _id: ''
      },
      addSemiForm: {
        semiProductName: ''
      },
      searchSemiForm: {
        semiProductName: ''
      },
      editRawForm: {
        rawMaterialName: '',
        rawMaterialUnit: '',
        rawMaterialPrice: '',
        rawMaterialNumber: '',
        remarks: '',
        _id: ''
      },
      addRawForm: {
        rawMaterialName: '',
        rawMaterialUnit: '',
        rawMaterialPrice: '',
        rawMaterialNumber: '',
        remarks: '',
        semi_id: ''
      },
      dialogSemiEditFormVisible: false,
      dialogSemiAddFormVisible: false,
      dialogRawEditFormVisible: false,
      dialogRawAddFormVisible: false,
      dialogSemiSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('semiProductionProcess/find').then(
      (response) => {
        let res = response.data
        console.log(res.result)
        this.tableData = res.result
        console.log(this.tableData)
      }
    )
  },
  methods: {
    handleSemiRefresh () {
      axios.post('semiProductionProcess/find').then(
        (response) => {
          let res = response.data
          console.log(res.result)
          this.tableData = res.result
          console.log(this.tableData)
        }
      )
    },
    handleSemiSearch () {
      this.dialogSemiSearchFormVisible = true
    },
    handleSemiSearchCancel () {
      this.dialogSemiSearchFormVisible = false
    },
    handleSemiSearchConfirm () {
      this.dialogSemiSearchFormVisible = false
      axios.post('semiProductionProcess/search', {
        semiProductName: this.searchSemiForm.semiProductName
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          this.tableData = res.result
        }
      )
    },
    handleSemiEdit (index, row) {
      console.log(index, row)
      this.editSemiForm.semiProductName = row.semiProductName
      this.editSemiForm._id = row._id
      this.dialogSemiEditFormVisible = true
      console.log(this.editForm)
    },
    handleSemiDelete (index, row) {
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
        axios.post('semiProductionProcess/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('semiProductionProcess/find').then(
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
    handleSemiEditCancel () {
      this.dialogSemiEditFormVisible = false
    },
    handleSemiEditConfirm (index, row) {
      console.log(index, row)
      axios.post('semiProductionProcess/edit', {
        semiProductName: this.editSemiForm.semiProductName,
        _id: this.editSemiForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('semiProductionProcess/find').then(
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
    handleSemiAdd () {
      this.dialogSemiAddFormVisible = true
    },
    handleSemiAddCancel () {
      this.dialogSemiAddFormVisible = false
    },
    handleSemiAddConfirm () {
      this.dialogSemiAddFormVisible = false
      axios.post('semiProductionProcess/add', {
        semiProductName: this.addSemiForm.semiProductName
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addSemiForm.semiProductName = ''
            axios.post('semiProductionProcess/find').then(
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
    handleRawRefresh (index) {
      console.log(this.tableData[index]._id)
      axios.post('semiProductionProcess/calculate', {
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
    handleRawDelete (prop, index, row) {
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
        axios.post('semiProductionProcess/deleteRaw', {
          semiProduct_id: this.tableData[prop]._id,
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('semiProductionProcess/find').then(
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
    handleRawEdit (prop, index, row) {
      console.log(prop, index, row)
      this.editRawForm.rawMaterialName = row.rawMaterialName
      this.editRawForm.rawMaterialUnit = row.rawMaterialUnit
      this.editRawForm.rawMaterialPrice = row.rawMaterialPrice
      this.editRawForm.rawMaterialNumber = row.rawMaterialNumber
      this.editRawForm.remarks = row.remarks
      this.editRawForm._id = row._id
      this.dialogRawEditFormVisible = true
      console.log(this.editRawForm)
    },
    handleRawEditCancel () {
      this.dialogRawEditFormVisible = false
    },
    handleRawEditConfirm (index, row) {
      console.log(index, row)
      console.log(this.editRawForm)
      axios.post('semiProductionProcess/editRaw', {
        rawMaterialName: this.editRawForm.rawMaterialName,
        rawMaterialUnit: this.editRawForm.rawMaterialUnit,
        rawMaterialPrice: this.editRawForm.rawMaterialPrice,
        rawMaterialNumber: this.editRawForm.rawMaterialNumber,
        remarks: this.editRawForm.remarks,
        _id: this.editRawForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('semiProductionProcess/find').then(
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
      this.dialogRawEditFormVisible = false
    },
    handleRawAdd (index) {
      console.log(index)
      console.log(this.tableData[index]._id)
      this.addRawForm.semi_id = this.tableData[index]._id
      this.dialogRawAddFormVisible = true
    },
    handleRawAddCancel () {
      this.dialogRawAddFormVisible = false
    },
    handleRawAddConfirm () {
      this.dialogRawAddFormVisible = false
      axios.post('semiProductionProcess/addRaw', {
        rawMaterialName: this.addRawForm.rawMaterialName,
        rawMaterialUnit: this.addRawForm.rawMaterialUnit,
        rawMaterialPrice: this.addRawForm.rawMaterialPrice,
        rawMaterialNumber: this.addRawForm.rawMaterialNumber,
        remarks: this.addRawForm.remarks,
        semi_id: this.addRawForm.semi_id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addRawForm.rawMaterialName = ''
            this.addRawForm.rawMaterialUnit = ''
            this.addRawForm.rawMaterialPrice = ''
            this.addRawForm.rawMaterialNumber = ''
            this.addRawForm.remarks = ''
            axios.post('semiProductionProcess/find').then(
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
