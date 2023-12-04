<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
            <el-breadcrumb-item :to="{ path: '/main/salary' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        </el-breadcrumb>
        <Employee v-if="this.role == 2" /><!-- 二级管理原员工管理 -->
        <Employees v-if="this.role == 3" /><!-- 一级管理员工管理 -->
    </div>
</template>
<script>
const Employee = () => import('../Admin/Employees.vue')
const Employees = () => import('../SeniorAdmin/Allemployees.vue')
export default {
    components: {
        Employee,
        Employees
    },
    data() {
        return {
        };
    },
    methods: {

    },
    created() {
        this.role = this.$store.state.loginModule.userInfo.role
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