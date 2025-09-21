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
      <template v-if="showSubNavbar">
        <!-- 權限管理內容 -->
        <div class="flex items-center justify-between w-full h-full overflow-hidden">
          <!-- 子頁面按鈕：根據當前子導覽資料渲染 -->
          <div class="flex h-full -ml-4">
            <div v-for="(child, index) in currentSubNavChildren" :key="index" :class="['tab-button',
              isActiveTab(child.path) ? 'active-tab' : '']" :style="{ transform: `translateX(-${index * 8}px)` }"
              @click="goToPage(child.path)">
              <span :class="index === 0 ? 'ml-2' : ''">{{ child.label }}</span>
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
import MapDataService from '@/shared/services/MapDataService';


export default {
  name: 'NavbarMenu',
  data() {
    return {
      showMenu: false,
      subNavbar: [
        {
          path: '/permission-management',
          children: [
            { label: '新建', path: 'create' },
            { label: '設定', path: 'setting' },
            { label: '修改', path: 'update' },
          ]
        },
        {
          path: '/map',
        }
      ]
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
    goToPage(childPath) {
      const base = this.matchedSubNav?.path || '';
      this.$router.push(`${base}/${childPath}`);
    },
    isActiveTab(childPath) {
      const base = this.matchedSubNav?.path || '';
      const targetPath = `${base}/${childPath}`;

      const currentSegments = this.$route.path.split('/').filter(Boolean);
      const targetSegments = targetPath.split('/').filter(Boolean);

      const isMatch = targetSegments.every((seg, i) => seg === currentSegments[i]);

      return isMatch; 
    }
  },
  computed: {
    showSubNavbar() {
      return !!this.matchedSubNav;
    },
    matchedSubNav() {
      return this.subNavbar.find(nav => this.$route.path.startsWith(nav.path));
    },
    currentSubNavChildren() {
      if (!this.matchedSubNav || !Array.isArray(this.matchedSubNav.children)) {
        return [];
      }
      return this.matchedSubNav.children || [];
    },
  },
  created() {
    const maps = MapDataService.getAllMaps();
    const mapChildren = maps.map((mapItem, index) => ({
      label: mapItem.title,
      path: String(index + 1)
    }));

    const mapNav = this.subNavbar.find(item => item.path === '/map');
    if (mapNav) {
      mapNav.children = mapChildren;
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
  @apply flex items-center text-white text-[24px] whitespace-nowrap px-4 h-full cursor-pointer relative;
}

.active-tab {
  @apply bg-gradient-to-r from-[#47b69a] to-[#0287b9];
  clip-path: polygon(0% 100%, 1rem 0%, 100% 0%, calc(100% - 1rem) 100%);
}
</style>
