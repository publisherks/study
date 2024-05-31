<!-- 영업 현황 상세 -->
<template>
    <VTitle>
        영업 현황
    </VTitle>
    <VGrid
        :cols="2"
        :colsWidth="['auto', 346]"
    >
        <VCell class="details">
            <div
                v-if="isEmpty(datas)"
                class="empty-box"
            >
                <i class="fa-sharp fa-regular fa-empty-set" />
                <p class="empty-text align-c">
                    아직 등록된 영업이 없습니다.<br />영업을 등록해주세요.
                </p>
            </div>
            <Sales
                v-else
                :data="datas"
            />
        </VCell>
        <VCell>
            <InfoBox :data="clientInfo" />
            <FileList />
            <RelatedSales :data="relatedSales" />
        </VCell>
    </VGrid>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncState } from '@vueuse/core';

import useEvent from '@/global/useEvent';

import { requestSalesInfo } from '@/api/sales';

import isEmpty from '@/utils/isEmpty';

import InfoBox from '@/views/salesStatus/components/InfoBox.vue';
import RelatedSales from '@/views/salesStatus/components/RelatedSales.vue';
import FileList from '@/views/salesStatus/components/FileList.vue';
import Sales from '@/views/salesStatus/components/Sales.vue';

// global
const { onResponse } = useEvent();
const { execute, state: response } = useAsyncState(requestSalesInfo, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// computed
/** 고객사 seq */
const clientSeq = computed(() => 2);
/** 영업 정보 상세 */
const datas = computed(() => (response.value.data ?? []));
/** 고객사 정보 */
const clientInfo = computed(() => Object.fromEntries(
    Object.entries(datas.value)
        .filter(([key]) => {
            const infoKey = [
                'clientName',
                'clientType',
                'product',
                'homepage',
                'bizNo',
                'address',
            ];
            return infoKey.includes(key);
        }),
));
/** 관련된 영업 */
const relatedSales = computed(() => datas.value.salesStatusHistoryDtoList);

// methods
/**
 * 영업 정보 상세 조회 요청
 */
const requestInfo = async () => await execute(0, clientSeq.value);

requestInfo();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/sales/details";
</style>
