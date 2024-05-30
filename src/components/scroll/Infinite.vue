<!-- 무한 스크롤 컴포넌트 -->
<template>
    <div
        ref="scrollElement"
        class="over-auto"
        :style="{ maxHeight: px(maxHeight) }"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

import type { Props as ScrollProps } from '@/components/scroll/Default.vue';

import type { NullableHTMLElement, Numeric } from '@/mappings/types/common';

import px from '@/utils/css/px';
import numberFrom from '@/utils/number/from';

// type
type Props = {
    /** 스크롤과 최하단 사이의 최소 거리 */
    distance?: Numeric;
} & ScrollProps;
type Emits = {
    /** 최하단으로 스크롤 시 */
    'scroll:bottom': [];
};

// variable
const defaultDistance = 30;

// props
const { distance = defaultDistance, maxHeight = '' } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const scrollElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// global
useInfiniteScroll(scrollElement, () => emit('scroll:bottom'), { distance: numberFrom(distance, defaultDistance) });

// expose
defineExpose({ scrollElement });
</script>
