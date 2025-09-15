<template>
  <aside
    class="fixed bottom-0 left-0 z-50 w-64 h-[calc(100vh-var(--nav-height))] bg-no-repeat transform transition-transform duration-300 ease-in-out overflow-y-auto"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'" :style="{
      backgroundImage: `url('/assets/img/common/gradient-light.png')`,
      backgroundSize: '100% 100%'
    }">
    <ul class="py-4 select-none">
      <li v-for="(item, index) in menuItems" :key="index">
        <!-- 第一層選單 -->
        <menu-item :item="item" :open-menus="openMenus" :toggle-menu="toggleMenu" :is-active="isActive" :level="1"
          :index="index" />
      </li>
    </ul>
  </aside>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
  name: 'SidebarMenu',
  components: {
    MenuItem
  },
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
          label: "權限管理",
          children: [
            { label: "新增", path: "/permission-management/create" },
            { label: "設定", path: "/permission-management/setting" },
            { label: "修改", path: "/permission-management/update" }
          ]
        },
        {
          label: "報表",
          path: "/report",
        },
        {
          label: "地圖",
          path: "/map",
        },
        {
          label: "第一層",
          children: [
            { label: "第二層選項1", path: "/user-management/create" },
            { label: "第二層選項2", path: "/user-management/create" },
            {
              label: "第二層子選單",
              path: "/user-management/list",
              children: [
                { label: "第三層選項1", path: "/user-management/list/details" },
                { label: "第三層選項2", path: "/user-management/list/details" },
                { label: "第三層選項3", path: "/user-management/list/details" },
                {
                  label: "第三層子選單",
                  path: "/user-management/list",
                  children: [
                    { label: "第四層選項1", path: "/user-management/list/details" },
                    { label: "第四層選項2", path: "/user-management/list/details" },
                    { label: "第四層選項3", path: "/user-management/list/details" },
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleMenu(index) {
      // 切換對應 index 的子選單
      if (this.openMenus.includes(index)) {
        this.openMenus = this.openMenus.filter(openIndex => openIndex !== index);
      } else {
        this.openMenus.push(index);
      }
    },
    isActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>
