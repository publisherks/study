<!-- 영업 수정 -->
<template>
    <VTitle>
        영업 정보 수정
    </VTitle>
    <VGrid :cols="2">
        <VCell>
            <div class="contents">
                <VTitle
                    sub
                    class="mb-12"
                >
                    영업 정보
                </VTitle>
                <p class="flex-r required-text mb-7">
                    *은 필수입력 항목 입니다.
                </p>
                <VTable
                    hori
                    class="mb-14"
                >
                    <template #col>
                        <col width="18%" />
                        <col width="*" />
                    </template>
                    <tr>
                        <th class="required">
                            영업명
                        </th>
                        <td>
                            <VInput
                                v-model:value="salesName"
                                v-bind="salesNameProps"
                                placeholder="영업명을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            서비스 유형
                        </th>
                        <td>
                            <VSelect
                                v-model:value="salesServiceType"
                                v-bind="salesServiceTypeProps"
                                :options="salesServiceTypeOption"
                                placeholder="서비스유형을 선택하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            영업 시작일
                        </th>
                        <td>
                            <div class="flex">
                                <VDatePicker
                                    v-model:value="startDate"
                                    v-bind="startDateProps"
                                    class="pull mr-10"
                                />
                                <VBtn
                                    :kind="ButtonType.Sub"
                                    @click="onClickToDay"
                                >
                                    오늘
                                </VBtn>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            주 담당자
                        </th>
                        <td>
                            <VSelect
                                v-model:value="mainManger"
                                v-bind="mainMangerProps"
                                :options="managerOption"
                                search
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            부 담당자
                        </th>
                        <td>
                            <VSelect
                                v-model:value="subManger"
                                v-bind="subMangerProps"
                                :options="managerOption"
                                search
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            관련 연락처
                        </th>
                        <td>
                            <VBtn
                                :kind="ButtonType.Sub"
                                class="mr-10"
                                @click="onShowClientContactSettingModal"
                            >
                                관련 연락처 선택
                            </VBtn>
                            <VBtn
                                :kind="ButtonType.Sub"
                                @click="onShowContactSettingModal"
                            >
                                고객사 연락처 추가
                            </VBtn>
                        </td>
                    </tr>
                </VTable>
                <div
                    v-if="isEmpty(contactClientList)"
                    class="empty-box"
                >
                    <p class="empty-text align-c">
                        선택한 관련 연락처가 표시됩니다.
                    </p>
                </div>
                <VInfiniteScroll
                    v-else
                    class="contact-list"
                    :maxHeight="329"
                >
                    <VTable>
                        <tr
                            v-for="(item, index) in contactClientList"
                            :key="`contactClient${index}`"
                        >
                            <td>
                                <label :for="`radio${index}`">
                                    <strong>{{ item.contactName }}<span>{{ item.position }}</span></strong>
                                    <VRadio
                                        :value="`radio${index}`"
                                        :checkValue="isMain"
                                        :id="`radio${index}`"
                                        class="ml-auto"
                                        @update:value="onUpdate"
                                    >
                                        대표 연락처로 설정
                                    </VRadio>
                                </label>
                            </td>
                        </tr>
                    </VTable>
                </VInfiniteScroll>
            </div>
        </VCell>
        <VCell>
            <div class="contents">
                <VTitle
                    sub
                    class="mb-12"
                >
                    금액 정보
                </VTitle>
                <VTitle
                    sub
                    sm
                    class="mb-12"
                >
                    견적 금액 정보
                </VTitle>
                <VTable
                    hori
                    class="mb-10"
                >
                    <template #col>
                        <col width="12%" />
                        <col width="38%" />
                        <col width="12%" />
                        <col width="38%" />
                    </template>
                    <tr>
                        <th class="required">
                            견적 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="estimatedAmount"
                                v-bind="estimatedAmountProps"
                                placeholder="견적 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th class="required">
                            최종 견적일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="finalEstimateDate"
                                v-bind="finalEstimateDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            반영 예정 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="reflectionPlannedAmount"
                                v-bind="reflectionPlannedAmountProps"
                                placeholder="반영 예정 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th class="required">
                            반영 예정월
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="reflectionPlannedDate"
                                v-bind="reflectionPlannedDateProps"
                                monthPicker
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            계약 가능성
                        </th>
                        <td>
                            <VInput
                                v-model:value="contractPossibility"
                                v-bind="contractPossibilityProps"
                                placeholder="계약 가능성을 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th class="required">
                            계약 목표일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractTargetDate"
                                v-bind="contractTargetDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
                <VTitle
                    sub
                    sm
                    class="mb-12"
                >
                    계약 금액 정보
                </VTitle>
                <VTable
                    hori
                    class="mb-10"
                >
                    <template #col>
                        <col width="12%" />
                        <col width="38%" />
                        <col width="12%" />
                        <col width="38%" />
                    </template>
                    <tr>
                        <th>
                            계약 금액
                        </th>
                        <td colspan="3">
                            <VInput
                                v-model:value="contractAmount"
                                v-bind="contractAmountProps"
                                placeholder="계약 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>
                            계약 시작일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractStartDate"
                                v-bind="contractStartDateProps"
                                class="pull"
                            />
                        </td>
                        <th>
                            계약 종료일
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="contractEndDate"
                                v-bind="contractEndDateProps"
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
                <VTitle
                    sub
                    sm
                    class="mb-12"
                >
                    매출 금액 정보
                </VTitle>
                <VTable hori>
                    <template #col>
                        <col width="12%" />
                        <col width="38%" />
                        <col width="12%" />
                        <col width="38%" />
                    </template>
                    <tr>
                        <th>
                            반영 완료 금액
                        </th>
                        <td colspan="3">
                            <VInput
                                v-model:value="reflectionCompletedAmount"
                                v-bind="reflectionCompletedAmountProps"
                                placeholder="반영 완료 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th class="required">
                            반영 예정 금액
                        </th>
                        <td>
                            <VInput
                                v-model:value="plannedReflectionAmount"
                                v-bind="plannedReflectionAmountProps"
                                placeholder="반영 예정 금액을 입력하세요."
                                class="pull"
                            />
                        </td>
                        <th class="required">
                            반영 예정월
                        </th>
                        <td>
                            <VDatePicker
                                v-model:value="plannedReflectionDate"
                                v-bind="plannedReflectionDateProps"
                                monthPicker
                                class="pull"
                            />
                        </td>
                    </tr>
                </VTable>
                <div class="flex-r mt-20">
                    <VBtn
                        :kind="ButtonType.Cancel"
                        @click="onClickCancel"
                    >
                        취소
                    </VBtn>
                    <VBtn class="ml-14">
                        저장
                    </VBtn>
                </div>
            </div>
        </VCell>
    </VGrid>
    <ClientContactSetting
        v-if="isShowClientContactSettingModal"
        @hide="onHideClientContactSettingModal"
        @submit="onClientContactList"
        :idx="idx"
    />
    <ContactSetting
        v-if="isShowContactSettingModal"
        @hide="onHideContactSettingModal"
    />
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, computed } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useRouteParams } from '@vueuse/router';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { requestManagerList } from '@/api/inquiry';
import { requestSalesInfo } from '@/api/sales';

import { ButtonType } from '@/mappings/enum';
import type { Primitive } from '@/mappings/types/common';

import ContactSetting from '@/views/customerStatus/modal/ContactSetting.vue';
import ClientContactSetting from '@/views/salesStatus/modal/ClientContactSetting.vue';

import isEmpty from '@/utils/isEmpty';

import dayjs from 'dayjs';

// router
const router = useRouter();

// variable
const salesServiceTypeOption = [
    {
        label: 'Show My Farm',
        value: 'ShowMyFarm',
    },
    {
        label: 'Show My Well',
        value: 'ShowMyWell',
    },
    {
        label: 'Show My LoRa',
        value: 'ShowMyLoRa',
    },
    {
        label: 'Show My Panel',
        value: 'ShowMyPanel',
    },
    {
        label: 'Show My Works',
        value: 'ShowMyWorks',
    },
    {
        label: 'Show My Tool',
        value: 'ShowMyTool',
    },
    {
        label: 'Show My Asset',
        value: 'ShowMyAsset',
    },
    {
        label: 'Show My Care',
        value: 'ShowMyCare',
    },
    {
        label: '생산량관리 솔루션',
        value: '생산량관리솔루션',
    },
    {
        label: '설비관리 솔루션',
        value: '설비관리솔루션',
    },
    {
        label: 'DASHBOARD VISUALIZATION WIMX',
        value: 'DASHBOARD_VISUALIZATION_WIMX',
    },
    {
        label: 'FACILITY MANAGEMENT',
        value: 'FACILITY_MANAGEMENT',
    },
    {
        label: 'DATA INTEGRATION',
        value: 'DATA_INTEGRATION',
    },
    {
        label: 'DATA ANALYTICS AI',
        value: 'DATA_ANALYTICS_AI',
    },
    {
        label: 'FMSnRMS',
        value: 'FMSnRMS',
    },
    {
        label: 'DX',
        value: 'DX',
    },
    {
        label: 'SmartHACCP',
        value: 'SmartHACCP',
    },
];

// global
const { onResponse } = useEvent();
const { execute: executeManager, state: responseManager } = useAsyncState(requestManagerList, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const { execute, state: response } = useAsyncState(requestSalesInfo, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const {
    isShow: isShowClientContactSettingModal,
    onShow: onShowClientContactSettingModal,
    onHide: onHideClientContactSettingModal,
} = useModal();
const {
    isShow: isShowContactSettingModal,
    onShow: onShowContactSettingModal,
    onHide: onHideContactSettingModal,
} = useModal();
const idx = useRouteParams('idx', null, { transform: Number });

// state
/** 대표 연락처 */
const isMain = ref<Primitive>('mainContact');
/** 관련 연락처 */
const contactClientList = ref<any>([]);

// computed
/** 영업 정보 상세 */
const datas = computed(() => (response.value.data ?? []));
/** 담당자 목록 */
const managerDatas = computed(() => (responseManager.value.data ?? []));
/** 담당자 목록 Option */
const managerOption = computed(() => managerDatas.value.map(({ name, agencyName }) => ({
    label: name,
    exp: agencyName,
    value: name,
})));

// validate
const validationSchema = yup.object({
    salesName: yup.string()
        .required(),
    salesServiceType: yup.string(),
    startDate: yup.date()
        .required(),
    mainManger: yup.string()
        .required(),
    subManger: yup.string(),
    clientContactFormList: yup.object()
        .shape({
            clientContactSeq: yup.string(),
            isMain: yup.string(),
        }),
    estimatedAmount: yup.string()
        .required(),
    finalEstimateDate: yup.date()
        .required(),
    reflectionPlannedAmount: yup.string()
        .required(),
    reflectionPlannedDate: yup.date()
        .required(),
    contractPossibility: yup.string()
        .required(),
    contractTargetDate: yup.date()
        .required(),
    contractAmount: yup.string(),
    contractStartDate: yup.date(),
    contractEndDate: yup.date(),
    reflectionCompletedAmount: yup.string(),
    plannedReflectionAmount: yup.string(),
    plannedReflectionDate: yup.date(),
});
const { defineField, submitCount, setFieldValue } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});
const [salesName, salesNameProps] = defineField('salesName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [salesServiceType, salesServiceTypeProps] = defineField('salesServiceType', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [startDate, startDateProps] = defineField('startDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [mainManger, mainMangerProps] = defineField('mainManger', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [subManger, subMangerProps] = defineField('subManger', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [estimatedAmount, estimatedAmountProps] = defineField('estimatedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [finalEstimateDate, finalEstimateDateProps] = defineField('finalEstimateDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionPlannedAmount, reflectionPlannedAmountProps] = defineField('reflectionPlannedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionPlannedDate, reflectionPlannedDateProps] = defineField('reflectionPlannedDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractPossibility, contractPossibilityProps] = defineField('contractPossibility', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractTargetDate, contractTargetDateProps] = defineField('contractTargetDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractAmount, contractAmountProps] = defineField('contractAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractStartDate, contractStartDateProps] = defineField('contractStartDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [contractEndDate, contractEndDateProps] = defineField('contractEndDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [reflectionCompletedAmount, reflectionCompletedAmountProps] = defineField('reflectionCompletedAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [plannedReflectionAmount, plannedReflectionAmountProps] = defineField('plannedReflectionAmount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [plannedReflectionDate, plannedReflectionDateProps] = defineField('plannedReflectionDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// methods
/**
 * 담당자 목록 조회 요청
 */
const requestManager = async () => await executeManager(0);

/**
 * 영업 정보 상세 조회 요청
 */
const requestInfo = async () => {
    await execute(0, idx.value);

    setFieldValue('salesName', datas.value?.salesName);
    setFieldValue('salesServiceType', datas.value?.salesServiceType);
    setFieldValue('startDate', datas.value?.startDate);
    setFieldValue('mainManger', datas.value?.mainManger);
    setFieldValue('subManger', datas.value?.subManger);
};

// event
const onClickCancel = () => {
    router.go(-1);
};

const onClickToDay = () => {
    startDate.value = dayjs();
};

const onClientContactList = (val: any) => {
    contactClientList.value = val;
};

const onUpdate = (updateValue: Primitive) => {
    isMain.value = updateValue;
};

requestManager();
requestInfo();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/sales/setting";
</style>
