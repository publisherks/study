<!-- 스타일 가이드 화면 -->
<template>
    <VTitle>스타일 가이드</VTitle>
    <div class="contents">
        <Titles />

        <VTitle>- Buttons</VTitle>
        <Buttons />

        <VTitle>- Tab Buttons</VTitle>
        <Tabs class="mb-30" />

        <VTitle class="mb-30">
            - Flex Layout
        </VTitle>
        <FlexLayouts />

        <VTitle class="mb-30">
            - Grid Layout
        </VTitle>
        <GridLayouts />

        <VTitle class="mb-30 mt-30">
            - Tables & Pagination
        </VTitle>
        <Tables />

        <VTitle>- Form</VTitle>

        <VGrid
            cols="3"
            class="mb-20"
        >
            <VCell>
                <Inputs />
            </VCell>
            <VCell>
                <SearchInputs />
                <UnitInputs />
            </VCell>
            <VCell>
                <Selects />
            </VCell>
        </VGrid>

        <VGrid
            cols="3"
            class="mb-30"
        >
            <VCell>
                <DatePickers />
            </VCell>
            <VCell>
                <Textareas />
            </VCell>
            <VCell>
                <UploadFiles />
            </VCell>
        </VGrid>

        <VGrid
            cols="3"
            class="mb-30"
        >
            <VCell>
                <Checkboxs />
            </VCell>
            <VCell>
                <Radios />
            </VCell>
            <VCell>
                <Tooltips />
            </VCell>
        </VGrid>

        <VTitle class="mb-30">
            - Modal & Loading
        </VTitle>
        <VGrid
            cols="4"
            class="mb-30"
        >
            <VCell>
                <Modals />
            </VCell>
            <Loadings />
        </VGrid>

        <InfiniteScroll />
    </div>
</template>

<script setup lang="ts">
import Buttons from '@/views/sample/components/Buttons.vue';
import Checkboxs from '@/views/sample/components/Checkboxs.vue';
import DatePickers from '@/views/sample/components/DatePickers.vue';
import FlexLayouts from '@/views/sample/components/FlexLayouts.vue';
import GridLayouts from '@/views/sample/components/GridLayouts.vue';
import InfiniteScroll from '@/views/sample/components/InfiniteScroll.vue';
import Inputs from '@/views/sample/components/Inputs.vue';
import SearchInputs from '@/views/sample/components/SearchInputs.vue';
import UnitInputs from '@/views/sample/components/UnitInputs.vue';
import Loadings from '@/views/sample/components/Loadings.vue';
import Modals from '@/views/sample/components/Modals.vue';
import Radios from '@/views/sample/components/Radios.vue';
import Selects from '@/views/sample/components/Selects.vue';
import Tables from '@/views/sample/components/Tables.vue';
import Tabs from '@/views/sample/components/Tabs.vue';
import Textareas from '@/views/sample/components/Textareas.vue';
import Titles from '@/views/sample/components/Titles.vue';
import Tooltips from '@/views/sample/components/Tooltips.vue';
import UploadFiles from '@/views/sample/components/UploadFiles.vue';
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/styleGuide";
</style>
