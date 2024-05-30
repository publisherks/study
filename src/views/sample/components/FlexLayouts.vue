<!--
    Flex 컴포넌트

    <VRow>
    1. props (* : 필수)
    1) cols (Numeric: '@/mappings/types/common') : col 1 ~ 12 (<VCol> 컴포넌트에서 cols 값을 전달하지 않아도 너비 자동 계산)

    2. slots
    1) default : <VCol>

    <VCol>
    1. props (* : 필수)
    1) cols (Numeric: '@/mappings/types/common') : col 1 ~ 12 (<VRow> 컴포넌트에서 cols 값을 전달하지 않은 경우 필수 전달 필요)

    2. slots
    1) default : 내용
-->
<template>
    <VFlex class="bg mb-30">
        <VRow>
            <VCol cols="1">
                col-1
            </VCol>
            <VCol cols="11">
                col-11
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="2">
                col-2
            </VCol>
            <VCol cols="10">
                col-10
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="3">
                col-3
            </VCol>
            <VCol cols="9">
                col-9
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="4">
                col-4
            </VCol>
            <VCol cols="8">
                col-8
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="5">
                col-5
            </VCol>
            <VCol cols="7">
                col-7
            </VCol>
        </VRow>
        <VRow>
            <VCol cols="6">
                col-6
            </VCol>
            <VCol cols="6">
                col-6
            </VCol>
        </VRow>
    </VFlex>
    <VFlex class="bg mb-30">
        <VRow
            v-for="(cols) in 12"
            :key="`row${cols}`"
            :cols
        >
            <VCol
                v-for="(col) in cols"
                :key="`row${cols}-${col}`"
            >
                col {{ cols }}개, col width 자동 계산
            </VCol>
        </VRow>
    </VFlex>
</template>
