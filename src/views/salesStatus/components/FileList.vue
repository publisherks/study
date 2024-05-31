<template>
    <div class="file-list">
        <VTitle
            sub
            class="mb-10"
        >
            첨부파일 목록
            <template #etc>
                <span class="total">{{ files.length ?? 0 }}</span>
            </template>
        </VTitle>
        <div
            v-if="isEmpty(files)"
            class="empty-box"
        >
            <p class="empty-text">
                첨부한 파일이 없습니다.
            </p>
        </div>
        <template v-else>
            <div
                v-for="({ seq, oriFileName, type, date, registName }, index) in files"
                :key="`file${index}`"
                class="file-box"
            >
                <p>{{ dayjs(date).format('YYYY. MM. DD') }} {{ registName }}</p>
                <div class="files">
                    <FileIcon :type="type" />
                    <span
                        @click="onFileClick(seq)"
                        class="link-text"
                    >
                        {{ oriFileName }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref } from 'vue';

import isEmpty from '@/utils/isEmpty';

import FileIcon from '@/components/FileIcon.vue';

import dayjs from 'dayjs';

const files = ref<any>([
    {
        seq: 1,
        oriFileName: '파일이름1',
        type: 'zip',
        date: '2023-09-20',
        registName: '김백호',
    },
    {
        seq: 2,
        oriFileName: '파일이름2 파일이름2 파일이름2 파일이름2 파일이름2 파일이름2',
        type: 'jpg',
        date: '2023-09-16',
        registName: '박현철',
    },
    {
        seq: 3,
        oriFileName: '파일이름3',
        type: 'docx',
        date: '2023-09-12',
        registName: '장지동',
    },
    {
        seq: 4,
        oriFileName: '파일이름4',
        type: 'mov',
        date: '2023-09-08',
        registName: '남기환',
    },
    {
        seq: 5,
        oriFileName: '파일이름5',
        type: 'zip',
        date: '2023-09-01',
        registName: '이상훈',
    },
]);

// event
const onFileClick = (seq: number) => {
    console.log(seq);
};
</script>
