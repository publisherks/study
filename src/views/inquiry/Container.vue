<!-- 문의 현황 -->
<template>
    <VTitle>
        문의 현황
        <template #button>
            <VBtn v-if="!isEmpty(propsItem) && propsItem.inquiryManagerName">
                영업 등록
            </VBtn>
        </template>
    </VTitle>
    <VGrid
        :cols="2"
        :colsWidth="[346, 'auto']"
        :rowsWidth="[70, 'auto']"
        :rowGap="[18]"
    >
        <VCell :row="[1, 3]">
            <List
                @selectData="onClickSelectItme($event)"
                @onOpenModal="onShowRegisterInquiryModal()"
            />
        </VCell>
        <template v-if="isEmpty(propsItem)">
            <VCell
                :row="[1, 3]"
                class="empty-box"
            >
                <i class="fa-sharp fa-regular fa-message" />
                <p>선택된 항목이 없습니다.</p>
            </VCell>
        </template>
        <Details
            v-else
            :item="propsItem"
            @onOpenModal="onShowAssignManagerModal()"
        />
    </VGrid>
    <RegisterInquiry
        v-if="isShowRegisterInquiryModal"
        @hide="onHideRegisterInquiryModal"
    />
    <AssignManager
        v-if="isShowAssignManagerModal"
        @hide="onHideAssignManagerModal"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { InquiryInfo } from '@/api/inquiry/interface';

import useModal from '@/global/useModal';

import List from '@/views/inquiry/components/List.vue';
import Details from '@/views/inquiry/components/Details.vue';
import RegisterInquiry from '@/views/inquiry/modal/RegisterInquiry.vue';
import AssignManager from '@/views/inquiry/modal/AssignManager.vue';

import isEmpty from '@/utils/isEmpty';

// global
const {
    isShow: isShowRegisterInquiryModal,
    onShow: onShowRegisterInquiryModal,
    onHide: onHideRegisterInquiryModal,
} = useModal();
const {
    isShow: isShowAssignManagerModal,
    onShow: onShowAssignManagerModal,
    onHide: onHideAssignManagerModal,
} = useModal();

// state
const propsItem = ref<InquiryInfo>({});

// event
const onClickSelectItme = (item: InquiryInfo) => {
    propsItem.value = item;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/inquiry";
</style>
