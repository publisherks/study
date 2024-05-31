<!-- Left 레이아웃 -->
<template>
    <aside id="sideNav">
        <div class="side">
            <h2 class="logo">
                <!-- FIXME: 로고 수정 필요 -->
                <img
                    src="@/assets/images/logo.png"
                    :alt="title"
                />
            </h2>
            <Navi />
        </div>
    </aside>
</template>

<script setup lang="ts">
import Navi from '@/layouts/Navi.vue';

// variable
/** 타이틀 */
const title = import.meta.env.VITE_TITLE;
</script>
