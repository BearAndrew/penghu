<template>
  <div class="default-layout">
    <Navbar />
    <div class="layout-container">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
}

.layout-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
