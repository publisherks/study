<!--
    제목 컴포넌트

    1. props (* : 필수)
    1) sub (boolean) : 서브 제목 여부 (default : false)
    2) leftButton (boolean) : 좌측 버튼 여부 (default : false)

    2. slots
    1) default : 제목
    2) <template #button> : 버튼
    3) <template #etc> : 기타
-->
<template>
    <VTitle>- Title</VTitle>
    <VTitle
        sub
        class="mb-30"
    >
        - 페이지 서브 제목
    </VTitle>
    <VTitle leftButton>
        - Title 옆 Button
        <template #button>
            <VBtn
                class="mr-10"
                @click="onClickButton"
            >
                기본 버튼
            </VBtn>
            <VBtn
                :kind="ButtonType.Sub1"
                @click="onClickButton"
            >
                서브 버튼
            </VBtn>
        </template>
    </VTitle>
    <VTitle>
        - Title 라인 끝 Button
        <template #button>
            <VBtn
                class="mr-10"
                @click="onClickButton"
            >
                기본 버튼
            </VBtn>
            <VBtn
                :kind="ButtonType.Sub1"
                @click="onClickButton"
            >
                서브 버튼
            </VBtn>
        </template>
    </VTitle>
    <VTitle>
        - Title 옆 기타 슬롯
        <template #etc>
            <p class="info-text ml-12">
                안내 텍스트
            </p>
        </template>
    </VTitle>
    <VTitle class="mb-30">
        - Title 옆 기타 슬롯
        <template #etc>
            <p class="required-text ml-auto">
                * 표시는 필수 작성
            </p>
        </template>
    </VTitle>
</template>

<script setup lang="ts">
import { ButtonType } from '@/mappings/enum';

// event
/**
 * 버튼 클릭 시
 * @param event 이벤트 정보
 */
const onClickButton = (event: MouseEvent) => console.log(event); // eslint-disable-line no-console
</script>
