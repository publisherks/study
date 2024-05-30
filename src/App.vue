<template>
    <VLazyRouterView />
    <VLoading />

    <!-- 공통 모달 -->
    <Message />
    <!-- // 공통 모달 -->
</template>

<script setup lang="ts">
import Message from '@/components/modal/Message.vue';

import useAxiosInterceptors from '@/global/useAxiosInterceptors';
import useSyncLoginState from '@/global/useSyncLoginState';

// global
useAxiosInterceptors();
useSyncLoginState();
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
