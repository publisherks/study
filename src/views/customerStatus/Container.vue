<!-- 고객 현황 -->
<template>
    <VTitle>
        고객 현황
        <template #button>
            <VBtn
                class="mr-10"
                @click="onClickNew"
            >
                신규 고객사 등록
            </VBtn>
        </template>
    </VTitle>
    <div class="contents">
        <form
            class="search-div mb-13"
            @submit.prevent="onSearch"
        >
            <VDatePicker
                v-model:value="search.dates"
                class="xl mr-14"
            />
            <VSelect
                v-bind="search.sortType"
                :options="sortTypeOption"
                leftLabel
                class="mr-14"
            >
                <template #label>
                    정렬 기준
                </template>
            </VSelect>
            <VCheck
                v-model:checked="search.order"
                class="mr-14"
            >
                오름차순
            </VCheck>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onExcelDown"
            >
                Excel 다운로드
            </VBtn>
            <VSelect
                v-bind="search.type"
                :options="searchTypeOption"
                class="ml-auto mr-10"
            />
            <VInput
                v-model:value="search.text"
                leftUnit
                search
                class="xl mr-10"
            />
            <VBtn
                :kind="ButtonType.Cancel"
                type="submit"
            >
                검색
            </VBtn>
        </form>
        <VGrid
            :cols="2"
            :colsWidth="['auto', 400]"
        >
            <VCell>
                <VTable class="mb-12">
                    <template #col>
                        <col width="*" />
                        <col width="12.5%" />
                        <col width="38.8%" />
                        <col width="15%" />
                    </template>
                    <template #head>
                        <th>회사명</th>
                        <th>영업 진행</th>
                        <th>고객사 위치</th>
                        <th>연락처</th>
                    </template>
                    <tr v-show="!total">
                        <td colspan="4">
                            {{ message }}
                        </td>
                    </tr>
                    <tr
                        v-for="({ seq, clientName, address, salesCount, clientContactCount }) in datas"
                        :key="`${clientName}`"
                    >
                        <td>
                            <p
                                class="link-text"
                                @click="onClickDetail(seq)"
                            >
                                {{ clientName }}
                            </p>
                        </td>
                        <td>{{ salesCount }}</td>
                        <td>{{ address }}</td>
                        <td>
                            <VBtn
                                :kind="ButtonType.Sub"
                                sm
                                @click="onClickContact(seq)"
                            >
                                {{ clientContactCount }}개
                            </VBtn>
                        </td>
                    </tr>
                </VTable>
                <VPagination
                    v-model:page="search.page"
                    limit="12"
                    :total="total"
                />
            </VCell>
            <VCell>
                <div class="contact-list">
                    <div
                        v-if="isEmpty(selectClient)"
                        class="empty-box"
                    >
                        <p class="empty-text">
                            연락처 버튼을 클릭하면 연락처를 볼 수 있습니다.
                        </p>
                    </div>
                    <template v-else>
                        <VTitle
                            sub
                            class="mb-12"
                        >
                            {{ selectClient.clientName }}
                        </VTitle>
                        <VBtn
                            :kind="ButtonType.Sub"
                            class="w-100 mb-10"
                            @click="onContactSetting()"
                        >
                            연락처 추가
                        </VBtn>
                        <VInfiniteScroll :maxHeight="596">
                            <ContactBox
                                v-for="item in selectClient.clientContact"
                                :key="item.contactName"
                                :data="item"
                                @setting="onContactSetting($event)"
                            />
                        </VInfiniteScroll>
                    </template>
                </div>
            </VCell>
        </VGrid>
    </div>
    <ClientSetting
        v-if="isShowClientSettingModal"
        @hide="onHideClientSettingModal"
    />
    <ContactSetting
        v-if="isShowContactSettingModal"
        @hide="onHideContactSettingModal"
        :data="propsData"
    />
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useAsyncState } from '@vueuse/core';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { ButtonType } from '@/mappings/enum';

import { requestClientList } from '@/api/client';
import type { ContactInfo, ClientInfo, RequestClientList } from '@/api/client/interface';

import ContactBox from '@/views/customerStatus/components/ContactBox.vue';
import ClientSetting from '@/views/customerStatus/modal/ClientSetting.vue';
import ContactSetting from '@/views/customerStatus/modal/ContactSetting.vue';

import isEmpty from '@/utils/isEmpty';

// variable
const sortTypeOption = [
    {
        label: '영업 시작일',
        value: '영업 시작일',
    },
    {
        label: '고객사명',
        value: '고객사명',
    },
    {
        label: '영업 진행 수',
        value: '영업 진행 수',
    },
];

const searchTypeOption = [
    {
        label: '고객사명',
        value: 'CLIENT_NAME',
    },
    {
        label: '고객사 위치',
        value: 'CLIENT_LOCATION',
    },
    {
        label: '고객사 연락처',
        value: 'CLIENT_CONTACT',
    },
];

// global
const { onResponse } = useEvent();
const { execute, isLoading, state: response } = useAsyncState(requestClientList, {}, {
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

// state
/** 검색 조건 */
const search: RequestClientList = reactive({
    /** 현재 페이지 번호 */
    page: 1,

    dates: '',

    sortType: '',

    order: false,

    type: '',

    text: '',
});

const selectClient = ref<ClientInfo>({});
const propsData = ref<ContactInfo>({});

// computed
/** 고객 목록 */
const datas = computed(() => (response.value.data ?? []));
/** 메시지 */
const message = computed(() => isLoading.value ? '데이터를 불러오는 중입니다.' : (response.value.message || '검색 결과가 없습니다.'));
/** 총 항목 수 */
const total = computed(() => (response.value.totalCount ?? 0));

// methods
/**
 * 고객 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

// event
/**
 * 검색
 */
const onSearch = () => {
    if (search.page === 1) {
        requestList();

        return;
    }

    search.page = 1;
};

const onClickNew = () => onShowClientSettingModal();

const onExcelDown = () => {
    console.log('Excel 다운로드');
};

const onClickDetail = (index: ClientInfo['seq']) => {
    console.log(index);
};

const onClickContact = (index: ClientInfo['seq']) => {
    selectClient.value = datas.value.find(({ seq }) => seq === index);
};

const onContactSetting = (data: ContactInfo) => {
    propsData.value = data;
    onShowContactSettingModal();
};

// watch
watch(() => search.page, requestList, { immediate: true });
</script>

<style lang="scss" scoped>
@import "@/assets/scss/pages/customerStatus";
@import "@/assets/scss/components/contactBox";
</style>
