<!-- 고객사 등록 모달 -->
<template>
    <VModal>
        <template #top>
            신규 고객사 등록
        </template>
        <p class="flex-r required-text mb-7">
            *은 필수입력 항목 입니다.
        </p>
        <VTable hori>
            <template #col>
                <col width="10%" />
                <col width="40%" />
                <col width="10%" />
                <col width="40%" />
            </template>
            <tr>
                <th class="required">
                    고객사명
                </th>
                <td>
                    <VInput
                        v-model:value="contactName"
                        v-bind="contactNameProps"
                        placeholder="고객사명을 입력하세요."
                        class="pull"
                    />
                </td>
                <th class="required">
                    고객사 유형
                </th>
                <td>
                    <VSelect
                        v-model:value="clientType"
                        v-bind="clientTypeProps"
                        :options="clientTypeOption"
                        placeholder="고객사 유형 선택하세요."
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    생산 및 제공
                </th>
                <td>
                    <VInput
                        v-model:value="product"
                        v-bind="productProps"
                        placeholder="생산 및 제공되는 내용을 입력하세요."
                        class="pull"
                    />
                </td>
                <th>
                    사업자 등록 번호
                </th>
                <td>
                    <VInput
                        v-model:value="bizNo"
                        v-bind="bizNoProps"
                        placeholder="사업자 등록 번호를 입력하세요."
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th>
                    홈페이지
                </th>
                <td>
                    <VInput
                        v-model:value="homePage"
                        v-bind="homePageProps"
                        placeholder="고객사 홈페이지 주소를 입력하세요."
                        class="pull"
                    />
                </td>
                <th>
                    유입 경로
                </th>
                <td>
                    <VSelect
                        v-model:value="inquiryPath"
                        v-bind="inquiryPathProps"
                        :options="inquiryPathOption"
                        placeholder="유입 경로를 선택하세요."
                        class="pull"
                    />
                </td>
            </tr>
            <tr>
                <th
                    rowspan="2"
                    class="required"
                >
                    고객사 주소
                </th>
                <td colspan="3">
                    <VGrid
                        :cols="3"
                        :colGap="[10]"
                    >
                        <VSelect
                            v-model:value="country"
                            v-bind="countryProps"
                            :options="countryOption"
                            placeholder="국가 선택"
                            class="pull"
                        />
                        <VSelect
                            v-model:value="region"
                            v-bind="regionProps"
                            :options="regionOption"
                            placeholder="도/시 선택"
                            class="pull"
                        />
                        <VSelect
                            v-model:value="city"
                            v-bind="cityProps"
                            :options="cityOption"
                            placeholder="시/군/구 선택"
                            class="pull"
                        />
                    </VGrid>
                </td>
            </tr>
            <tr>
                <td colspan="3">
                    <VInput
                        v-model:value="detailAddress"
                        v-bind="detailAddressProps"
                        placeholder="상세주소를 입력하세요."
                        class="pull"
                    />
                </td>
            </tr>
        </VTable>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
            <VBtn @click="onSubmit">
                등록
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
import type { ClientInfo } from '@/api/client/interface';

// type
export type Props = {
    data?: ClientInfo;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

// props
const { data } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

const clientTypeOption = [
    {
        label: '제조업',
        value: 'MANUFACTURING',
    },
    {
        label: '유통업',
        value: 'DISTRIBUTION',
    },
    {
        label: '농업',
        value: 'AGRICULTURE',
    },
    {
        label: '생산업',
        value: 'PRODUCTION',
    },
    {
        label: '미정',
        value: 'UNDEFINED',
    },
];

const inquiryPathOption = [
    {
        label: '신문 기사 및 언론 보도',
        value: '신문 기사 및 언론 보도',
    },
    {
        label: '잡지, 브로슈어',
        value: '잡지, 브로슈어',
    },
    {
        label: '전시회',
        value: '전시회',
    },
    {
        label: '지인 소개',
        value: '지인 소개',
    },
    {
        label: '웹사이트 검색',
        value: '웹사이트 검색',
    },
    {
        label: 'SNS (카카오톡, 페이스북, 블로그)',
        value: 'SNS (카카오톡, 페이스북, 블로그)',
    },
];

const countryOption = [
    {
        label: '대한민국',
        value: '대한민국',
    },
    {
        label: '일본',
        value: '일본',
    },
    {
        label: '중국',
        value: '중국',
    },
    {
        label: '미국',
        value: '미국',
    },
];

const regionOption = [
    {
        label: '서울특별시',
        value: '서울특별시',
    },
    {
        label: '부산광역시',
        value: '부산광역시',
    },
    {
        label: '대구광역시',
        value: '대구광역시',
    },
    {
        label: '인천광역시',
        value: '인천광역시',
    },
];

const cityOption = [
    {
        label: '종로구',
        value: '종로구',
    },
    {
        label: '중구',
        value: '중구',
    },
    {
        label: '용산구',
        value: '용산구',
    },
    {
        label: '성동구',
        value: '성동구',
    },
];

// validate
const validationSchema = yup.object({
    contactName: yup.string()
        .required(),
    clientType: yup.string()
        .required(),
    product: yup.string(),
    bizNo: yup.string(),
    homePage: yup.string(),
    inquiryPath: yup.string(),
    country: yup.string()
        .required(),
    region: yup.string()
        .required(),
    city: yup.string()
        .required(),
    detailAddress: yup.string()
        .required(),
});
const { defineField, submitCount } = useForm({
    initialValues: {
        contactName: data?.clientName || '',
        clientType: data?.clientType || '',
        product: data?.product || '',
        bizNo: data?.bizNo || '',
        homePage: data?.homePage || '',
    },
    validationSchema: toTypedSchema(validationSchema),
});
const [contactName, contactNameProps] = defineField('contactName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [clientType, clientTypeProps] = defineField('clientType', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [product, productProps] = defineField('product', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [bizNo, bizNoProps] = defineField('bizNo', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [homePage, homePageProps] = defineField('homePage', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [inquiryPath, inquiryPathProps] = defineField('inquiryPath', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [country, countryProps] = defineField('country', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [region, regionProps] = defineField('region', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [city, cityProps] = defineField('city', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [detailAddress, detailAddressProps] = defineField('detailAddress', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
const onSubmit = () => {
    console.log('submit');
};

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
    width: rem(1600px);
}
</style>
