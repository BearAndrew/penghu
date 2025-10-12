<template>
  <component v-if="currentComponent" :is="currentComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'BiStatistics',
  computed: {
    subId() {
      return Number(this.$route.params.subId);
    },
    currentComponent() {
      switch (this.subId) {
        case 1:
          return defineAsyncComponent(() => import('./Statistics1.vue'));
        case 2:
          return defineAsyncComponent(() => import('./Statistics2.vue'));
        case 3:
          return defineAsyncComponent(() => import('./Statistics3.vue'));
        default:
          return {
            template: '<div class="text-red-500">無效的 subId</div>',
          };
      }
    },
  },
};
</script>
