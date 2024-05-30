<!-- Table 컴포넌트 -->
<template>
    <div :class="['tb-container', { 'row-tb': isHori }]">
        <table :class="className">
            <colgroup v-if="hasCol">
                <slot name="col" />
            </colgroup>
            <thead v-if="hasHead">
                <slot
                    v-if="hasHeadTr"
                    name="head"
                />
                <tr v-else>
                    <slot name="head" />
                </tr>
            </thead>
            <tbody>
                <slot />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useArrayIncludes } from '@vueuse/core';

import useSlots from '@/global/useSlots';

// type
type Props = {
    /** `<thead>`(`hori`_(수평 여부)_ 값이 `true`인 경우 첫번째 `<th>`) 고정 여부 */
    fixed?: boolean;

    /** 수평 여부 */
    hori?: boolean;
};

// props
const { fixed: isFixed, hori: isHori } = defineProps<Props>();

// global
const { slots, hasSlots } = useSlots();

// computed
/** 클래스명 */
const className = computed(() => {
    if (isFixed) {
        return isHori ? 'row-sticky' : 'sticky';
    }
});
/** `<colgroup>` 존재 여부 */
const hasCol = useArrayIncludes(hasSlots, 'col');
/** `<thead>` 존재 여부 */
const hasHead = useArrayIncludes(hasSlots, 'head');
/** `<thead>`에서 `<tr>` 존재 여부 */
const hasHeadTr = computed(() => (slots.head?.() ?? []).some(({ type }) => (type === 'tr')));
</script>
