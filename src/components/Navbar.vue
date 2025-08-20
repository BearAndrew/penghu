<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        澎湖
      </router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/dashboard" class="navbar-item">儀表板</router-link>
        <router-link to="/settings" class="navbar-item">設定</router-link>

        <!-- 🔐 登出按鈕 -->
        <button class="navbar-item logout-button" @click="handleLogout">
          登出
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarMenu',
  methods: {
    handleLogout() {
      // 清除登入狀態
      localStorage.removeItem('isLoggedIn')
      // 導向登入頁
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-item {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
}

.logout-button {
  background: none;
  border: none;
  color: #d33;
  cursor: pointer;
  font-weight: bold;
  margin-left: 1rem;
}
</style>
