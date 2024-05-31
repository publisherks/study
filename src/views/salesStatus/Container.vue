<!-- 영업 현황 -->
<template>
    <VTitle>
        영업 현황
        <template #button>
            <VBtn
                :kind="ButtonType.Sub"
                class="mr-10"
            >
                Excel 다운로드
            </VBtn>
            <VBtn @click="onClickRegist">
                신규 영업 등록
            </VBtn>
        </template>
    </VTitle>
    <VGrid
        :cols="2"
        :colsWidth="[260, 'auto']"
    >
        <VCell>
            <div class="contents">
                <div class="inquiry-total">
                    <div
                        class="box"
                        @click="onClickInquiry"
                    >
                        <p>신규 문의</p>
                        <strong>6</strong>
                    </div>
                    <div
                        class="box"
                        @click="onClickInquiry"
                    >
                        <p>담당 문의</p>
                        <strong>8</strong>
                    </div>
                </div>
                <VTitle
                    sub
                    class="mb-12"
                >
                    나의 알림
                </VTitle>
                <AlarmList />
            </div>
        </VCell>
        <VCell>
            <div class="contents">
                <div class="search-div mb-12">
                    <VTab
                        v-model:value="value"
                        :tabs="tabs"
                        isInline
                    />
                    <VDatePicker
                        v-model:value="searchDt"
                        range
                        class="xl ml-auto"
                    />
                </div>
                <div class="sorting-list mb-20">
                    <div
                        v-for="({ salesStatus, count }) in status"
                        :key="`${salesStatus}`"
                        :class="['box', statusClass.find(item => item.text === salesStatus)?.classNm]"
                    >
                        <p>{{ salesStatus }}</p>
                        <strong>{{ count }}</strong>
                    </div>
                    <div class="box all ml-auto">
                        <p>전체</p>
                        <strong>22</strong>
                    </div>
                </div>
                <div class="search-div mb-12">
                    <VSelect
                        v-bind="search.type"
                        :options="searchTypeOption"
                        class="ml-auto mr-10"
                    />
                    <VInput
                        v-model:value="search.text"
                        leftUnit
                        search
                        class="xl mr-10"
                    />
                    <VBtn
                        :kind="ButtonType.Cancel"
                        @click="onSearch"
                    >
                        검색
                    </VBtn>
                </div>
                <VTable class="mb-12">
                    <template #col>
                        <col width="7.5%" />
                        <col width="16.5%" />
                        <col width="*" />
                        <col width="9.5%" />
                        <col width="15%" />
                        <col width="15%" />
                    </template>
                    <template #head>
                        <th>영업 상태</th>
                        <th class="cursor-p">
                            회사명
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                        <th class="cursor-p">
                            영업명
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                        <th class="cursor-p">
                            영업시작일
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                        <th class="cursor-p">
                            지역
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                        <th class="cursor-p">
                            영업 주 담당자
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                        <th class="cursor-p">
                            영업 부 담당자
                            <div class="sorting">
                                <!-- 기본 -->
                                <i class="fa-sharp fa-solid fa-sort" />
                                <!-- 오름차순 -->
                                <i class="fa-sharp fa-solid fa-sort-up" />
                                <!-- 내림차순 -->
                                <i class="fa-sharp fa-solid fa-sort-down" />
                            </div>
                        </th>
                    </template>
                    <tr v-show="!total">
                        <td colspan="7">
                            {{ message }}
                        </td>
                    </tr>
                    <tr
                        v-for="({
                            seq, salesStatus, clientName, salesName, startDate, clientRegion, mainManger, subManger,
                        }) in datas"
                        :key="`${clientName}`"
                        @click="onClickList(seq)"
                        class="cursor-p"
                    >
                        <td :class="statusClass.find(item => item.key === salesStatus)?.classNm">
                            {{ statusClass.find(item => item.key === salesStatus)?.text }}
                        </td>
                        <td>{{ clientName }}</td>
                        <td>{{ salesName }}</td>
                        <td>{{ startDate }}</td>
                        <td>{{ clientRegion }}</td>
                        <td v-html="mainManger" />
                        <td v-html="subManger" />
                    </tr>
                </VTable>
                <VPagination
                    v-model:page="search.page"
                    limit="10"
                    :total="total"
                />
            </div>
        </VCell>
    </VGrid>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';

import useEvent from '@/global/useEvent';

import { RouterName, ButtonType } from '@/mappings/enum';

import { requestSalesList } from '@/api/sales';
import type { RequestSalesList, SalesInfo } from '@/api/sales/interface';

import type { Option } from '@/mappings/types/common';

import AlarmList from '@/views/salesStatus/components/AlarmList.vue';

// router
const router = useRouter();

// variable
/** 영업 상태 class */
const statusClass = [
    {
        text: '상담',
        key: 'CONSULTATION',
        classNm: 'counsel',
    },
    {
        text: '제안',
        key: 'PROPOSAL',
        classNm: 'offer',
    },
    {
        text: '견적',
        key: 'QUOTATION',
        classNm: 'estimate',
    },
    {
        text: '계약',
        key: 'CONTRACT',
        classNm: 'contract',
    },
    {
        text: '완료',
        key: 'COMPLETION',
        classNm: 'complete',
    },
    {
        text: '파트너',
        key: 'PARTNER',
        classNm: 'partner',
    },
    {
        text: '취소',
        key: 'CANCEL',
        classNm: 'cancel',
    },
    {
        text: '보류',
        key: 'HOLDING',
        classNm: 'hold',
    },
];

const searchTypeOption = [
    {
        label: '고객사명',
        value: 'clientName',
    },
    {
        label: '영업명',
        value: 'salesName',
    },
    {
        label: '소속',
        value: 'mainSalesMangerAgencyName',
    },
    {
        label: '영업 담당자명',
        value: 'mainSalesMangerName',
    },
    {
        label: '메모',
        value: 'memo',
    },
    {
        label: '첨부파일',
        value: 'oriFileName',
    },
];

// global
const { onResponse } = useEvent();
const { execute, isLoading, state: response } = useAsyncState(requestSalesList, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// state
/** 현재 탭 */
const value = ref<number>(1);
/** 목록 */
const tabs = ref<Option<number>[]>([
    {
        label: '나의 영업현황',
        value: 1,
    },
    {
        label: '전체 영업현황',
        value: 2,
    },
]);
/** 날짜 검색 */
const searchDt = ref<any>('');
/** 영업 상태 임시 데이터 */
const status = ref<any>([
    {
        salesStatus: '상담',
        count: 2,
    },
    {
        salesStatus: '제안',
        count: 1,
    },
    {
        salesStatus: '견적',
        count: 5,
    },
    {
        salesStatus: '계약',
        count: 2,
    },
    {
        salesStatus: '완료',
        count: 1,
    },
    {
        salesStatus: '파트너',
        count: 5,
    },
    {
        salesStatus: '취소',
        count: 1,
    },
    {
        salesStatus: '보류',
        count: 5,
    },
]);
/** 검색 조건 */
const search: RequestSalesList = reactive({
    page: 1,

    type: '',

    text: '',
});

// computed
/** 영업 목록 */
const datas = computed(() => (response.value.data ?? []).map((item) => {
    let mainManger = 'ㅡ',
        subManger = 'ㅡ';

    if (item.mainSalesMangerName) {
        mainManger = `<span>${item.mainSalesMangerAgencyName}</span><span class="ml-6">${item.mainSalesMangerName}</span><span class="info-color ml-6">${item.mainSalesMangerPosition}</span>`;
    }

    if (item.subSalesMangerName) {
        subManger = `<span>${item.subSalesMangerAgencyName}</span><span class="ml-6">${item.subSalesMangerName}</span><span class="info-color ml-6">${item.subSalesMangerPosition}</span>`;
    }

    return {
        ...item,
        mainManger,
        subManger,
    };
}));
/** 메시지 */
const message = computed(() => isLoading.value ? '데이터를 불러오는 중입니다.' : (response.value.message || '검색 결과가 없습니다.'));
/** 총 항목 수 */
const total = computed(() => (response.value.totalCount ?? 0));

// methods
/**
 * 영업 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

// event
const onClickRegist = () => {
    router.push({
        name: RouterName.SalesRegist,
    });
};

const onClickInquiry = () => {
    router.push({
        name: RouterName.Inquiry,
    });
};

const onClickList = (seq: SalesInfo['seq']) => {
    router.push({
        name: RouterName.SalesDetails,
        params: {
            idx: seq,
        },
    });
};

const onSearch = () => {
    if (search.page === 1) {
        requestList();

        return;
    }

    search.page = 1;
};

// watch
watch(() => search.page, requestList, { immediate: true });
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/sales/status";
</style>
