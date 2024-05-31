<!-- 스크롤 컴포넌트 -->
<template>
    <div
        ref="scrollElement"
        class="over-auto"
        :style="{ maxHeight: px(maxHeight) }"
    >
        <slot />
    </div>
</template>

<script lang="ts">
import type { Numeric } from '@/mappings/types/common';

// type
export type Props = {
    /** 최대 높이 */
    maxHeight?: Numeric;
};
</script>
<script setup lang="ts">
import { ref } from 'vue';

import px from '@/utils/css/px';

// props
const { maxHeight = '' } = defineProps<Props>();

// refs
const scrollElement = ref<HTMLDivElement | null>(null);

// expose
defineExpose({ scrollElement });
</script>
