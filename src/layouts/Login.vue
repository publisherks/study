<!-- 로그인 레이아웃 -->
<template>
    <div id="loginWrap">
        <h1 id="logo">
            <!-- FIXME: 로고 수정 필요 -->
            <img
                src="@/assets/images/login-logo.png"
                :alt="title"
            />
        </h1>
        <VLazyRouterView />
    </div>
</template>

<script setup lang="ts">
// variable
/** 타이틀 */
const { VITE_TITLE: title } = import.meta.env;
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/login.scss";
</style>
