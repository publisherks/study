<!--
    파일 업로드 컴포넌트

    1. props (* : 필수)
    1) placeholder (string) : 힌트 (default : '파일을 선택해주세요.')
    2) accept (string) : 허용하는 파일 유형
    3) directory (boolean) : 디렉토리 업로드 여부 (default : false)
    4) invalid (boolean) : 유효성 여부 (default : false)
    5) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    6) multiple (boolean) : 여러 파일 업로드 여부 (default : false)
    7) required (boolean) : 필수 여부 (default : false)
    8) buttonType (ButtonType : '@/mappings/enum') : 버튼 구분 (default : ButtonType.Sub1)
    9) invalidMessage (string) : 유효하지 않는 경우 메시지 (default : '유효한 파일이 아닙니다.')

    2. emits
    1) emit('upload', UploadFile : '@/mappings/types/common') : 파일 업로드

    3. slots
    1) <template #label> : 라벨
    2) default : 버튼 텍스트
-->
<template>
    <VTitle sub>
        - File Upload
    </VTitle>
    <VUploadFile
        class="mb-10"
        @upload="onUpload(0, $event)"
    />
    <VUploadFile
        placeholder="여러 파일 선택"
        multiple
        class="mb-10"
        @upload="onUpload(1, $event)"
    />
    <VUploadFile
        :invalid="!files[2]"
        class="mb-10"
        @upload="onUpload(2, $event)"
    />
    <VUploadFile
        class="mb-30"
        @upload="onUpload(3, $event)"
    >
        파일 찾기
    </VUploadFile>

    <VTitle sub>
        - File Upload Labels
    </VTitle>
    <VUploadFile
        :invalid="!files[4]"
        multiple
        required
        class="pull mb-10"
        @upload="onUpload(4, $event)"
    >
        <template #label>
            파일 업로드 상단 라벨
        </template>
    </VUploadFile>
    <VUploadFile
        leftLabel
        multiple
        class="pull"
        @upload="onUpload(5, $event)"
    >
        <template #label>
            파일 업로드 좌측 라벨
        </template>
    </VUploadFile>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { UploadFile } from '@/mappings/types/common';

// state
/** 파일 목록 */
const files = ref<UploadFile[]>([]);

// event
/**
 * 파일 업로드
 * @param index 인덱스
 * @param file 파일
 */
const onUpload = (index: number, file: UploadFile) => {
    files.value[index] = file;
};
</script>
