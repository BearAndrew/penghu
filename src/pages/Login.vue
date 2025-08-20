<template>
  <div class="login-page">
    <div class="login-form">
      <h2>登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>帳號</label>
          <input type="text" v-model="username" required>
        </div>
        <div class="form-group">
          <label>密碼</label>
          <input type="password" v-model="password" required>
        </div>
        <button type="submit">登入</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // 處理登入邏輯
      // ...
      localStorage.setItem('isLoggedIn', 'true')
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
