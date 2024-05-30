<!-- 메인 레이아웃 -->
<template>
    <div id="wrap">
        <Left />
        <div id="container">
            <Top />
            <div class="container">
                <VLazyRouterView />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Left from '@/layouts/Left.vue';
import Top from '@/layouts/Top.vue';
</script>
