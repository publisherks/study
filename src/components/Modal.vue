<!--
    Modal 컴포넌트
    https://ko.vuejs.org/examples/#modal
-->
<template>
    <Transition
        name="modal"
        appear
    >
        <div class="modal overlay">
            <div class="modal-container">
                <div
                    v-if="hasTop"
                    class="modal-top"
                >
                    <h3 class="modal-title">
                        <slot name="top" />
                    </h3>
                </div>
                <div class="modal-contents">
                    <slot />
                </div>
                <div
                    v-if="hasBottom"
                    class="modal-foot"
                >
                    <slot name="bottom" />
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { useArrayIncludes } from '@vueuse/core';

import useSlots from '@/global/useSlots';

// global
const { hasSlots } = useSlots();

// computed
/** 상단(타이틀) 존재 여부 */
const hasTop = useArrayIncludes(hasSlots, 'top');
/** 하단(버튼) 존재 여부 */
const hasBottom = useArrayIncludes(hasSlots, 'bottom');
</script>
