<!-- 비동기 컴포넌트 -->
<template>
    <Suspense>
        <component
            :is="is"
            v-if="is"
        />
        <slot v-else />
        <template #fallback>
            <VLoading
                always
                relative
            />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

// type
type Props = {
    /** 컴포넌트 */
    is?: string | Component;
};

// props
const { is } = defineProps<Props>();
</script>
