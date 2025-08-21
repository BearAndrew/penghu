<template>
  <aside
    class="fixed bottom-0 left-0 z-50 w-64 h-[calc(100vh-var(--nav-height))] bg-no-repeat transform transition-transform duration-300 ease-in-out overflow-y-auto"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'" :style="{
      backgroundImage: `url(${require('@/assets/img/common/gradient-light.png')})`,
      backgroundSize: '100% 100%'
    }">
    <ul class="py-4 select-none">
      <li v-for="item in menuItems" :key="item.id">
        <!-- 第一層選單 -->
        <div class="flex items-center justify-between cursor-pointer hover:bg-[#0a1e38] px-6 py-2"
          @click="toggleMenu(item.id)">
          <div class="flex items-center space-x-2">
            <img :src="require('@/assets/img/common/white-right-arrow.png')"
              :class="openMenus.includes(item.id) ? 'rotate-90' : ''" alt="arrow" class="h-4 transition duration-300" />
            <span class="text-white">{{ item.label }}</span>
          </div>
        </div>

        <!-- 子選單 -->
        <ul v-if="openMenus.includes(item.id)">
          <li v-for="sub in item.children" :key="sub.path" @click="$router.push(sub.path)" :class="[
            'pl-12 pr-2 py-2 cursor-pointer hover:bg-[#0a1e38]',
            isActive(sub.path) ? '!bg-white !text-black' : 'text-white'
          ]">
            {{ sub.label }}
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarMenu',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      openMenus: [],
      menuItems: [
        {
          id: 1,
          label: "權限管理",
          children: [
            { label: "新增", path: "/permission-management/create" },
            { label: "設定", path: "/permission-management/setting" },
            { label: "修改", path: "/permission-management/update" }
          ]
        },
      ]
    };
  },
  methods: {
    toggleMenu(id) {
      if (this.openMenus.includes(id)) {
        this.openMenus = this.openMenus.filter(openId => openId !== id);
      } else {
        this.openMenus.push(id);
      }
    },
    isActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>
