<template>
  <div class="info">
    <div class="info1">
      <span class="text">工号：{{ userinfo.accounts }}</span>
      <span class="text">身份证：{{ userinfo.idcard }}</span>
    </div>
    <div class="info1">
      <span class="text">电话：{{ userinfo.telephone }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userinfo: ''
    };
  },
  created() {
    this.userinfo = this.$store.state.loginModule.userInfo
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