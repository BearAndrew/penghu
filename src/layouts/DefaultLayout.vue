<template>
  <div class="relative min-h-screen">
    <!-- Navbar -->
    <Navbar @toggle-sidebar="toggleSidebar" class="absolute top-0 left-0 w-full z-50" />

    <!-- Sidebar overlay -->
    <Sidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- 主內容 -->
    <main class="h-screen">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from '@/layouts/Navbar.vue'
import Sidebar from '@/layouts/Sidebar.vue'

export default {
  name: 'DefaultLayout',
  components: { Navbar, Sidebar },
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
