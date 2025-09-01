<template>
  <div class="min-h-screen bg-cover bg-center flex items-center justify-center"
    style="background-image: url('/assets/img/login/bg.png')">

    <img src="/assets/img/login/logo.png" alt="Logo" class="absolute top-16 left-16 h-20" />

    <h1 class="absolute top-[100px] left-1/2 -translate-x-1/2 text-white text-[60px] font-bold">智慧平台系統</h1>

    <div class="bg-transparent border border-white/60 px-8 py-6 rounded-[10px] shadow-sm w-full max-w-sm">
      <form @submit.prevent="handleLogin" class="space-y-2">
        <!-- 單位下拉選單 -->
        <div class="relative">
          <label class="block text-white font-medium mb-1 ml-4">單位</label>

          <div class="select-none" ref="loginDropdown">
            <div
              class="w-full px-4 py-2 border border-gray-300 rounded-sm bg-white flex items-center justify-between cursor-pointer"
              @click="toggleDropdown">
              <span class="text-black">
                {{ selectedDepartment || '請選擇單位' }}
              </span>
              <img src="/assets/img/common/down-arrow.png" class="h-5" alt="open" />
            </div>

            <!-- Dropdown 選單 -->
            <div v-if="isDropdownOpen"
              class="absolute z-10 mt-1 w-full py-2 bg-[#535456] rounded shadow-lg overflow-hidden select-none">
              <div v-for="dept in departments" :key="dept.id" @click="selectDepartment(dept)"
                class="flex items-center px-2 py-2 cursor-pointer hover:bg-gray-500 transition"
                :class="selectedDepartment === dept.name ? '!bg-white' : ''">
                <img :src="selectedDepartment === dept.name
                  ? '/assets/img/common/black-right-arrow.png'
                  : '/assets/img/common/white-right-arrow.png'" class="h-5 mr-2" alt="icon" />
                <span :class="selectedDepartment === dept.name ? '!text-black' : 'text-white'">{{ dept.name }}</span>
              </div>
            </div>
          </div>
        </div>


        <!-- 帳號輸入框 -->
        <div class="relative">
          <label class="block text-white font-medium mb-1 ml-4">帳號</label>
          <div class="relative">
            <input v-model="username" type="text"
              class="w-full pr-10 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              :style="!showUsername ? { WebkitTextSecurity: 'disc' } : {}" />
            <!-- 右側眼睛 icon -->
            <button @click="toggleUsername" type="button">
              <img :src="showUsername ? '/assets/img/login/eye.png' : '/assets/img/login/eye-off.png'" alt="toggle"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 cursor-pointer" />
            </button>
          </div>
        </div>


        <!-- 密碼輸入框 -->
        <div class="relative">
          <label class="block text-white font-medium mb-1 ml-4">密碼</label>
          <div class="relative">
            <!-- 左側鎖頭 icon -->
            <img src="/assets/img/login/lock.png" alt="lock"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5" />
            <!-- 密碼輸入欄 -->
            <input :type="showPassword ? 'text' : 'password'" v-model="password"
              class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <!-- 右側眼睛 icon -->
            <button @click="togglePassword" type="button">
              <img :src="showPassword ? '/assets/img/login/eye.png' : '/assets/img/login/eye-off.png'" alt="toggle"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 cursor-pointer" />
            </button>
          </div>

          <!-- 忘記密碼 -->
          <div class="text-right">
            <button class="text-sm text-white hover:underline" @click.prevent="forgotPassword">
              忘記密碼
            </button>
          </div>
        </div>

        <!-- 錯誤訊息 -->
        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <!-- 登入按鈕 -->
        <button type="submit"
          class="!mt-4 w-full bg-[#003a85] text-white py-2 hover:bg-[#002f6d] transition duration-200">
          登入
        </button>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: "AppLogin",
  data() {
    return {
      isDropdownOpen: false,
      selectedDepartment: '',
      departments: [
        {
          id: 1,
          name: "管理處01",
        },
        {
          id: 2,
          name: "管理處02",
        },
        {
          id: 3,
          name: "管理處03",
        },
        {
          id: 4,
          name: "管理處04",
        },
      ],
      username: '',
      password: '',
      showUsername: true,
      showPassword: false,
      errorMessage: ''
    };
  },
  methods: {
    handleLogin() {
      if (!this.selectedDepartment) {
        this.errorMessage = '請選擇單位';
        return;
      }
      if (!this.username) {
        this.errorMessage = '請輸入帳號';
        return;
      }
      if (!this.password) {
        this.errorMessage = '請輸入密碼';
        return;
      }

      // 清除錯誤訊息後繼續登入邏輯
      this.errorMessage = '';
      localStorage.setItem('isLoggedIn', 'true');
      this.$router.push('/dashboard');
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleUsername() {
      this.showUsername = !this.showUsername;
    },
    forgotPassword() {
      alert("請聯絡管理員重設密碼。");
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectDepartment(dept) {
      this.selectedDepartment = dept.name;
      this.isDropdownOpen = false;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.loginDropdown;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>