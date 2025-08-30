<template>
  <nav class="flex gap-1 justify-between items-center">
    <!-- 左側主選單按鈕 -->
    <button class="relative w-64 h-[var(--nav-height)] px-10 flex items-center justify-center gap-4"
      @click="$emit('toggle-sidebar')">
      <!-- 背景 -->
      <div class="absolute inset-0 bg-no-repeat scale-x-[-1]" :style="{
        backgroundImage: `url('/assets/img/common/gradient-light.png')`,
        backgroundSize: '100% 100%'
      }"></div>
      <!-- 內容 -->
      <span class="relative z-10 text-[24px] text-white whitespace-nowrap">主選單</span>
      <img src="/assets/img/navbar/hamburger.png" alt="menu" class="h-6 z-10" />
    </button>

    <!-- 右側區塊 -->
    <div class="flex flex-1 items-center justify-end space-x-2 pr-6 h-[var(--nav-height)] bg-no-repeat relative" :style="{
      backgroundImage: `url('/assets/img/common/gradient-light.png')`,
      backgroundSize: '100% 100%'
    }">
      <!-- 判斷路由 -->
      <template v-if="isPermissionPage">
        <!-- 權限管理內容 -->
        <div class="flex items-center justify-between w-full h-full overflow-hidden">
          <!-- 子頁面 -->
          <div class="flex h-full -ml-3.5">
            <div :class="['tab-button', isCreatePage ? 'active-tab' : '']" @click="goToPage('create')">
              新建
            </div>
            <div :class="['tab-button', isSettingPage ? 'active-tab' : '']" @click="goToPage('setting')">
              設定
            </div>
            <div :class="['tab-button', isUpdatePage ? 'active-tab' : '']" @click="goToPage('update')">
              修改
            </div>
          </div>


          <!-- 右側導覽按鈕 -->
          <div class="flex items-center gap-2">
            <a @click="goDashboard" class="cursor-pointer">
              <img src="/assets/img/navbar/house.png" alt="house" class="h-10" />
            </a>
            <img src="/assets/img/common/left-arrow.png" alt="left" class="h-10 cursor-pointer" />
            <img src="/assets/img/common/right-arrow.png" alt="right" class="h-10 cursor-pointer" />
          </div>
        </div>
      </template>


      <template v-else>
        <a @click="goDashboard" class="cursor-pointer">
          <img src="/assets/img/navbar/house.png" alt="house" class="h-10" />
        </a>

        <!-- 使用者資訊與下拉選單 -->
        <div class="relative">
          <button class="flex gap-2 items-center" @click="toggleMenu">
            <img src="/assets/img/navbar/user.png" alt="user" class="h-10" />
            <div class="flex flex-col items-center text-white leading-tight">
              <span>管理處01</span>
              <span>JAMES</span>
            </div>
          </button>

          <!-- 下拉選單 -->
          <div v-if="showMenu"
            class="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded shadow-md overflow-hidden z-50">
            <button @click="handleLogout" class="w-full px-4 py-2 hover:bg-gray-600 transition text-left">
              登出
            </button>
          </div>
        </div>
      </template>
    </div>

  </nav>
</template>


<script>
export default {
  name: 'NavbarMenu',
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    handleLogout() {
      this.showMenu = false;
      localStorage.removeItem('isLoggedIn')
      this.$router.push('/login')
    },
    closeMenuOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.showMenu = false;
      }
    },
    goDashboard() {
      this.$router.push('/')
    },
    goToPage(page) {
      this.$router.push(`/permission-management/${page}`);
    }
  },
  computed: {
    isPermissionPage() {
      return this.$route.path.includes('/permission-management');
    },
    isCreatePage() {
      return this.$route.path === '/permission-management/create';
    },
    isSettingPage() {
      return this.$route.path === '/permission-management/setting';
    },
    isUpdatePage() {
      return this.$route.path === '/permission-management/update';
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenuOnOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeMenuOnOutsideClick);
  }
}
</script>

<style scoped>
.tab-button {
  @apply flex items-center text-white text-[36px] px-8 h-full cursor-pointer relative;
}

.active-tab {
  @apply bg-gradient-to-r from-[#47b69a] to-[#0287b9];
  clip-path: polygon(0% 100%, 10% 0%, 100% 0%, 90% 100%);
}
</style>
