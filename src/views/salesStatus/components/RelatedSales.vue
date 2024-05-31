<template>
    <div class="related">
        <VTitle
            sub
            class="mb-10"
        >
            관련된 영업
            <template #etc>
                <span class="total">{{ data?.length ?? 0 }}</span>
            </template>
        </VTitle>
        <div
            v-if="isEmpty(data)"
            class="empty-box"
        >
            <p class="empty-text">
                관련된 영업이 없습니다.
            </p>
        </div>
        <template v-else>
            <div
                v-for="(sales, index) in data"
                :key="`relatedSales${index}`"
                :class="['sales-box', statusClass.find(item => item.key === sales.salesStatus)?.classNm]"
                @click="onClickSales(sales.seq)"
            >
                <p class="tit">
                    {{ statusClass.find(item => item.key === sales.salesStatus)?.text }}
                </p>
                <div class="con">
                    <p class="name">
                        {{ sales.salesName }}
                    </p>
                    <div class="flex-bet">
                        <div class="type">
                            <p>{{ sales.salesServiceType }}</p>
                        </div>
                        <p class="date">
                            {{ dayjs(sales.createDate).format('YYYY. MM. DD') }}
                        </p>
                    </div>
                </div>
            </div>
        </template>
        <VBtn
            :kind="ButtonType.Sub"
            class="mt-2 pull"
        >
            신규 영업 등록
        </VBtn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { ButtonType } from '@/mappings/enum';

import isEmpty from '@/utils/isEmpty';

import dayjs from 'dayjs';

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

const data = ref<any>([
    {
        salesStatus: 'CONSULTATION',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'PROPOSAL',
        createDate: '2024-02-14',
        salesName: '온습도 관리',
        salesServiceType: 'Show My LoRa',
    },
    {
        salesStatus: 'QUOTATION',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'CONTRACT',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'COMPLETION',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'PARTNER',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'CANCEL',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
    {
        salesStatus: 'HOLDING',
        createDate: '2024-02-14',
        salesName: '설비 전력 모니터링',
        salesServiceType: 'Show My Panel',
    },
]);

// event
const onClickSales = (idx: number) => {
    console.log(idx);
};
</script>
