<!--
    무한 스크롤 컴포넌트

    1. props (* : 필수)
    1) distance (Numeric: '@/mappings/types/common') : 스크롤과 최하단 사이의 최소 거리 (default : 30)
    2) maxHeight (Numeric: '@/mappings/types/common') : 최대 높이

    2. emits
    1) emit('scroll:bottom') : 최하단으로 스크롤 시

    3. slots
    1) default : 내용
-->
<template>
    <VTitle
        leftButton
        class="mb-30"
    >
        - Infinite Scroll
        <template #button>
            <VBtn @click="onClickTop">
                Top
            </VBtn>
        </template>
    </VTitle>
    <UsageInfiniteScroll v-model:triggerToTop="triggerToTop" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UsageInfiniteScroll from '@/views/sample/usage/InfiniteScroll.vue';

// state
/** 최상단으로 스크롤 트리거 */
const triggerToTop = ref<boolean>(false);

// event
/**
 * 최상단으로 스크롤 클릭 시
 */
const onClickTop = () => {
    triggerToTop.value = true;
};
</script>
