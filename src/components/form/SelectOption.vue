<!-- Select Option 컴포넌트 -->
<template>
    <div
        v-if="isShow"
        :class="['select-items', { top: isShowTop }]"
        :style="style"
    >
        <ul ref="ulElement">
            <li v-show="!options.length">
                <a>검색 결과가 없습니다.</a>
            </li>
            <li
                v-for="({ label, exp, value }) in options"
                :key="`options.${value}`"
                @click="emit('select', value)"
            >
                <a>{{ label }}<span v-if="exp">{{ exp }}</span></a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import type { Primitive, Option } from '@/mappings/types/common';

// type
export type Props = {
    /** 표시 여부 */
    show?: boolean;

    /** 목록 */
    options: Option[];

    /**
     * 컴포넌트를 `<body>` 하위로 이동 여부
     * - 컴포넌트의 높이가 상위 요소의 높이보다 큰 경우 컴포넌트의 일부만 표시되는 부분을 방지하기 위해 `<body>`(최상위 요소) 하위로 이동
     */
    moveToBody?: boolean;

    /** 라벨(입력 값) 요소 */
    inputElement?: HTMLInputElement | null;
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useElementBounding, useInfiniteScroll } from '@vueuse/core';

// type
type Emits = {
    /** 최하단으로 스크롤 시 */
    'scroll:bottom': [];

    /** 값 선택 시 */
    select: [value: Primitive];
};

// props
const { show: isShow, options, moveToBody: isMoveToBody, inputElement } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const ulElement = ref<HTMLUListElement | null>(null);

// global
const {
    top: inputTop,
    bottom: inputBottom,
    left: inputLeft,
    width: inputWidth,
    height: inputHeight,
} = useElementBounding(() => inputElement);
useInfiniteScroll(ulElement, () => emit('scroll:bottom'), { distance: 30 });

// computed
/**
 * 라벨(입력 값) 상단에 컴포넌트 표시 여부
 * - `<ul>` 요소가 브라우저 하단을 넘는 경우 _((브라우저 내부 높이 - 라벨(입력 값)의 하단 위치 - `<ul>` 높이) <= 0)_ 라벨(입력 값) 상단에 컴포넌트 표시
 */
const isShowTop = computed(() => ((innerHeight - inputBottom.value - ulHeight.value) <= 0));
/** 스타일 */
const style = computed(() => {
    if (!isMoveToBody) {
        return;
    }

    const margin = 4;

    let top = (inputTop.value + scrollY);

    if (isShowTop.value) {
        top -= (ulHeight.value - margin);
    } else {
        top += (inputHeight.value + margin);
    }

    return {
        top: `${top}px`,
        left: `${inputLeft.value}px`,
        width: `${inputWidth.value}px`,
    };
});
/** `<ul>` 높이 */
const ulHeight = computed(() => (ulElement.value?.offsetHeight ?? 0));
</script>
