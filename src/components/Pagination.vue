<!-- Pagination 컴포넌트 -->
<template>
    <div
        v-show="pages.length"
        class="paging-container"
    >
        <div class="paging-box">
            <a
                class="first"
                @click="onClick(1)"
            />
            <a
                class="prev"
                @click="onClick(previousPage)"
            />
            <a
                v-for="(value) in pages"
                :key="`pages${value}`"
                :class="{ on: (value === currentPage) }"
                @click="onClick(value)"
            >
                {{ value }}
            </a>
            <a
                class="next"
                @click="onClick(nextPage)"
            />
            <a
                class="last"
                @click="onClick(totalPage)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { reactiveComputed } from '@vueuse/core';
import { useCeil } from '@vueuse/math';

import type { Numeric } from '@/mappings/types/common';

import numberFrom from '@/utils/number/from';

// type
type Props = {
    /** 페이지당 표시할 항목 수 */
    limit?: Numeric;

    /** 총 항목 수 */
    total?: Numeric;

    /** 표시할 페이지 수 */
    block?: Numeric;
};

// variable
const defaultPage = 1;
const defaultLimit = 20;
const defaultTotal = 0;
const defaultBlock = 10;

// model
/** 현재 페이지 번호 */
const page = defineModel<Numeric>('page', { default: defaultPage });

// props
const { limit = defaultLimit, total = defaultTotal, block = defaultBlock } = defineProps<Props>();

// computed
/** 현재 페이지 번호 */
const currentPage = computed(() => numberFrom(page.value, defaultPage));
/** 처음 페이지 번호 */
const firstPage = computed(() => firstAndLastPage.first);
/** 마지막 페이지 번호 */
const lastPage = computed(() => firstAndLastPage.last);
/** 이전 페이지 번호 */
const previousPage = computed(() => (currentPage.value - 1));
/** 다음 페이지 번호 */
const nextPage = computed(() => (currentPage.value + 1));
/** 페이지 번호 목록 */
const pages = computed(
    () => new Array<number>(Math.min(lastPage.value - firstPage.value + 1, totalPage.value))
        .fill(firstPage.value)
        .map((value, index) => (value + index)),
);
/** 총 페이지 수 */
const totalPage = useCeil(() => (numberFrom(total, defaultTotal) / numberFrom(limit, defaultLimit)));
/** 처음/마지막 페이지 번호 */
const firstAndLastPage = reactiveComputed(() => {
    const blockNumber = numberFrom(block, defaultBlock);

    let first = Math.max(1, currentPage.value - Math.floor(blockNumber / 2)),
        last = Math.min(totalPage.value, currentPage.value + Math.floor(blockNumber / 2));

    if (blockNumber > ((last - first) + 1)) {
        if (currentPage.value < (totalPage.value / 2)) {
            last = Math.min(totalPage.value, last + (blockNumber - (last - first)));
        } else {
            first = Math.max(1, first - (blockNumber - (last - first)));
        }
    }

    if (blockNumber < (last - first + 1)) {
        if (currentPage.value > (totalPage.value / 2)) {
            first += 1;
        } else {
            last -= 1;
        }
    }

    return {
        first,
        last,
    };
});

// event
/**
 * 페이지 번호 클릭 시
 * @param newPage 페이지 번호
 */
const onClick = (newPage: typeof currentPage.value) => {
    // 해당 페이지 번호가 현재 페이지 번호인 경우 현재 페이지 번호 값을 해당 페이지 번호 값으로 수정하지 않음
    if (!newPage || newPage === currentPage.value) {
        return;
    }

    // 해당 페이지 번호가 페이지 번호 목록에 있거나 처음/마지막 페이지 번호인 경우 현재 페이지 번호 값을 해당 페이지 번호로 수정함
    const validPages = [
        ...pages.value,
        1,
        totalPage.value,
    ];

    if (validPages.includes(newPage)) {
        page.value = newPage;
    }
};
</script>
