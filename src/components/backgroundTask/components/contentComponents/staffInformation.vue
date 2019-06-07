<template>
 <div>
   <el-table
    :data="tableData"
   >
     <el-table-column
       prop="staffNumber"
       label="编号">
     </el-table-column>
     <el-table-column
       prop="staffName"
       label="姓名">
     </el-table-column>
     <el-table-column
       prop="staffAge"
       label="年龄">
     </el-table-column>
     <el-table-column
       prop="staffGender"
       label="性别">
     </el-table-column>
     <el-table-column
       prop="staffEntryYear"
       label="入职年份">
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
         <el-dialog title="修改员工信息" :visible.sync="dialogEditFormVisible">
           <el-form :model="editForm">
             <el-form-item label="编号" :label-width="formLabelWidth">
               <el-input v-model="editForm.staffNumber" autocomplete="off"></el-input>
             </el-form-item>
             <el-form-item label="姓名" :label-width="formLabelWidth">
               <el-input v-model="editForm.staffName" autocomplete="off"></el-input>
             </el-form-item>
             <el-form-item label="年龄" :label-width="formLabelWidth">
               <el-input v-model="editForm.staffAge" autocomplete="off"></el-input>
             </el-form-item>
             <el-form-item label="性别" :label-width="formLabelWidth">
               <el-input v-model="editForm.staffGender" autocomplete="off"></el-input>
             </el-form-item>
             <el-form-item label="入职年份" :label-width="formLabelWidth">
               <el-input v-model="editForm.staffEntryYear" autocomplete="off"></el-input>
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
   <el-dialog title="添加员工信息" :visible.sync="dialogAddFormVisible">
     <el-form :model="addForm">
       <el-form-item label="编号" :label-width="formLabelWidth">
         <el-input v-model="addForm.staffNumber" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="姓名" :label-width="formLabelWidth">
         <el-input v-model="addForm.staffName" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="年龄" :label-width="formLabelWidth">
         <el-input v-model="addForm.staffAge" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="性别" :label-width="formLabelWidth">
         <el-input v-model="addForm.staffGender" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="入职年份" :label-width="formLabelWidth">
         <el-input v-model="addForm.staffEntryYear" autocomplete="off"></el-input>
       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="handleAddCancel">取 消</el-button>
       <el-button type="primary" @click="handleAddConfirm">确 定</el-button>
     </div>
   </el-dialog>
   <el-dialog title="搜索员工信息" :visible.sync="dialogSearchFormVisible">
     <el-form :model="addForm">
       <el-form-item label="编号" :label-width="formLabelWidth">
         <el-input v-model="searchForm.staffNumber" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="姓名" :label-width="formLabelWidth">
         <el-input v-model="searchForm.staffName" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="年龄" :label-width="formLabelWidth">
         <el-input v-model="searchForm.staffAge" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="性别" :label-width="formLabelWidth">
         <el-input v-model="searchForm.staffGender" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="入职年份" :label-width="formLabelWidth">
         <el-input v-model="searchForm.staffEntryYear" autocomplete="off"></el-input>
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
  name: 'staffInformation',
  data () {
    return {
      index: '',
      row: '',
      tableData: [],
      editForm: {
        staffNumber: '',
        staffName: '',
        staffAge: '',
        staffGender: '',
        staffEntryYear: '',
        _id: ''
      },
      addForm: {
        staffNumber: '',
        staffName: '',
        staffAge: '',
        staffGender: '',
        staffEntryYear: ''
      },
      searchForm: {
        staffNumber: '',
        staffName: '',
        staffAge: '',
        staffGender: '',
        staffEntryYear: ''
      },
      dialogEditFormVisible: false,
      dialogAddFormVisible: false,
      dialogSearchFormVisible: false,
      formLabelWidth: '80px'
    }
  },
  mounted () {
    axios.post('staffInformation/find').then(
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
      axios.post('staffInformation/find').then(
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
      axios.post('staffInformation/search', {
        staffNumber: this.searchForm.staffNumber,
        staffName: this.searchForm.staffName,
        staffAge: this.searchForm.staffAge,
        staffGender: this.searchForm.staffGender,
        staffEntryYear: this.searchForm.staffEntryYear
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
      this.editForm.staffGender = row.staffGender
      this.editForm.staffName = row.staffName
      this.editForm.staffEntryYear = row.staffEntryYear
      this.editForm.staffAge = row.staffAge
      this.editForm.staffNumber = row.staffNumber
      this.editForm._id = row._id
      this.dialogEditFormVisible = true
      console.log(this.form)
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
        axios.post('staffInformation/delete', {
          _id: row._id
        }).then(
          (response) => {
            let res = response.data
            console.log(res)
            if (res.status === '0') {
              axios.post('staffInformation/find').then(
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
      axios.post('staffInformation/edit', {
        staffNumber: this.editForm.staffNumber,
        staffName: this.editForm.staffName,
        staffAge: this.editForm.staffAge,
        staffGender: this.editForm.staffGender,
        staffEntryYear: this.editForm.staffEntryYear,
        _id: this.editForm._id
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            axios.post('staffInformation/find').then(
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
      axios.post('staffInformation/add', {
        staffNumber: this.addForm.staffNumber,
        staffName: this.addForm.staffName,
        staffAge: this.addForm.staffAge,
        staffGender: this.addForm.staffGender,
        staffEntryYear: this.addForm.staffEntryYear
      }).then(
        (response) => {
          let res = response.data
          console.log(res)
          if (res.status === '0') {
            this.addForm.staffAge = ''
            this.addForm.staffEntryYear = ''
            this.addForm.staffGender = ''
            this.addForm.staffName = ''
            this.addForm.staffNumber = ''
            axios.post('staffInformation/find').then(
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
