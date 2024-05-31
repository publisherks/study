<template>
    <div
        :class="['top-wrap', statusClass.find(item => item.key === data?.salesStatus)?.classNm]"
        :data-key="statusClass.find(item => item.key === data?.salesStatus)?.text"
    >
        <div class="name-box">
            <p class="name">
                {{ data?.salesName }}
            </p>
            <div class="flex mt-auto">
                <div class="type">
                    <p>{{ data?.salesServiceType }}</p>
                </div>
                <p class="date">
                    {{ dayjs(data?.startDate).format('YYYY. MM. DD') }}
                </p>
            </div>
        </div>
        <div class="manager-box">
            <div class="tit">
                주 담당자
            </div>
            <div class="con">
                <p class="name">
                    {{ data?.mainSalesMangerName }}
                    <span>{{ data?.mainSalesMangerPosition }}</span>
                </p>
                <p class="agency">
                    {{ data?.mainSalesMangerAgencyName }}
                </p>
            </div>
        </div>
        <div class="manager-box">
            <div class="tit">
                부 담당자
            </div>
            <div class="con">
                <p class="name">
                    {{ data?.subSalesMangerName }}
                    <span>{{ data?.subSalesMangerPosition }}</span>
                </p>
                <p class="agency">
                    {{ data?.subSalesMangerAgencyName }}
                </p>
            </div>
        </div>
    </div>
    <VGrid
        :cols="4"
        :colGap="[0]"
        class="info"
    >
        <VCell :col="[1, 3]">
            <div class="name">
                {{ data?.clientName }}
            </div>
            <p>
                {{ data?.mainClientContactName }}
                <span class="pos">{{ data?.position }}</span>
            </p>
        </VCell>
        <VCell
            :col="[3, 5]"
            class="user-info"
        >
            <p>
                <span class="label-text">이메일</span>
                {{ data?.email ?? '-' }}
            </p>
            <p>
                <span class="label-text">회사</span>
                {{ data?.companyTelNumber ?? '-' }}
            </p>
            <p>
                <span class="label-text">개인</span>
                {{ data?.personalTelNumber ?? '-' }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">견적 금액</span>
                {{ estimatedAmount }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">계약 목표일</span>
                {{ contractTargetDate }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">계약 가능성</span>
                {{ contractPossibility }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">올해 견적 금액</span>
                {{ number(50000000) }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">계약 금액</span>
                {{ contractAmount }}
            </p>
        </VCell>
        <VCell>
            <p>
                <span class="label-text">계약 기간</span>
                {{ contractDate }}
            </p>
        </VCell>
        <VCell :col="[3, 5]">
            <p>
                <span class="label-text">올해 매출 금액</span>
                {{ number(10000000) }}
            </p>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onClickModify"
                sm
                class="ml-auto"
            >
                수정
            </VBtn>
        </VCell>
    </VGrid>
    <HistoryRegist @regist="onClickHistoryRegist($event)" />
    <SalesHistory :data="data?.salesStatusHistoryDtoList" />
    <AmountSetting
        v-if="isShowAmountSettingModal"
        @hide="onHideAmountSettingModal"
        :state="propsState"
    />
</template>

<script lang="ts">
import type { SalesDetail } from '@/api/sales/interface';

// type
export type Props = {
    data?: SalesDetail;
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import useModal from '@/global/useModal';

import { ButtonType, RouterName } from '@/mappings/enum';

import number from '@/utils/format/number';

import dayjs from 'dayjs';

import HistoryRegist from '@/views/salesStatus/components/HistoryRegist.vue';
import SalesHistory from '@/views/salesStatus/components/SalesHistory.vue';
import AmountSetting from '@/views/salesStatus/modal/AmountSetting.vue';

// router
const router = useRouter();

// props
const { data } = defineProps<Props>();

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

// global
const {
    isShow: isShowAmountSettingModal,
    onShow: onShowAmountSettingModal,
    onHide: onHideAmountSettingModal,
} = useModal();

// state
const propsState = ref<string | undefined>();

// computed
const estimatedAmount = computed(() => data?.estimatedAmount ? number(data.estimatedAmount) : '-');
const contractTargetDate = computed(() => data?.contractTargetDate ? dayjs(data?.contractTargetDate)
    .format('YYYY.MM.DD') : '-');
const contractPossibility = computed(() => data?.contractPossibility ? `${data?.contractPossibility}%` : '-');
const contractAmount = computed(() => data?.contractAmount ? number(data?.contractAmount) : '-');
const contractDate = computed(() => data?.contractStartDate ? `${dayjs(data?.contractStartDate)
    .format('YYYY.MM.DD')} ~ ${dayjs(data?.contractEndDate)
    .format('YYYY.MM.DD')}` : '-');

// event
const onClickModify = () => router.push({
    name: RouterName.SalesModify,
    params: {
        idx: data?.seq,
    },
});

const onClickHistoryRegist = (state: string | undefined) => {
    const keys = [
        'QUOTATION',
        'CONTRACT',
        'COMPLETION',
    ];
    if (state && keys.includes(state)) {
        propsState.value = state;
        onShowAmountSettingModal();
    }
};
</script>
