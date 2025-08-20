<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h3>選單</h3>
    </div>
    <div class="sidebar-content">
      <router-link to="/dashboard" class="sidebar-item">儀表板</router-link>
      <router-link to="/settings" class="sidebar-item">設定</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarMenu'
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 1rem;
}

.sidebar-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
}

.sidebar-item:hover {
  background-color: #e9ecef;
}
</style>
