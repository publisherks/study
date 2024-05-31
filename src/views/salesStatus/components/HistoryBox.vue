<template>
    <div
        :class="[
            'history-box',
            type,
            statusClass.find(({ key }) => key === datas?.salesStatus)?.classNm,
        ]"
    >
        <div
            v-if="isTopLine"
            class="top-line"
        />
        <div
            v-if="!isEmpty(type)"
            class="bot-line"
        />
        <div class="status-box">
            <div class="status">
                {{ statusText }}
            </div>
        </div>
        <div class="history-con">
            <HistoryRegist
                v-if="isModify"
                :data="datas"
                @modify="onClickHistoryModify($event)"
                @cancel="onClickHistoryCancel($event)"
            />
            <div
                v-else
                class="con"
            >
                <div class="top-box">
                    <strong v-if="datas?.createdUserName">{{ datas?.createdUserName }}</strong>
                    <span class="date">{{ dayjs(datas?.createDate).format('YYYY. MM. DD') }}</span>
                    <div class="control">
                        <template v-if="datas?.salesStatus === 'INQUIRY'">
                            <i
                                @click="onInquiryClick()"
                                class="icon fa-sharp fa-regular fa-arrow-up-right-from-square"
                            />
                        </template>
                        <template v-else>
                            <i
                                @click="onClickModify"
                                class="icon fa-sharp fa-regular fa-pen"
                            />
                            <i
                                @click="onClickDelete(datas?.seq)"
                                class="icon-delete fa-sharp fa-regular fa-trash-xmark ml-14"
                            />
                        </template>
                    </div>
                </div>
                <div class="con-box">
                    <p v-html="datas?.msg.replaceAll('\n', '<br />')" />
                    <ul
                        v-if="datas?.fileDtoList"
                        class="files"
                    >
                        <li
                            v-for="files in datas?.fileDtoList"
                            :key="`file${files.srq}`"
                        >
                            <FileIcon :type="files.type" />
                            <span class="link-text">
                                {{ files.oriFileName }}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { SalesDetail } from '@/api/sales/interface';

// type
export type Props = {
    datas?: SalesDetail['salesStatusHistoryDtoList'];
    type?: string;
    lastchild?: boolean;
};

type Emits = {
    /** 삭제 클릭 시 */
    delete: [SalesDetail['seq']];
};
</script>
<script setup lang="ts">
import { ref, computed } from 'vue';

import isEmpty from '@/utils/isEmpty';

import FileIcon from '@/components/FileIcon.vue';
import HistoryRegist from '@/views/salesStatus/components/HistoryRegist.vue';

import dayjs from 'dayjs';

// props
const { datas, type, lastchild = true } = defineProps<Props>();

// emit
const emit = defineEmits<Emits>();

// variable
/** 영업 상태 class */
const statusClass = [
    {
        text: '문의',
        key: 'INQUIRY',
        classNm: 'inquiry',
    },
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

// state
const isModify = ref<boolean>(false);

// computed
// eslint-disable-next-line no-unsafe-optional-chaining
const isTopLine = computed(() => !isEmpty(datas?.data) || !lastchild);
const statusText = computed(() => isEmpty(type) ? statusClass.find(({ key }) => key === datas?.salesStatus)?.text : '');

// event
const onInquiryClick = () => {
    console.log('해당 문의로 이동');
};

const onClickModify = () => {
    isModify.value = true;
};

const onClickDelete = (seq: SalesDetail['seq']) => {
    emit('delete', seq);
};

const onClickHistoryModify = (event: any) => {
    isModify.value = false;
};

const onClickHistoryCancel = (event: any) => {
    isModify.value = false;
};
</script>
