<template>
  <div>
    <div class="employeesinfo">
      <div class="employees_head">
        <el-button type="primary" size="medium" @click="SalaryDia('新增工资')">新增工资</el-button>
        <el-input style="width: 30%" v-model="search" size="medium" prefix-icon="el-icon-search" placeholder="输入关键字姓名搜索" />
      </div>
      <div class="employees_table">
        <el-table :data="this.salarys
          .slice((currentPage - 1) * pagesize, currentPage * pagesize)
          .filter(
            (data) =>
              !search ||
              data.name.toLowerCase().includes(search.toLowerCase())
          )
          " border :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }"
          id="bady_table">
          <el-table-column prop="accounts" width="55" label="工号">
          </el-table-column>
          <el-table-column prop="month" width="80" label="月份">
          </el-table-column>
          <el-table-column prop="name" width="60" label="姓名">
          </el-table-column>
          <el-table-column prop="basicSalary" width="60" label="基本工资">
          </el-table-column>
          <el-table-column prop="senioritySalary" width="60" label="工资工龄"></el-table-column>
          <el-table-column prop="postSubsidy" width="60" label="岗位补贴">
          </el-table-column>
          <el-table-column prop="postAllowance" width="60" label="岗位津贴">
          </el-table-column>
          <el-table-column prop="monthlyBonus" width="60" label="月奖金">
          </el-table-column>
          <el-table-column prop="endowmentInsurance" width="60" label="养老保险">
          </el-table-column>
          <el-table-column prop="accumulationFund" width="60" label="公积金">
          </el-table-column>
          <el-table-column prop="medicalInsurance" width="60" label="医疗保险">
          </el-table-column>
          <el-table-column prop="unemploymentInsurance" width="60" label="失业保险">
          </el-table-column>
          <el-table-column prop="transportationSubsidy" width="60" label="交通补贴">
          </el-table-column>
          <el-table-column prop="performanceSalary" width="60" label="岗位绩效工资">
          </el-table-column>
          <el-table-column prop="halfAward" width="60" label="半年奖">
          </el-table-column>
          <el-table-column prop="annualBonus" width="60" label="年终奖">
          </el-table-column>
          <el-table-column width="120" label="功能">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" style="margin-bottom: 8px"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <template>
                <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check"
                  icon-color="#007bff" title="个人信息内容确定修改吗？" @confirm="handleDelete(scope.$index, scope.row)">
                  <el-button size="mini" slot="reference" type="danger" icon="el-icon-delete"
                    style="margin-left: 0px">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="employee_tail">
        <span class="employee_pag">共 {{ this.salarys.length }} 条</span>
        <el-pagination background layout="prev, pager, next" :total="this.salarys.length" :current-page="currentPage"
          :page-size="pagesize" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="this.status" :visible.sync="dialogTableVisible" width="50%" top="20px">
      <el-form :label-position="labelPosition" label-width="100px" style="width: 60%; margin-left: 10%" :model="formData"
        class="demo-ruleForm">
        <el-form-item label="工号">
          <el-input v-model="formData.accounts" :disabled="this.status === '更新工资' ? true : false"></el-input>
        </el-form-item>
        <el-form-item label="月份">
          <el-select v-model="formData.month" :disabled="this.status === '更新工资' ? true : false" placeholder="请选择活动区域"
            style="float: left; width: 100%">
            <el-option label="一月" value="一月"></el-option>
            <el-option label="二月" value="二月"></el-option>
            <el-option label="三月" value="三月"></el-option>
            <el-option label="四月" value="四月"></el-option>
            <el-option label="五月" value="五月"></el-option>
            <el-option label="六月" value="六月"></el-option>
            <el-option label="七月" value="七月"></el-option>
            <el-option label="八月" value="八月"></el-option>
            <el-option label="九月" value="九月"></el-option>
            <el-option label="十月" value="十月"></el-option>
            <el-option label="十一月" value="十一月"></el-option>
            <el-option label="十二月" value="十二月"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formData.name" :disabled="this.status === '更新工资' ? true : false"></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="formData.basicSalary"></el-input>
        </el-form-item>
        <el-form-item label="工资工龄">
          <el-input v-model="formData.senioritySalary"></el-input>
        </el-form-item>
        <el-form-item label="岗位补贴">
          <el-input v-model="formData.postSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位津贴">
          <el-input v-model="formData.postAllowance"></el-input>
        </el-form-item>
        <el-form-item label="月奖金">
          <el-input v-model="formData.monthlyBonus"></el-input>
        </el-form-item>
        <el-form-item label="养老保险">
          <el-input v-model="formData.endowmentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="公积金">
          <el-input v-model="formData.accumulationFund"></el-input>
        </el-form-item>
        <el-form-item label="医疗保险">
          <el-input v-model="formData.medicalInsurance"></el-input>
        </el-form-item>
        <el-form-item label="失业保险">
          <el-input v-model="formData.unemploymentInsurance"></el-input>
        </el-form-item>
        <el-form-item label="交通补贴">
          <el-input v-model="formData.transportationSubsidy"></el-input>
        </el-form-item>
        <el-form-item label="岗位绩效工资">
          <el-input v-model="formData.performanceSalary"></el-input>
        </el-form-item>
        <el-form-item label="半年奖">
          <el-input v-model="formData.halfAward"></el-input>
        </el-form-item>
        <el-form-item label="年终奖">
          <el-input v-model="formData.annualBonus"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check"
              icon-color="#007bff" title="个人信息内容确定修改吗？" @confirm="onsubmit">
              <el-button slot="reference" type="primary">确定修改</el-button>
            </el-popconfirm>

            <el-button style="margin-left: 22px" type="success" @click="onClear">清空表单</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import format from "../../until/formateDate";
export default {
  name: "SalaryData",
  data() {
    return {
      salarys: [],
      search: "",
      currentPage: 1, //初始页
      pagesize: 5, //    每页的数据
      dialogTableVisible: false,//弹框
      status: '',
      labelPosition: "left",
      formData: {
        accounts: "",
        name: "",
        month: "",
        basicSalary: "",
        senioritySalary: "",
        postSubsidy: "",
        postAllowance: "",
        monthlyBonus: "",
        endowmentInsurance: "",
        accumulationFund: "",
        medicalInsurance: "",
        unemploymentInsurance: "",
        transportationSubsidy: "",
        performanceSalary: "",
        halfAward: "",
        annualBonus: "",
      },
    };
  },
  methods: {
    /* 拿到所有工资信息 */
    getSalaryinfos() {
      this.service.get('/employees/salary').then((res) => {
        this.salarys = res.data.lists.map((item) => {
          item.payTime = format.formateDate(item.payTime);
          return item;
        });
      })
        .catch((error) => {
          console.log(error);
        });
    },
    /*  新增或者更新工资对话框 */
    SalaryDia(e) {
      this.status = e
      this.dialogTableVisible = true;
    },
   /*  新增或者更新工资接口 */
    onsubmit() {
      if (this.status === '新增工资') {
        this.service.post('/employee/salary/add', this.formData)
      } else {
        this.service.post('employee/salary/edit', this.formData)
      }
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onClear() {
      this.formData = ''
    },
    /* 编辑对应的工号工资 */
    handleEdit(index, row) {
      this.SalaryDia('更新工资')
      this.formData = row;
    },
   /*  删除对应的工号工资 */
    handleDelete(index, row) {
      this.service.post('/employee/salary/delete', { id: row.id });
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  created() {
    this.getSalaryinfos()
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

#bady_table {
  /* width: 1100px; */
  margin: 20px 0 20px 0;
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