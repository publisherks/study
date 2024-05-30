<!--
    Grid 컴포넌트

    1. props (* : 필수)
    1) cols (Numeric: '@/mappings/types/common') : cell 1 ~ 12 (default : 12)
    2) rows (boolean) : 여러 줄 여부 (default : false)
    3) colsWidth (Numeric[]) : grid-template-columns 픽셀 목록 (해당 값 전달 시 <VCell> 컴포넌트에서 col(grid-column) 값 전달 불가)
    4) rowsWidth (Numeric[]) : grid-template-rows 픽셀 목록 (해당 값 전달 시 <VCell> 컴포넌트에서 row(grid-row) 값 전달 불가)
    5) colGap (Numeric: '@/mappings/types/common') : column-gap 픽셀
    6) rowGap (Numeric: '@/mappings/types/common') : row-gap 픽셀
    7) align ('start' | 'end') : 정렬

    2. slots
    1) default : <VCell>

    <VCell>
    1. props (* : 필수)
    1) row (number[]) : [grid-row-start, grid-row-end]
    2) col (number[]) : [grid-column-start, grid-column-end]

    2. slots
    1) default : 내용
-->
<template>
    <VGrid
        v-for="(cols) in 12"
        :key="`grid${cols}`"
        :cols
        class="bg"
    >
        <VCell
            v-for="(cell) in cols"
            :key="`grid${cols}-${cell}`"
        >
            cell-{{ cell }}
        </VCell>
    </VGrid>
    <VGrid
        cols="2"
        rows
        class="bg mb-20"
    >
        <VCell :row="[1, 3]">
            cell-1
        </VCell>
        <VCell>cell-2</VCell>
        <VCell>cell-3</VCell>
    </VGrid>
    <VGrid
        cols="8"
        rows
        class="bg"
    >
        <VCell :row="[1, 5]">
            cell-1
        </VCell>
        <VCell :row="[1, 4]">
            cell-2
        </VCell>
        <VCell :row="[1, 3]">
            cell-3
        </VCell>
        <VCell>cell-4</VCell>
        <VCell>cell-5</VCell>
        <VCell>cell-6</VCell>
        <VCell :col="[7, 9]">
            cell-7
        </VCell>
        <VCell :row="[2, 4]">
            cell-8
        </VCell>
        <VCell :row="[2, 5]">
            cell-9
        </VCell>
        <VCell :col="[6, 9]">
            cell-10
        </VCell>
        <VCell>cell-11</VCell>
        <VCell>cell-12</VCell>
        <VCell>cell-13</VCell>
        <VCell>cell-14</VCell>
        <VCell :col="[2, 5]">
            cell-15
        </VCell>
        <VCell :col="[6, 8]">
            cell-16
        </VCell>
        <VCell>cell-17</VCell>
    </VGrid>
</template>
