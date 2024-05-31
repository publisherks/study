<!-- Tab 컴포넌트 -->
<template>
    <div :class="['tab-btn', isInline && 'inline']">
        <button
            v-for="(tab) in tabs"
            :key="`tabs.${Array.isArray(tab.value) ? tab.value[0] : tab.value}`"
            type="button"
            :class="{ active: ((Array.isArray(tab.value) && tab.value.includes(value)) || value === tab.value) }"
            @click="onClick(Array.isArray(tab.value) ? tab.value[0] : tab.value)"
        >
            {{ tab.label }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { Primitive, Option } from '@/mappings/types/common';

// type
type Props = {
    /** 목록 */
    tabs: Option<typeof value.value | typeof value.value[]>[];

    /** inline 여부 */
    isInline?: boolean;
};

// model
/** 현재 탭 */
const value = defineModel<Primitive>('value');

// props
const { tabs, isInline } = defineProps<Props>();

// event
/**
 * 탭 클릭 시
 * @param tab 클릭한 탭
 */
const onClick = (tab: typeof value.value) => {
    // 클릭한 탭이 현재 탭이 아닌 경우 현재 탭 값 수정
    if (tab !== value.value) {
        value.value = tab;
    }
};
</script>
