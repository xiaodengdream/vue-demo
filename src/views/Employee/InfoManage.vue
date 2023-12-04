<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
            <el-breadcrumb-item :to="{ path: '/main/salary' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>信息管理</el-breadcrumb-item>
        </el-breadcrumb>
        <EmployeeInfoUp v-if="this.role === 1" />
        <AdminInfoUp v-if="this.role === 2" />
        <SeniorInfoUp v-if="this.role === 3" />
    </div>
</template>
<script>
const EmployeeInfoUp = () => import('../Employee/InfoUpdate.vue')
const AdminInfoUp = () => import('../Admin/AdmInfoUpdate.vue')
const SeniorInfoUp = () => import('../SeniorAdmin/SeniorUpdate.vue')
export default {
    components: {
        EmployeeInfoUp,
        AdminInfoUp,
        SeniorInfoUp
    },
    data() {
        return {
            role: ''
        };
    },
    methods: {

    },
    created() {
        this.role = this.$store.state.loginModule.userInfo.role
    }

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

.body_form {
    width: 80%;
    margin: 0 0 20px 10%;
    background-color: #fff;
    border: 1px solid rgba(220, 220, 220, 0.8);
    box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}
</style>