<!--
    Loading 컴포넌트

    1. props (* : 필수)
    1) always (boolean) : 항상 표시 여부 (default : false)
    2) relative (boolean) : 상대 위치 여부 (default : false)
-->
<template>
    <VCol>
        <VBtn @click="onClickShow(1)">
            로딩 표시(1초)
        </VBtn>
    </VCol>
    <VCol>
        <VBtn @click="onClickShow(3)">
            로딩 표시(3초)
        </VBtn>
    </VCol>
    <VCol>
        <VBtn @click="onClickShow(5)">
            로딩 표시(5초)
        </VBtn>
    </VCol>
</template>

<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import useLoadingStore from '@/stores/loading';

// store
/** 로딩 */
const loadingStore = useLoadingStore();
const { isShow } = storeToRefs(loadingStore);

// event
/**
 * 로딩 표시 클릭 시
 * @param second 표시 시간 (초)
 */
const onClickShow = (second: number) => {
    isShow.value = true;

    useTimeoutFn(loadingStore.$reset, second * 1000);
};
</script>
