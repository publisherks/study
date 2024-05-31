<template>
    <div class="contents">
        <VBtn
            :kind="ButtonType.Sub"
            @click="$emit('onOpenModal')"
            class="w-100 mb-10"
        >
            신규 문의 등록
        </VBtn>
        <div class="flex mb-20">
            <VInput
                v-model:value="search.text"
                leftUnit
                search
                @keyup.enter="onClickSearch"
                class="pull mr-10"
            />
            <VBtn
                :kind="ButtonType.Cancel"
                @click="onClickSearch"
            >
                검색
            </VBtn>
        </div>
        <VTab
            v-model:value="value"
            :tabs="tabs"
            class="mb-10"
        />
        <p
            v-if="isEmpty(datas)"
            class="empty-text align-c mt-17"
        >
            문의가 없습니다.
        </p>
        <VInfiniteScroll
            v-else
            class="inquier-list"
            :maxHeight="616"
        >
            <div
                v-for="({ seq, companyName, regDtcreatedDate, inquiryMessage }) in datas"
                :key="`inquier${seq}`"
                @click="onClickInquiry(seq)"
                :class="['item', { select: selectData.seq === seq }]"
            >
                <strong class="tit">{{ companyName }}</strong>
                <p class="flex-r date">
                    {{ dayjs(regDtcreatedDate).format('YYYY.MM.DD') }}
                </p>
                <p class="con">
                    {{ inquiryMessage || 'ㅡ' }}
                </p>
            </div>
        </VInfiniteScroll>
    </div>
</template>

<script lang="ts">
import type { InquiryInfo, RequestInquiryList } from '@/api/inquiry/interface';

// type
export type Emits = {
    selectData: InquiryInfo;

    onOpenModal: [];
};
</script>
<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';
import dayjs from 'dayjs';

import useEvent from '@/global/useEvent';

import { requestInquiryList } from '@/api/inquiry';

import { ButtonType } from '@/mappings/enum';
import type { Option } from '@/mappings/types/common';

import isEmpty from '@/utils/isEmpty';

// emits
const emit = defineEmits<Emits>();

// global
const { onResponse } = useEvent();
const { execute, state: response } = useAsyncState(requestInquiryList, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// state
/** 검색 조건 */
const search: RequestInquiryList = reactive({
    text: '',
});
/** 현재 탭 */
const value = ref<number>(1);
/** 목록 */
const tabs = ref<Option<number>[]>([
    {
        label: '신규',
        value: 1,
    },
    {
        label: '내 담당',
        value: 2,
    },
    {
        label: '전체',
        value: 3,
    },
]);
const selectData = ref<InquiryInfo>({});

// computed
/** 문의 목록 */
const datas = computed(() => (response.value.data ?? []));
/** 선택 된 문의 */
const firstData = computed(() => datas.value && datas.value[0]);

// methods
/**
 * 문의 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

// event
/**
 * 검색
 */
const onClickSearch = () => {
    requestList();
};

const onClickInquiry = (seq: InquiryInfo['seq']) => {
    selectData.value = datas.value.filter((value) => value.seq === seq)[0];
};

// watch
watch(() => search.page, requestList, { immediate: true });
watch(() => firstData.value, (value) => {
    selectData.value = value;
});
watch(() => selectData.value, (value) => {
    emit('selectData', value);
});
</script>
