<template>
  <div>
    <el-table
      :data="tableData"
    >
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="userPwd"
        label="用户密码">
      </el-table-column>
      <el-table-column
        prop="userPermission"
        label="用户权限">
      </el-table-column>
      <el-table-column
        prop="userCompanyName"
        label="公司名称">
      </el-table-column>
      <el-table-column
        prop="userCompanyAddress"
        label="公司地址">
      </el-table-column>
      <el-table-column
        prop="userPhoneNumber"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="userFax"
        label="传真">
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
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="editForm.userName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户密码" :label-width="formLabelWidth">
                <el-input v-model="editForm.userPwd" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户权限" :label-width="formLabelWidth">
                <el-input v-model="editForm.userPermission" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" :label-width="formLabelWidth">
                <el-input v-model="editForm.userCompanyName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公司地址" :label-width="formLabelWidth">
                <el-input v-model="editForm.userCompanyAddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="editForm.userPhoneNumber" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="editForm.userEmail" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="传真" :label-width="formLabelWidth">
                <el-input v-model="editForm.userFax" autocomplete="off"></el-input>
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
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="addForm.userPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-input v-model="addForm.userPermission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.userCompanyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="addForm.userCompanyAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addForm.userPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addForm.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth">
          <el-input v-model="addForm.userFax" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleAddCancel">取 消</el-button>
        <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="搜索用户信息" :visible.sync="dialogSearchFormVisible">
      <el-form :model="searchForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userPermission" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司名称" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userCompanyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司地址" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userCompanyAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userPhoneNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userEmail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="传真" :label-width="formLabelWidth">
          <el-input v-model="searchForm.userFax" autocomplete="off"></el-input>
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
  name: 'userInformation',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        userName: '',
        userPwd: '',
        userPermission: '',
        userCompanyName: '',
        userCompanyAddress: '',
        userPhoneNumber: '',
        userEmail: '',
        userFax: '',
        _id: ''
      },
      addForm: {
        userName: '',
        userPwd: '',
        userPermission: '',
        userCompanyName: '',
        userCompanyAddress: '',
        userPhoneNumber: '',
        userEmail: '',
        userFax: ''
      },
      searchForm: {
        userName: '',
        userPwd: '',
        userPermission: '',
        userCompanyName: '',
        userCompanyAddress: '',
        userPhoneNumber: '',
        userEmail: '',
        userFax: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('userInformation/find').then(
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
      axios.post('userInformation/find').then(
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
      axios.post('userInformation/search', {
        userName: this.searchForm.userName,
        userPwd: this.searchForm.userPwd,
        userPermission: this.searchForm.userPermission,
        userCompanyName: this.searchForm.userCompanyName,
        userCompanyAddress: this.searchForm.userCompanyAddress,
        userPhoneNumber: this.searchForm.userPhoneNumber,
        userEmail: this.searchForm.userEmail,
        userFax: this.searchForm.userFax
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
      this.editForm.userName = row.userName
      this.editForm.userPwd = row.userPwd
      this.editForm.userPermission = row.userPermission
      this.editForm.userCompanyName = row.userCompanyName
      this.editForm.userCompanyAddress = row.userCompanyAddress
      this.editForm.userPhoneNumber = row.userPhoneNumber
      this.editForm.userEmail = row.userEmail
      this.editForm.userFax = row.userFax
      this.editForm.userPermission = row.userPermission
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
        axios.post('userInformation/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('userInformation/find').then(
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
      axios.post('userInformation/edit', {
        userName: this.editForm.userName,
        userPwd: this.editForm.userPwd,
        userPermission: this.editForm.userPermission,
        userCompanyName: this.editForm.userCompanyName,
        userCompanyAddress: this.editForm.userCompanyAddress,
        userPhoneNumber: this.editForm.userPhoneNumber,
        userEmail: this.editForm.userEmail,
        userFax: this.editForm.userFax,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('userInformation/find').then(
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
      axios.post('userInformation/add', {
        userName: this.addForm.userName,
        userPwd: this.addForm.userPwd,
        userPermission: this.addForm.userPermission,
        userCompanyName: this.addForm.userCompanyName,
        userCompanyAddress: this.addForm.userCompanyAddress,
        userPhoneNumber: this.addForm.userPhoneNumber,
        userEmail: this.addForm.userEmail,
        userFax: this.addForm.userFax
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.userName = ''
            this.addForm.userPwd = ''
            this.addForm.userPermission = ''
            this.addForm.userCompanyName = ''
            this.addForm.userCompanyAddress = ''
            this.addForm.userPhoneNumber = ''
            this.addForm.userEmail = ''
            this.addForm.userFax = ''
            axios.post('userInformation/find').then(
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
