<template>
  <div>
    <div class="employeesinfo">
      <div class="employees_head">
        <el-dropdown>
          <el-button type="primary" size="medium">新增用户<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="addEmployee('新增员工信息')">普通员工</el-dropdown-item>
            <el-dropdown-item @click.native="addAdmin('新增二级管理员信息')">二级管理</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-input style="width: 30%" v-model="search" size="medium" prefix-icon="el-icon-search" placeholder="输入关键字搜索" />
      </div>
      <div class="employees_table">
        <el-table border :data="tableData
          .slice((currentPage - 1) * pagesize, currentPage * pagesize)
          .filter(
            (data) =>
              !search ||
              data.accounts.toLowerCase().includes(search.toLowerCase()) ||
              data.name.toLowerCase().includes(search.toLowerCase()) ||
              data.department.toLowerCase().includes(search.toLowerCase())
          )
          " style="width: 100%"><el-table-column type="index" label="#" width="50">
          </el-table-column>
          <el-table-column label="工号" prop="accounts" width="80">
          </el-table-column>
          <el-table-column label="名字" prop="name" width="80">
          </el-table-column>
          <el-table-column label="职称" prop="professional" width="80">
          </el-table-column>
          <el-table-column label="岗位类型" prop="posttype" width="80">
          </el-table-column>
          <el-table-column label="科室" prop="department" width="80">
          </el-table-column>
          <el-table-column label="电话" prop="telephone" width="110">
          </el-table-column>
          <el-table-column label="身份证" prop="idcard"> </el-table-column>
          <el-table-column label="邮件" prop="email"> </el-table-column>
          <el-table-column width="260" label="功能">
            <template slot-scope="scope">
              <el-button size="mini" type="success" icon="el-icon-search"
                @click="handleSee(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="primary" icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <template>
                <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check"
                  icon-color="#007bff" title="个人信息内容确定修改吗？" @confirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" slot="reference" type="danger" icon="el-icon-delete"
                    style="margin-left: 10px">删除</el-button>
                </el-popconfirm>
              </template>

              <!-- <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="employee_tail">
        <span class="employee_pag">共 {{ this.tableData.length }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="this.tableData.length" :current-page="currentPage"
          :page-size="pagesize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="工资信息" :visible.sync="salaryDialog" width="80%" top="20px">
      <SalaryData v-bind:salary="salary" v-bind:payTime="payTime" v-bind:months="months" />
    </el-dialog>
    <el-dialog :title=this.employeeStatus :visible.sync="employeeDialog" width="50%" top="20px">
      <el-form :model="userinfo" :label-position="labelPosition" label-width="100px" style="width: 60%; margin-left: 10%"
        class="demo-ruleForm">
        <el-form-item label="工号">
          <el-input v-model="userinfo.accounts"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userinfo.name"></el-input>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="userinfo.professional"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="userinfo.idcard"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="userinfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="userinfo.department"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="userinfo.password"></el-input>
        </el-form-item>
        <el-form-item label="岗位类型">
          <el-select v-model="userinfo.posttype" placeholder="请选择活动区域" style="float: left; width: 100%">
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check"
              icon-color="#007bff" title="个人信息内容确定更新吗？" @confirm="onSubmit">
              <el-button slot="reference" type="primary" v-if="this.employeeStatus == '更新员工信息'">确定更新</el-button>
              <el-button slot="reference" type="primary" v-else-if="this.employeeStatus == '新增员工信息'">确定新增</el-button>
            </el-popconfirm>
            <el-button style="margin-left: 22px" type="success" @click='clearForm'>清空表单</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title=this.adminStatus :visible.sync="adminDialog" width="50%" top="20px">
      <el-form :model="adminInfo" :label-position="labelPosition" label-width="100px" style="width: 60%; margin-left: 10%"
        class="demo-ruleForm">
        <el-form-item label="工号">
          <el-input v-model="adminInfo.accounts"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="adminInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="adminInfo.idcard"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="adminInfo.telephone"></el-input>
        </el-form-item>
        <el-form-item label="科室">
          <el-input v-model="adminInfo.department"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="adminInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check"
              icon-color="#007bff" title="个人信息内容确定更新吗？" @confirm="onSubmitAdmin">
              <el-button slot="reference" type="primary" v-if="this.adminStatus == '新增二级管理员信息'">确定新增</el-button>
              <el-button slot="reference" type="primary" v-else-if="this.adminStatus == '更新二级管理员信息'">确定更新</el-button>
            </el-popconfirm>
            <el-button style="margin-left: 22px" type="success" @click="clearForm">清空表单</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import format from "../../until/formateDate";
const SalaryData = () =>import('../../components/SalaryData.vue')
export default {
  components: {
    SalaryData,
  },
  data() {
    return {
      tableData: [],
      salary: [],
      payTime: [],
      months: [],
      search: "",
      currentPage: 1,       //初始页
      pagesize: 5,          //每页的数据
      salaryDialog: false,  //查看信息弹框
      employeeDialog: false,//员工信息新增或者更新弹框
      adminDialog: false,   //二级管理员信息新增或者更新弹框
      labelPosition: "left",
      employeeStatus: '',   //员工信息新增或者更新状态
      adminStatus: '',       //二级管理员新增或者更新状态
      userinfo: {
        accounts: '',
        name: '',
        professional: '',
        email: '',
        idcard: '',
        telephone: '',
        department: '',
        password: '',
        posttype: '',
      },
      adminInfo: {
        accounts: '',
        email: '',
        idcard: '',
        telephone: '',
        department: '',
        posttype: '',
      }
    };
  },
  methods: {
    /* 获取所有员工信息 */
    getUsers() {
      this.service.get('/employee/infos')
        .then((res) => {
          this.tableData = res.data.users;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* 获取所有管理员信息 */
    getAdmins() {
      this.service.get('/admin/infos')
        .then((res) => {
          this.tableData = this.tableData.concat(res.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* 新增员工弹框 */
    addEmployee(e) {
      this.employeeStatus = e
      this.employeeDialog = true;
    },
    /* 新增管理员弹框 */
    addAdmin(e) {
      this.adminStatus = e
      this.adminDialog = true;
    },
    /* 员工信息新增和更新 */
    onSubmit() {
      var url = ''
      if (this.employeeStatus === '新增员工信息') {
        url = '/employee/register'
        delete this.userinfo.id
      } else if (this.employeeStatus === '更新员工信息') {
        url = '/employee/infoUpdates'
      }
      if (
        this.userinfo.accounts == "" ||
        this.userinfo.name == "" ||
        this.userinfo.professional == "" ||
        this.userinfo.email == "" ||
        this.userinfo.idcard == "" ||
        this.userinfo.telephone == "" ||
        this.userinfo.department == "" ||
        this.userinfo.posttype == "" ||
        this.userinfo.password == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        this.service.post(url, this.userinfo)
          .then((res) => {
            if (res.data.result) {
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
      }
    },
    /* 二级管理员信息新增和更新 */
    onSubmitAdmin() {
      var url = ''
      if (this.adminStatus === '新增二级管理员信息') {
        url = '/admin/register'
        delete this.adminInfo.id
      } else if (this.adminStatus === '更新二级管理员信息') {
        url = '/admin/infoUpdates'
      }
      if (
        this.adminInfo.accounts == "" ||
        this.adminInfo.email == "" ||
        this.adminInfo.idcard == "" ||
        this.adminInfo.telephone == "" ||
        this.adminInfo.department == "" ||
        this.adminInfo.password == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空",
          type: "error",
          duration: 1000,
        });
      } else {
        this.service.post(url, this.adminInfo)
          .then((res) => {
            if (res.data.result) {
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          })
      }
    },
    /* 查看个人工资 */
    handleSee(index, row) {
      this.service.post('/employee/Salary', { accounts: row.accounts })
        .then((res) => {
          if (res.data.salaryInfos.length !== 0) {
            this.salary = res.data.salaryInfos.map((item) => {
              item.payTime = format.formateDate(item.payTime);
              return item;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.salaryDialog = true;
    },
    /* 编辑个人信息 */
    handleEdit(index, row) {
      if (row.name) {
        this.employeeStatus = '更新员工信息'
        this.employeeDialog = true;//员工编辑
        this.userinfo = row;
      } else {
        this.adminStatus = '更新二级管理员信息'
        this.adminDialog = true;//二级管理员编辑
        this.adminInfo = row
      }
    },
    /* 删除个人信息 */
    handleDelete(index, row) {
      let url = ''
      if (row.name) {
        url = 'employee/infodelete'
      } else {
        url = '/admin/infodelete'
      }
      this.service.post(url, { id: row.id })
        .then((res) => {
          if (res.data.result) {
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        })
    },
    /* 清空表单 */
    clearForm() {
      this.userinfo = '',
        this.adminInfo = ''
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    this.getUsers()
    this.getAdmins()
  },
};
</script>
<style scoped>
#body_title {
  font-size: 16px;
  height: 12%;
  display: flex;
  align-items: center;
  margin: 28px 0 28px 50px;
}

.employeesinfo {
  margin: 0 50px 20px 50px;
  padding: 50px 50px 50px 50px;
  border: 1px solid rgba(220, 220, 220, 0.8);
  background-color: white;
  box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}

.employees_table {
  margin: 20px 0 20px 0;
}

.employees_head {
  display: flex;
  justify-content: space-between;
}

.employee_tail {
  display: flex;
  align-items: center;
}

.employee_pag {
  font-size: 14px;
  color: rgba(120, 120, 120, 1);
  background: rgba(244, 244, 255, 0.8);
  padding: 5px;
  border-radius: 5px;
}
</style>