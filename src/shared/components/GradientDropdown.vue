<template>
  <div class="relative w-full select-none" ref="dropdownWrapper">
    <!-- Dropdown Trigger -->
    <div class="p-[1px] rounded-sm bg-gradient-to-r from-green-400 to-blue-400">
      <div
        class="w-full flex items-center justify-between cursor-pointer bg-no-repeat rounded-sm"
        :class="{[triggerClass]: true, 'flex-row-reverse': iconPositionLeft,}"
        :style="{ backgroundImage: `url('/assets/img/common/gradient-light.png')`, backgroundSize: '100% 100%' }"
        @click="toggleDropdown"
        ref="triggerElement"
      >
        <span class="text-white">
          <!-- 顯示modelValue的name -->
          {{ selectedOptionName || placeholder }}
        </span>
        <img src="/assets/img/common/white-down-arrow.png" class="h-3" alt="open" />
      </div>
    </div>

    <!-- 使用 teleport 把選項渲染到 <body> 下面 -->
    <teleport to="body">
      <div
        v-if="isDropdownOpen"
        class="absolute z-10 mt-1 py-2 rounded shadow-lg bg-no-repeat overflow-hidden select-none"
        style="background-image: url('/assets/img/common/gradient-light.png'); background-size: 100% 100%;"
        :style="dropdownStyle"
      >
        <div
          v-for="option in options"
          :key="option.id"
          @click="selectOption(option)"
          class="flex items-center cursor-pointer hover:bg-[#0a1e38] transition"
          :class="{ '!bg-white': modelValue === option.value, [optionClass]: true }"
        >
          <span :class="modelValue === option.value ? '!text-black' : 'text-white'">
            {{ option.name }}
          </span>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'GradientDropdown',
  props: {
    label: String,
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: false,
    },
    placeholder: {
      type: String,
      default: '請選擇',
    },
    triggerClass: {
      type: String,
      default: 'px-4 py-2',
    },
    optionClass: {
      type: String,
      default: 'px-4 py-2',
    },
    iconPositionLeft: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDropdownOpen: false,
      dropdownStyle: {
        top: '0px',
        left: '0px',
        width: 'auto',
      },
    };
  },
  computed: {
    // 計算顯示的選項名稱
    selectedOptionName() {
      const selectedOption = this.options.find(option => option.value === this.modelValue);
      return selectedOption ? selectedOption.name : null;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;

      if (this.isDropdownOpen) {
        this.updateDropdownPosition();
      }
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.value); // 傳遞 value
      this.isDropdownOpen = false;
    },
    handleClickOutside(event) {
      // 檢查是否點擊在 dropdown 元素之外
      if (this.$refs.dropdownWrapper && !this.$refs.dropdownWrapper.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    updateDropdownPosition() {
      const triggerElement = this.$refs.triggerElement;
      if (!triggerElement) return;

      const rect = triggerElement.getBoundingClientRect();

      this.dropdownStyle = {
        top: `${rect.bottom + window.scrollY}px`, // 計算觸發元素底部位置
        left: `${rect.left + window.scrollX}px`, // 計算觸發元素左側位置
        width: `${rect.width}px`, // 保持與觸發元素寬度相同
      };
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
