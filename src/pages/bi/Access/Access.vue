<template>
  <component v-if="currentComponent" :is="currentComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'BiAccess',
  computed: {
    subId() {
      return Number(this.$route.params.subId);
    },
    currentComponent() {
      switch (this.subId) {
        case 1:
          return defineAsyncComponent(() => import('./Access1.vue'));
        case 2:
          return defineAsyncComponent(() => import('./Access2.vue'));
        default:
          return {
            template: '<div class="text-red-500">無效的 subId</div>',
          };
      }
    },
  },
};
</script>
