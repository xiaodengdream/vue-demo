<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" id="body_title">
            <el-breadcrumb-item v-if="vs1" :to="{ path: '/main/salary' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>密码找回</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <div class="input">
                <span class="text1">输入手机号:</span>
                <el-input v-model="phone" style="width: 30%; margin: 0 10px 0 10px"></el-input>
                <el-button v-show="show1" style="margin-left: 20px" type="success" @click="getCode">获取验证码</el-button>
            </div>
            <div class="vd">
                <span class="text1">验证码:</span>
                <el-input v-model="inputvd" style="width: 20%; margin: 0 10px 0 10px"></el-input><span v-show="show2"
                    style="padding: 5px; background: #13ce66; color: white">{{ vcode }}</span>
                <el-button v-show="show2" style="margin-left: 20px" type="success" @click="next">下一步</el-button>
            </div>
            <div class="vd">
                <span class="text1">你的密码:</span>
                <el-input v-model="password" disabled style="width: 20%; margin: 0 10px 0 10px"></el-input>
                <el-button v-show="show3" style="margin-left: 20px" type="success" @click="done">完成</el-button>
            </div>
            <div class="vd">
                <span class="text1"></span>
                <el-button style="margin-left: 10px" type="success" @click="goback">上一步</el-button>
            </div>
            <div class="step">
                <el-steps :active="step" finish-status="success" :align-center="true">
                    <el-step title="验证码"></el-step>
                    <el-step title="进行中"></el-step>
                    <el-step title="已完成"></el-step>
                </el-steps>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show1: true,
            show2: false,
            show3: false,
            phone: "",
            vcode: "",
            inputvd: "",
            password: "",
            step: 1,
            vs1: "",
            vs2: "",
            userInfo: "",
        };
    },
    mounted() {
        if (this.$store.state.loginModule.userInfo) {
            this.userInfo = this.$store.state.loginModule.userInfo
            this.vs1 = true;
            this.vs2 = false;
        } else {
            this.vs1 = false;
            this.vs2 = true;
        }
    },
    methods: {
        //拿到验证码
        getCode() {
            if (this.userInfo) {
                if (this.userInfo.telephone === this.phone) {
                    this.show1 = false;
                    this.show2 = true;
                    this.step = 2;
                    this.vcode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                } else {
                    this.$message({
                        showClose: true,
                        message: "手机号错误",
                        type: "warning",
                        duration: 1000,
                    });
                }
            }
        },
        //下一步
        next() {
            if (this.vcode == this.inputvd) {
                this.show2 = false;
                this.show3 = true;
                this.step = 3;
                this.password = this.userInfo.password;
            } else {
                this.$message({
                    showClose: true,
                    message: "验证码不对",
                    type: "warning",
                    duration: 1000,
                });
            }
        },
        done() { },
        //返回上一步
        goback() {
            if (this.show3 == true) {
                this.show3 = false;
                this.show2 = true;
                this.step = 2;
            } else if (this.show2 == true) {
                this.show3 = false;
                this.show2 = false;
                this.show1 = true;
                this.step = 1;
            } else if (this.show1 == true) {
                this.$message({
                    showClose: true,
                    message: "最上面了",
                    type: "warning",
                    duration: 1000,
                });
            }
        },
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

.content {
    width: 80%;
    margin: 0 0 0 10%;
    background-color: #fff;
    border: 1px solid rgba(220, 220, 220, 0.8);
    box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}

.input {
    margin: 80px 0 25px 0;
    padding: 0 0 0 10px;
    display: flex;
    align-items: center;
}

.vd {
    margin: 0 0 25px 0;
    padding: 0 0 0 10px;
    display: flex;
    align-items: center;
}

.text1 {
    width: 20%;
    text-align: right;
}

.step {
    margin: 160px 0 50px 0;
    width: 100%;
}
</style>