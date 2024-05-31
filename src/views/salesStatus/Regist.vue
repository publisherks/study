<!-- 영업 등록 -->
<template>
    <VTitle>
        신규 영업 등록
    </VTitle>
    <VGrid :cols="2">
        <VCell>
            <div class="contents">
                <VTitle
                    sub
                    class="mb-12"
                >
                    고객사 선택
                </VTitle>
                <div class="flex mb-12">
                    <VInput
                        v-model:value="search"
                        leftUnit
                        search
                        placeholder="검색하세요."
                        @keyup.enter="onSearch"
                        class="pull mr-10"
                    >
                        <template #label>
                            고객사명
                        </template>
                    </VInput>
                    <VBtn
                        :kind="ButtonType.Cancel"
                        @click="onSearch"
                        class="self-b"
                    >
                        검색
                    </VBtn>
                </div>
                <VInfiniteScroll
                    v-if="isListShow"
                    class="client-list"
                    :maxHeight="647"
                >
                    <ul>
                        <li
                            v-for="({ seq, clientName, salesCount, isApi }, index) in clientDatas"
                            :key="`client${index}`"
                            @click="onClickClient(seq)"
                        >
                            <strong>{{ clientName }}</strong>
                            <span
                                v-if="isApi"
                                class="link-text"
                            >신규 등록하기</span>
                            <template v-else>
                                <p>{{ salesCount }}개의 영업 진행중</p>
                            </template>
                        </li>
                        <li @click="onClickClient()">
                            <strong>{{ registClient }}</strong>
                            <span class="link-text">고객사 명을 "{{ registClient }}"로 등록</span>
                        </li>
                    </ul>
                </VInfiniteScroll>
                <div
                    v-else
                    class="empty-box"
                >
                    <p
                        v-if="isEmpty(registClient)"
                        class="empty-text align-c"
                    >
                        고객사 명을 검색해 선택해주세요.
                    </p>
                </div>
            </div>
        </VCell>
        <VCell>
            <div class="contents">
                <VTitle
                    sub
                    class="mb-12"
                >
                    영업 정보
                </VTitle>
                <template v-if="!isEmpty(selectClient)">
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
                </template>
            </div>
        </VCell>
    </VGrid>
    <div class="flex-r mt-12">
        <VBtn
            :kind="ButtonType.Cancel"
            @click="$router.push({ name: RouterName.SalesStatus });"
            class="mr-14"
        >
            취소
        </VBtn>
        <VBtn :disabled="isEmpty(selectClient)">
            등록
        </VBtn>
    </div>
    <ClientSetting
        v-if="isShowClientSettingModal"
        @hide="onHideClientSettingModal"
        :data="propsData"
    />
    <ContactSetting
        v-if="isShowContactSettingModal"
        @hide="onHideContactSettingModal"
    />
    <ClientContactSetting
        v-if="isShowClientContactSettingModal"
        @hide="onHideClientContactSettingModal"
        @submit="onClientContactList"
        :idx="propsIdx"
    />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { requestClientApiList } from '@/api/sales';
import { requestManagerList } from '@/api/inquiry';
import type { ClientApiInfo } from '@/api/sales/interface';

import { ButtonType, RouterName } from '@/mappings/enum';
import type { Primitive } from '@/mappings/types/common';

import ClientSetting from '@/views/customerStatus/modal/ClientSetting.vue';
import ContactSetting from '@/views/customerStatus/modal/ContactSetting.vue';
import ClientContactSetting from '@/views/salesStatus/modal/ClientContactSetting.vue';

import isEmpty from '@/utils/isEmpty';

import dayjs from 'dayjs';

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
const { execute, state: response } = useAsyncState(requestClientApiList, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const { execute: executeManager, state: responseManager } = useAsyncState(requestManagerList, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const {
    isShow: isShowClientSettingModal,
    onShow: onShowClientSettingModal,
    onHide: onHideClientSettingModal,
} = useModal();
const {
    isShow: isShowContactSettingModal,
    onShow: onShowContactSettingModal,
    onHide: onHideContactSettingModal,
} = useModal();
const {
    isShow: isShowClientContactSettingModal,
    onShow: onShowClientContactSettingModal,
    onHide: onHideClientContactSettingModal,
} = useModal();

// state
/** 고객사명 검색 */
const search = ref<string | undefined>('');
/** 등록 할 고객명 */
const registClient = ref<string | undefined>('');
/** 고객사리스트 여부 */
const isListShow = ref<boolean>(false);
/** 선택 한 고객사 */
const selectClient = ref<ClientApiInfo | undefined>({});
/** 등록 모달에 전달 할 고객사명 */
const propsData = ref<object>({});
/** 관련 연락처 모달에 전달 할 idx */
const propsIdx = ref<number | undefined>();
/** 대표 연락처 */
const isMain = ref<Primitive>('mainContact');
/** 관련 연락처 */
const contactClientList = ref<any>([]);

// computed
/** 외부 고객사 목록 */
const clientDatas = computed(() => (response.value.data ?? []));
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
});
const { defineField, submitCount } = useForm({
    validationSchema: toTypedSchema(validationSchema),
});
const [salesName, salesNameProps] = defineField('salesName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [salesServiceType, salesServiceTypeProps] = defineField('salesServiceType', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [startDate, startDateProps] = defineField('startDate', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [mainManger, mainMangerProps] = defineField('mainManger', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [subManger, subMangerProps] = defineField('subManger', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// methods
/**
 * 외부 고객사 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

/**
 * 담당자 목록 조회 요청
 */
const requestManager = async () => await executeManager(0);

// event
const onSearch = () => {
    requestList();
    isListShow.value = true;
    registClient.value = search.value;
};

const onClickClient = (seq?: ClientApiInfo['seq']) => {
    const item = clientDatas.value.find((value) => seq === value.seq);

    if (!isEmpty(item) && !item?.isApi) {
        selectClient.value = item;
        isListShow.value = false;
    } else {
        if (isEmpty(item)) {
            propsData.value = {
                clientName: search.value,
            };
        } else {
            propsData.value = {
                clientName: item.clientName,
            };
        }
        onShowClientSettingModal();
        isListShow.value = false;
    }

    requestManager();
    propsIdx.value = item?.seq;
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

watch(() => selectClient.value, (val) => {
    search.value = val?.clientName;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/sales/setting";
</style>
