<!-- 제목 컴포넌트 -->
<template>
    <div :class="`title-box${isSub ? '-sub' : '-main'}`">
        <h2 :class="`title${isSm ? '-sm' : ''}`">
            <slot />
        </h2>
        <div
            v-if="hasButton"
            :class="{
                'btn-wrap': isLeftButton,
                'ml-auto': !isLeftButton,
            }"
        >
            <slot name="button" />
        </div>
        <slot name="etc" />
    </div>
</template>

<script setup lang="ts">
import { useArrayIncludes } from '@vueuse/core';

import useSlots from '@/global/useSlots';

// type
type Props = {
    /** 서브 제목 여부 */
    sub?: boolean;

    /** 좌측 버튼 여부 */
    leftButton?: boolean;

    /** 서브 제목 작은 사이즈 여부 */
    sm?: boolean;
};

// props
const { sub: isSub, leftButton: isLeftButton, sm: isSm } = defineProps<Props>();

// global
const { hasSlots } = useSlots();

// computed
/** 버튼 존재 여부 */
const hasButton = useArrayIncludes(hasSlots, 'button');
</script>
