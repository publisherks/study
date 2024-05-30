<!-- Loading 컴포넌트 -->
<template>
    <div
        v-show="isAlways || isShow"
        class="loading-box"
        :style
    >
        <div class="loading">
            <div
                v-for="(number) in 4"
                :key="`loading${number}`"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { storeToRefs } from 'pinia';

import useLoadingStore from '@/stores/loading';

// type
type Props = {
    /** 항상 표시 여부 */
    always?: boolean;

    /** 상대 위치 여부 */
    relative?: boolean;
};

// props
const { always: isAlways, relative: isRelative } = defineProps<Props>();

// store
const { isShow } = storeToRefs(useLoadingStore());

// computed
/** 스타일 */
const style = computed(() => {
    const style: CSSProperties = {};

    if (isRelative) {
        style.position = 'relative';
    }

    return style;
});
</script>
