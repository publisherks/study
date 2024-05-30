<!-- 무한 스크롤 컴포넌트 사용법 -->
<template>
    <VInfiniteScroll
        ref="infiniteScroll"
        :distance
        :maxHeight
        @scroll:bottom="onScrollListBottom"
    >
        <VTable fixed>
            <template #col>
                <col width="60px" />
                <col width="15%" />
                <col width="19%" />
                <col width="*" />
                <col width="21%" />
            </template>
            <template #head>
                <th>No.</th>
                <th>이름</th>
                <th>직급</th>
                <th>부서명</th>
                <th>팀명</th>
            </template>
            <tr v-show="!totalUsers">
                <td colspan="5">
                    {{ isLoadingUsers ? '데이터를 불러오는 중입니다.' : (responseUsers.message || '검색 결과가 없습니다.') }}
                </td>
            </tr>
            <tr
                v-for="({ idx, name, position, partname, team }) in users"
                :key="`users${idx}`"
            >
                <td>{{ idx }}</td>
                <td>{{ name || 'ㅡ' }}</td>
                <td>{{ position || 'ㅡ' }}</td>
                <td>{{ partname || 'ㅡ' }}</td>
                <td>{{ team || 'ㅡ' }}</td>
            </tr>
        </VTable>
    </VInfiniteScroll>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useAsyncState, isDefined } from '@vueuse/core';

import { requestUserList } from '@/api/user';
import type { RequestUserList } from '@/api/user/interface';

import useEvent from '@/global/useEvent';

import type { NullableInstanceType, Numeric, SearchList } from '@/mappings/types/common';

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
const infiniteScroll = ref<NullableInstanceType<GlobalComponent['VInfiniteScroll']>>(null);

// global
const { onResponse } = useEvent();
const { execute: requestUsers, isLoading: isLoadingUsers, state: responseUsers } = useAsyncState(requestUserList, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, {
        isShowMessage: false,
        success() {
            users.value = [...users.value, ...(response.data as NonNullable<typeof response.data>).results];
        },
        error() {
            // 실패 시 계정 목록 초기화
            users.value = [];
        },
    }),
});

// state
/** 계정 목록 검색 조건 */
const searchUsers: SearchList<RequestUserList> = reactive({
    /** 현재 페이지 번호 */
    page: 1,
});
/** 계정 목록 */
const users = ref<NonNullable<typeof responseUsers.value['data']>['results']>([]);

// computed
/** 계정 목록 총 항목 수 */
const totalUsers = computed(() => (responseUsers.value.data?.totalCount ?? 0));

// methods
/**
 * 목록 검색 요청
 */
const requestList = () => requestUsers(0, {
    ...searchUsers,
    page: (searchUsers.page - 1),
});

// event
/**
 * 목록 최하단 스크롤 시
 */
const onScrollListBottom = () => {
    const { length } = users.value;

    // 마지막 페이지가 아닌 경우
    if (length && length < totalUsers.value) {
        // 다음 페이지 표시
        searchUsers.page += 1;
    }

    // 상위 컴포넌트에 최하단으로 스크롤 시 이벤트 전달
    emit('scroll:bottom');
};

// watch
watch(triggerToTop, (isScrollToTop) => {
    if (!isScrollToTop || !isDefined(infiniteScroll) || !infiniteScroll.value.scrollElement) {
        return;
    }

    // 최상단으로 스크롤 트리거 시 최상단으로 스크롤
    infiniteScroll.value.scrollElement.scrollTop = 0;

    // 최상단으로 스크롤 트리거 값 초기화
    triggerToTop.value = false;
});
watch(() => searchUsers.page, requestList, { immediate: true });
</script>
