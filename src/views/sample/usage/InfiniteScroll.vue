<!-- 무한 스크롤 컴포넌트 사용법 -->
<template>
    <VInfiniteScroll
        ref="infiniteScroll"
        :distance="distance"
        :maxHeight="maxHeight"
        @scroll:bottom="onScrollListBottom"
    >
        <VTable fixed>
            <template #col>
                <col width="10%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
            </template>
            <template #head>
                <th>번호</th>
                <th>이름</th>
                <th>직책</th>
                <th>부서명</th>
                <th>팀명</th>
            </template>
            <tr
                v-for="({ name, position, partname, team, email }, index) in datas"
                :key="`datas.${email}`"
            >
                <td>{{ index + 1 }}</td>
                <td>{{ name }}</td>
                <td>{{ position }}</td>
                <td>{{ partname }}</td>
                <td>{{ team }}</td>
            </tr>
        </VTable>
    </VInfiniteScroll>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { isDefined } from '@vueuse/core';

import users from '@/mappings/json/users.json';
import type { Numeric } from '@/mappings/types/common';

import type { GlobalComponent } from '@/plugins/globalComponent';

// type
type Props = {
    /** 스크롤과 최하단 사이의 최소 거리 */
    distance?: Numeric;

    /** 최대 높이 */
    maxHeight?: Numeric;
};
type Emits = {
    /** 최하단으로 스크롤 시 */
    'scroll:bottom': [];
};

// model
/** 최상단으로 스크롤 트리거 */
const triggerToTop = defineModel<boolean>('triggerToTop');

// props
const { distance = 30, maxHeight = 500 } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// refs
const infiniteScroll = ref<InstanceType<GlobalComponent['VInfiniteScroll']> | null>(null);

// state
/** 목록 */
const datas = ref(users);

// event
/**
 * 목록 최하단 스크롤 시
 */
const onScrollListBottom = () => {
    datas.value = [...datas.value, ...users];

    emit('scroll:bottom');
};

// watch
watch(triggerToTop, (value) => {
    if (!value || !isDefined(infiniteScroll) || !infiniteScroll.value.scrollElement) {
        return;
    }

    // 최상단으로 스크롤 트리거 시 최상단으로 스크롤
    infiniteScroll.value.scrollElement.scrollTop = 0;

    // 최상단으로 스크롤 트리거 값 초기화
    triggerToTop.value = false;
});
</script>
