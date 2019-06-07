<template>
  <div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="deviceNumber"
        label="设备号">
      </el-table-column>
      <el-table-column
        prop="deviceName"
        label="设备名称">
      </el-table-column>
      <el-table-column
        prop="deviceModel"
        label="设备型号">
      </el-table-column>
      <el-table-column
        prop="devicePower"
        label="设备功率">
      </el-table-column>
      <el-table-column
        prop="deviceManufactureDate"
        label="设备出厂日期">
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
          <el-dialog title="修改设备基本信息" :visible.sync="dialogEditFormVisible">
            <el-form :model="editForm">
              <el-form-item label="设备号" :label-width="formLabelWidth">
                <el-input v-model="editForm.deviceNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="设备名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.deviceName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="设备型号" :label-width="formLabelWidth">
                <el-input v-model="editForm.deviceModel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="设备功率" :label-width="formLabelWidth">
                <el-input v-model="editForm.devicePower" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="设备出厂日期" :label-width="formLabelWidth">
                <el-input v-model="editForm.deviceManufactureDate" autocomplete="off"></el-input>
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
    <el-dialog title="添加设备基本信息" :visible.sync="dialogAddFormVisible">
      <el-form :model="addForm">
        <el-form-item label="设备号" :label-width="formLabelWidth">
          <el-input v-model="addForm.deviceNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" :label-width="formLabelWidth">
          <el-input v-model="addForm.deviceModel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备功率" :label-width="formLabelWidth">
          <el-input v-model="addForm.devicePower" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备出厂日期" :label-width="formLabelWidth">
          <el-input v-model="addForm.deviceManufactureDate" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="搜索设备基本信息" :visible.sync="dialogSearchFormVisible">
      <el-form :model="searchForm">
        <el-form-item label="设备号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.deviceNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="searchForm.deviceName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" :label-width="formLabelWidth">
          <el-input v-model="searchForm.deviceModel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备功率" :label-width="formLabelWidth">
          <el-input v-model="searchForm.devicePower" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备出厂日期" :label-width="formLabelWidth">
          <el-input v-model="searchForm.deviceManufactureDate" autocomplete="off"></el-input>
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
  name: 'deviceInformation',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        deviceNumber: '',
        deviceName: '',
        deviceModel: '',
        devicePower: '',
        deviceManufactureDate: '',
        _id: ''
      },
      addForm: {
        deviceNumber: '',
        deviceName: '',
        deviceModel: '',
        devicePower: '',
        deviceManufactureDate: ''
      },
      searchForm: {
        staffDPDay: '',
        deviceNumber: '',
        deviceName: '',
        deviceModel: '',
        devicePower: '',
        deviceManufactureDate: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('deviceInformation/find').then(
      (response) => {
        let res = response.data
        console.log(res.result)
        this.tableData = res.result
        console.log(this.tableData)
      }
    )
  },
  updated () {
  },
  methods: {
    handleRefresh () {
      axios.post('deviceInformation/find').then(
        (response) => {
          let res = response.data
          console.log(res.result)
          this.tableData = res.result
          console.log(this.tableData)
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
      axios.post('deviceInformation/search', {
        deviceNumber: this.searchForm.deviceNumber,
        deviceName: this.searchForm.deviceName,
        deviceModel: this.searchForm.deviceModel,
        devicePower: this.searchForm.devicePower,
        deviceManufactureDate: this.searchForm.deviceManufactureDate
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          this.tableData = res.result
        }
      )
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.editForm.deviceNumber = row.deviceNumber
      this.editForm.deviceName = row.deviceName
      this.editForm.deviceModel = row.deviceModel
      this.editForm.devicePower = row.devicePower
      this.editForm.deviceManufactureDate = row.deviceManufactureDate
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
        axios.post('deviceInformation/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('deviceInformation/find').then(
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
    handleEditCancel () {
      this.dialogEditFormVisible = false
    },
    handleEditConfirm (index, row) {
      console.log(index, row)
      axios.post('deviceInformation/edit', {
        deviceNumber: this.editForm.deviceNumber,
        deviceName: this.editForm.deviceName,
        deviceModel: this.editForm.deviceModel,
        devicePower: this.editForm.devicePower,
        deviceManufactureDate: this.editForm.deviceManufactureDate,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('deviceInformation/find').then(
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
      axios.post('deviceInformation/add', {
        deviceNumber: this.addForm.deviceNumber,
        deviceName: this.addForm.deviceName,
        deviceModel: this.addForm.deviceModel,
        devicePower: this.addForm.devicePower,
        deviceManufactureDate: this.addForm.deviceManufactureDate
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.deviceNumber = ''
            this.addForm.deviceName = ''
            this.addForm.deviceModel = ''
            this.addForm.devicePower = ''
            this.addForm.deviceManufactureDate = ''
            axios.post('deviceInformation/find').then(
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
