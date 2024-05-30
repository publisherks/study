<!-- Tooltip 컴포넌트 -->
<template>
    <div
        ref="tooltipElement"
        class="tooltip"
    >
        <i
            class="fa-solid fa-circle-info"
            @click="onClickIcon"
        />
        <div :class="['tooltip-box', { show: isShow }]">
            <div class="tooltip-con">
                <p
                    v-if="hasTitle"
                    class="tooltip-title"
                >
                    <slot name="title" />
                </p>
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside, useArrayIncludes, useToggle } from '@vueuse/core';

import useSlots from '@/global/useSlots';

import type { NullableHTMLElement } from '@/mappings/types/common';

// refs
const tooltipElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// global
const [isShow, setIsShow] = useToggle();
const { hasSlots } = useSlots();

// computed
/** 제목 존재 여부 */
const hasTitle = useArrayIncludes(hasSlots, 'title');

// event
/**
 * 아이콘 클릭 시
 */
const onClickIcon = () => setIsShow();

/**
 * 외부 클릭 시
 */
onClickOutside(tooltipElement, () => setIsShow(false));
</script>
