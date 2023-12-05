<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
            <el-breadcrumb-item :to="{ path: '/main/salary' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.role === 1">个人工资</el-breadcrumb-item>
            <el-breadcrumb-item v-if="this.role === 2 || this.role === 3">工资管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 各人工资查看 -->
        <SalaryData v-if="this.role === 1" v-bind:salary="salary" v-bind:payTime="payTime" v-bind:months="months" />
        <!-- 所有员工工资管理 -->
        <SalaryManage v-if="this.role === 2 || this.role === 3" />
    </div>
</template>
<script>
import format from "../../until/formateDate";
const SalaryData = () => import('../../components/SalaryData.vue')
const SalaryManage = () => import('../Admin/SalarysInfo.vue')
export default {
    components: {
        SalaryData,
        SalaryManage
    },
    data() {
        return {
            role: '',
            salary: [],
            payTime: [],
            months: [],
        };
    },
    methods: {
    },
    created() {
        this.role = this.$store.state.loginModule.userInfo.role
    },
    mounted() {
        if (this.role === 1) {
            this.service.post('/employee/Salary', { accounts: this.$store.state.loginModule.userInfo.accounts })
                .then((data) => {
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
        }
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