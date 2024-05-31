<!--
    Date Picker 컴포넌트

    1. model (* : 필수)
    1) v-model:value (ModelValue : '@vuepic/vue-datepicker') : 현재 날짜

    2. props (* : 필수)
    1) range (boolean) : 기간 선택 여부 (default : false)
    2) clearable (boolean) : 초기화 아이콘 표시 여부 (default : true)
    3) autoApply (boolean) : 날짜 자동 적용 여부 (default : true)
    4) placeholder (string) : 힌트 (default : '날짜를 선택해주세요.')
    5) disabled (boolean) : 비활성화 여부 (default : false)
    6) required (boolean) : 필수 여부 (default : false)
    7) yearFirst (boolean) : 달력 상단에 년 우선 표시 여부 (default : true)
    8) minDate (Date | string) : 선택 가능한 시작 날짜
    9) maxDate (Date | string) : 선택 가능한 끝 날짜
    10) weekStart (0 | 1 | 2 | 3 | 4 | 5 | 6) : 시작 요일 (0: 일요일, 1: 월요일, 2: 화요일, 3: 수요일, 4: 목요일, 5: 금요일, 6: 토요일) (default : 0)
    11) enableTimePicker (boolean) : 시간 선택 활성화 여부 (default : false)
    12) locale (string) : 언어 (default : 'ko-KR')
    13) position ('left' | 'center' | 'right') : 달력 위치 (default : 'left')
    14) transitions (boolean) : 애니메이션 여부 (default : false)
    15) format (string) : 형식 (default : 'YYYY.MM.DD')
    16) invalid (boolean) : 유효성 여부 (default : false)
    17) leftLabel (boolean) : 좌측 라벨 여부 (default : false)
    18) invalidMessage (string) : 유효하지 않는 경우 메시지

    3. slots
    1) <template #label> : 라벨
    2) <template #info> : 정보 텍스트
-->
<template>
    <VTitle sub>
        - DatePickers
    </VTitle>
    <VDatePicker
        v-model:value="dates[0]"
        class="mb-10"
    />
    <VDatePicker
        v-model:value="dates[1]"
        disabled
        class="mb-10"
    />
    <VDatePicker
        v-model:value="dates[2]"
        :invalid="!dates[2]"
        class="xl mb-10"
    />
    <VDatePicker
        v-model:value="dates[3]"
        range
        class="xxl mb-10"
    />
    <VDatePicker
        v-model:value="dates[4]"
        range
        enableTimePicker
        format="YYYY.MM.DD HH:mm:ss"
        class="pull mb-10"
    />

    <VTitle sub>
        - DatePicker Labels & Info Text & Valid Text
    </VTitle>
    <VDatePicker
        v-model:value="dates[5]"
        class="mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
    </VDatePicker>
    <VDatePicker
        v-model:value="dates[6]"
        leftLabel
        class="mb-10"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VDatePicker>
    <VDatePicker
        v-model:value="dates[7]"
        required
        class="mb-10"
    >
        <template #label>
            상단 Label 텍스트
        </template>
        <template #info>
            하단 Info 텍스트
        </template>
    </VDatePicker>
    <VDatePicker
        v-model:value="dates[8]"
        required
        :invalid="!dates[8]"
        leftLabel
        invalidMessage="하단 Valid 텍스트"
    >
        <template #label>
            좌측 Label 텍스트
        </template>
    </VDatePicker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ModelValue } from '@vuepic/vue-datepicker';

// state
/** 현재 날짜 목록 */
const dates = ref<ModelValue[]>([]);
</script>
