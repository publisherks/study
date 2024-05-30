<!-- 존재하지 않는 경로 안내 -->
<template>
    <div class="login-form">
        <h2>404 PAGE NOT FOUND</h2>
        <p class="info-text">
            요청한 페이지를 찾을 수 없습니다.
        </p>
        <p class="info-text mb-30">
            삭제된 주소거나 일시적으로 사용할 수 없습니다.
        </p>
        <VBtn
            :kind="ButtonType.Cancel"
            class="mb-15"
            @click="onClickBack"
        >
            이전 페이지로 이동
        </VBtn>
        <VBtn @click="onClickMain">
            메인 페이지로 이동
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import { RouterName, ButtonType } from '@/mappings/enum';

// router
const router = useRouter();

// event
/**
 * 이전 화면으로 이동 클릭 시
 */
const onClickBack = () => router.back();

/**
 * 메인 화면으로 이동 클릭 시
 */
const onClickMain = () => router.push({ name: RouterName.Main });
</script>
