<template>
    <el-row class="tac" style="height: 100%;">
        <el-menu style="height: 8%;display: flex; align-items: center;flex-direction: row;width: 100%;" class="el-menu-demo"
            mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <div style="width: 20%;"></div>
            <div class="title">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3">消息中心</el-menu-item>
                <el-menu-item index="4"><a style="color: white; text-decoration: none" href="https://www.ele.me"
                        target="_blank">订单管理</a></el-menu-item>
            </div>
            <div class="avatarDiv">
                <img @click="quite" alt="Vue logo" class="avatar" src="../assets/bg1.jpg" />
            </div>
        </el-menu>
        <div style="display: flex;flex-flow: row;height: 92%;">
            <div class="left">
                <el-menu :default-active="this.$route.name" class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-menu-item index="salary">
                        <i class="el-icon-s-home"></i>
                        <span v-if="this.role === 1">个人工资</span>
                        <span v-if="this.role === 2">工资管理</span>
                        <span v-if="this.role === 3">工资管理</span>
                    </el-menu-item>
                    <el-menu-item index="employeeManage" v-if="this.role === 2 || this.role === 3">
                        <i class="el-icon-document"></i>
                        <span slot="title">员工管理</span>
                    </el-menu-item>
                    <el-menu-item index="infoManage">
                        <i class="el-icon-document"></i>
                        <span slot="title">信息管理</span>
                    </el-menu-item>
                    <el-menu-item index="findPassword">
                        <i class="el-icon-setting"></i>
                        <span slot="title">密码找回</span>
                    </el-menu-item>
                    <el-menu-item index="personManage">
                        <i class="el-icon-s-check"></i>
                        <span slot="title">个人中心</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="body">
                <router-view></router-view>
            </div>
        </div>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: "1",
            role: "",
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        quite() {
            this.$router.push("/");
        },
    },
    created() {
        this.role = this.$store.state.loginModule.userInfo.role
    },
};
</script>
<style scoped>
.title {
    display: flex;
    flex-direction: row;
    width: 65%;
    justify-content: space-around;
}

.left {
    width: 20%;
    margin-top: -2px;
    background-color: #545c64;
    overflow: hidden;
}

.avatarDiv {
    width: 15%;
    height: 100%;
    display: flex;
}

.avatar {
    margin: auto 80%;
    width: 40px;
    height: 40px;
    border-radius: 50px;
}

.body {
    width: 80%;
    height: 100%;
    background: rgba(237, 237, 243);
    overflow: scroll;
}
</style>