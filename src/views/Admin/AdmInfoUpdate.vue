<template>
  <div class="body_form">
    <el-form ref="form" :model="formData" label-width="80px" :label-position="labelPosition"
      style="width: 40%; margin: 5% 5% 5% 5%">
      <el-form-item label="工号">
        <el-input v-model="formData.accounts" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="formData.email" @blur="verification(formData.formData.email, '邮箱')"></el-input>
      </el-form-item>
      <el-form-item label="身份证">
        <el-input v-model="formData.idcard" @blur="verification(formData.idcard, '身份证')"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formData.telephone" @blur="verification(formData.telephone, '电话')"></el-input>
      </el-form-item>
      <el-form-item label="科室">
        <el-input v-model="formData.department" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <div style="float: left">
          <el-popconfirm cancel-button-text="取消" confirm-button-text="确定" icon="el-icon-circle-check" icon-color="#007bff"
            title="个人信息内容确定修改吗？" @confirm="onSubmit">
            <el-button slot="reference" type="primary">确定修改</el-button>
          </el-popconfirm>

          <el-button style="margin-left: 22px" type="success" @click="onClear">清空表单</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        accounts: "",
        name: "",
        professional: "",
        email: "",
        idcard: "",
        telephone: "",
        department: "",
        posttype: "",
      },
      labelPosition: "left",
    };
  },
  methods: {
    /* 更新二级管理员信息 */
    onSubmit() {
      if (
        this.email == "" ||
        this.idcard == "" ||
        this.idcard == "" ||
        this.telephone == ""
      ) {
        this.$message({
          showClose: true,
          message: "存在为空选项",
          type: "error",
          duration: 1000,
        });
      } else {
        this.service.post('/admin/infoUpdates', this.formData).then((res) => {
          if (res.data.result) {
            this.$store.commit("loginModule/setUser", this.formData)//更新后改变修改vuex中stata
          }
        })
      }
      setTimeout(() => {
        location.reload();
      }, 1000);
    },
    onClear() {
      this.formData.email = "";
      this.formData.idcard = "";
      this.formData.telephone = "";
    },
    verification(value, label) {
      if (value == "") {
        this.$message({
          showClose: true,
          message: label + "为空",
          type: "error",
          duration: 1000,
        });
      }
    },
  },
  created() {
    this.formData = this.$store.state.loginModule.userInfo
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

.body_form {
  width: 80%;
  margin: 0 0 20px 10%;
  background-color: #fff;
  border: 1px solid rgba(220, 220, 220, 0.8);
  box-shadow: 5px 5px 5px rgba(220, 220, 220, 0.8);
}
</style>