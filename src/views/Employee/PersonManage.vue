<template>
    <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
            <el-breadcrumb-item :to="{ path: '/main/salary' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        <EmployeeInfo v-if="this.role === 1" />
        <AdminInfo v-if="this.role === 2" />
    </div>
</template>
<script>
const EmployeeInfo = () => import('../Employee/PersonInfo.vue')
const AdminInfo = () => import('../Admin/AdminInfo.vue')
export default {
    components: {
        EmployeeInfo,
        AdminInfo
    },
    data() {
        return {
            role: ''
        };
    },
    created: function () {
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

.info {
    background-color: #fff;
    margin: 0 50px 0 50px;
    padding: 50px 50px 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid rgba(220, 220, 220, 0.8);
    box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}

.info1 {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
}

.text {
    width: 50%;
    font-size: 18px;
    text-align: left;
}
</style>