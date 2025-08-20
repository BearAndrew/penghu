<template>
  <div class="relative w-full select-none">
    <div class="p-[1px] rounded-sm bg-gradient-to-r from-green-400 to-blue-400">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        autocomplete="off"
        class="w-full px-4 py-2 bg-no-repeat rounded-sm text-white placeholder-white focus:outline-none"
        :style="{ backgroundImage: `url(${require('@/assets/img/common/gradient-light.png')})`, backgroundSize: '100% 100%' }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GradientInput',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>
