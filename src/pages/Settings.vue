<template>
  <div class="settings">
    <h1>設定</h1>
    <div class="settings-content">
      <!-- 設定頁面內容 -->
      <div class="setting-item">
        <h3>個人資料</h3>
        <!-- 設定表單 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage'
}
</script>

<style scoped>
.settings {
  padding: 2rem;
}

.settings-content {
  margin-top: 2rem;
}

.setting-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>
