<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
      <el-breadcrumb-item :to="{ path: '/employee/salaryinfo' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人工资</el-breadcrumb-item>
    </el-breadcrumb>
    <SalaryData v-bind:salary="salary" v-bind:payTime="payTime" v-bind:months="months" />
  </div>
</template>
<script>
import format from "../../until/formateDate";
import SalaryData from "@/components/SalaryData";
export default {
  components: {
    SalaryData,
  },
  data() {
    return {
      salary: [],
      payTime: [],
      months: [],
    };
  },
  methods: {
  },
  mounted: function () {
    // console.log(this.$route);
    this.service.post('/employee/Salary', { accounts: this.$store.state.loginModule.userInfo.accounts })
      .then((data) => {
        /*   console.log(data.data.salaryInfos); */
        this.salary = data.data.salaryInfos.map((item) => {
          item.payTime = format.formateDate(item.payTime);
          this.payTime = [...this.payTime, { text: item.payTime, value: item.payTime }]
          this.months = [...this.months, { text: item.month, value: item.month }]
          return item;
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
</style>