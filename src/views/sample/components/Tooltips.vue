<!--
    Tooltip 컴포넌트

    1. slots
    1) <template #title> : 제목
    2) default : 내용
-->
<template>
    <VTitle sub>
        - Tooltip
    </VTitle>
    <VTooltip class="mr-30">
        툴팁 텍스트는 이렇게 보여줍니다.
        툴팁 텍스트는 이렇게 보여줍니다.
        툴팁 텍스트는 이렇게 보여줍니다.
    </VTooltip>
    <VTooltip>
        <template #title>
            툴팁 타이틀
        </template>
        툴팁 텍스트는 이렇게 보여줍니다.
    </VTooltip>
</template>
