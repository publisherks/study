<template>
    <div class="history-input">
        <div
            class="top-box"
            v-if="data?.createdUserName"
        >
            <strong>{{ data?.createdUserName }}</strong>
            <span class="date">{{ dayjs(data?.createDate).format('YYYY. MM. DD') }}</span>
        </div>
        <div class="select-state">
            <p>상태 선택</p>
            <span
                v-for="({ text, key, classNm }) in statusClass"
                :key="`Status.${key}`"
                @click="onStateClick(key)"
                :class="[classNm, { active: activeState === key }]"
            >
                {{ text }}
            </span>
        </div>
        <VTextarea
            v-model:value="historyText"
            v-bind="historyTextProps"
            :minHeight="100"
            :maxHeight="200"
            class="pull mb-10"
        />
        <ul class="upload-list">
            <template
                v-for="(files, index) in currentFiles"
                :key="`files${index}`"
            >
                <li
                    v-for="({ idx, name, filetype, type }) in files"
                    :key="`file${idx}`"
                >
                    <FileIcon :type="filetype" />
                    <span>
                        {{ name }}
                    </span>
                    <i
                        class="icon-delete fa-sharp fa-regular fa-trash-xmark ml-6"
                        @click="onClickFiles(idx, type)"
                    />
                </li>
            </template>
        </ul>
        <div class="flex-bet">
            <VBtn
                :kind="ButtonType.Sub"
                sm
                @click="open"
            >
                파일 첨부
            </VBtn>
            <VBtn
                v-if="!isModify"
                @click="onRegistClick"
            >
                게시
            </VBtn>
            <div
                v-else
                class="flex"
            >
                <VBtn
                    :kind="ButtonType.Cancel"
                    @click="onClickCancel"
                    class="mr-14"
                >
                    취소
                </VBtn>
                <VBtn @click="onModifyClick">
                    수정
                </VBtn>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { SalesDetail } from '@/api/sales/interface';

// type
export type Props = {
    data?: SalesDetail['salesStatusHistoryDtoList'];
};

type Emits = {
    /** 게시 클릭 시 상태 전달 */
    regist: [state : string | undefined];

    /** 수정 클릭 시 */
    modify: [];

    /** 취소 클릭 시 */
    cancel: [];
};
</script>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useFileDialog } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

import FileIcon from '@/components/FileIcon.vue';

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
const fileAccept = [
    'image/*',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    '.pdf',
    '.csv',
    '.doc',
    '.docx',
    '.hwp',
    '.hwpx',
    '.ppt',
    '.pptx',
    'video/mp4',
    '.mov',
    '.zip',
    '.rar',
    '.7zip',
];

// global
const { open, reset, onChange } = useFileDialog({
    accept: fileAccept.toString(),
    multiple: true,
});

// props
const { data } = defineProps<Props>();

// emit
const emit = defineEmits<Emits>();

// validate
const validationSchema = yup.object({
    historyText: yup.string(),
});

const { defineField, submitCount } = useForm({
    initialValues: { historyText: data?.msg || '' },
    validationSchema: toTypedSchema(validationSchema),
});
const [historyText, historyTextProps] = defineField('historyText', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// state
const activeState = ref<string | undefined>(data?.salesStatus);
const fileList = ref<File[]>([]);
const originFileList = ref<any[] | undefined>(data?.fileDtoList.map(({ oriFileName, type }, idx) => ({
    idx,
    name: oriFileName,
    filetype: type,
    type: 'origin',
})));

// computed
/** 수정 여부 */
const isModify = computed(() => Boolean(data));
const currentFiles = computed(() => [
    originFileList.value,
    fileList.value.map(({ name }, idx) => {
        const fileSuffix = name.substring(name.lastIndexOf('.') + 1);
        return {
            idx,
            name,
            filetype: fileSuffix,
            type: 'new',
        };
    }),
]);

// method
/**
 * 상태 선택 시
 */
const onStateClick = (key: string) => {
    activeState.value = key;
};
/**
 * 게시 클릭 시
 */
const onRegistClick = () => {
    reset();
    emit('regist', activeState.value);
};
/**
 * 수정 클릭 시
 */
const onModifyClick = () => {
    emit('modify');
};
/**
 * 취소 클릭 시
 */
const onClickCancel = () => {
    emit('cancel');
};
/**
 * 파일 삭제
 */
const onClickFiles = (idx: number, type: string) => {
    if (type === 'origin') {
        originFileList.value?.splice(idx, 1);
    } else {
        fileList.value.splice(idx, 1);
    }
};

// event
/**
 * 파일 변경 시
 */
onChange((files) => {
    if (files) {
        fileList.value.push(...Array.from(files));
    }
});
</script>
