<!-- 대리점 관리 -->
<template>
    <VTitle>
        대리점 관리
        <template #button>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onUserListClick"
            >
                회원 관리
            </VBtn>
            <VBtn
                class="ml-14"
                @click="onClickSetting"
            >
                대리점 추가
            </VBtn>
        </template>
    </VTitle>
    <div class="contents">
        <form
            class="search-div mb-13"
            @submit.prevent="onSearch"
        >
            <VInput
                v-model:value.trim="search.text"
                leftUnit
                search
                placeholder="대리점명을 검색하세요."
                class="ml-auto xl ml-10"
            />
            <VBtn
                :kind="ButtonType.Cancel"
                class="ml-10"
                @click="onSearch()"
            >
                검색
            </VBtn>
        </form>
        <VTable class="mb-12">
            <template #col>
                <col width="37.2%" />
                <col width="15.7%" />
                <col width="15.7%" />
                <col width="15.7%" />
                <col width="15.7%" />
            </template>
            <template #head>
                <tr>
                    <th rowspan="2">
                        대리점명
                    </th>
                    <th colspan="2">
                        관리자 계정
                    </th>
                    <th colspan="2">
                        일반 계정
                    </th>
                </tr>
                <tr>
                    <th>등록 가능한 계정 수</th>
                    <th>사용중</th>
                    <th>등록 가능한 계정 수</th>
                    <th>사용중</th>
                </tr>
            </template>
            <tr v-show="!total">
                <td colspan="5">
                    {{ message }}
                </td>
            </tr>
            <tr
                v-for="({ seq, agencyName, adminAccountCount, managerAccountCount, currentAdminAccountCount, currentManagerAccountCount }) in datas"
                :key="`${agencyName}`"
                @click="onClickSetting(seq)"
                class="cursor-p"
            >
                <td>{{ agencyName }}</td>
                <td>{{ adminAccountCount }}</td>
                <td>{{ currentAdminAccountCount }}</td>
                <td>{{ managerAccountCount }}</td>
                <td>{{ currentManagerAccountCount }}</td>
            </tr>
        </VTable>
        <VPagination
            v-model:page="search.page"
            limit="12"
            :total="total"
        />
    </div>
    <AgencySetting
        v-if="isShowSettingModal"
        @hide="onHideSettingModal"
        :item="propsData"
        @submit="onHandover"
    />
    <Handover
        v-if="isShowHandoverModal"
        @hide="onHideHandoverModal"
    />
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncState } from '@vueuse/core';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { requestAgencyList } from '@/api/agency';
import type { AgencyInfo, RequestAgencyList } from '@/api/agency/interface';

import { RouterName, ButtonType } from '@/mappings/enum';

import AgencySetting from '@/views/user/modal/AgencySetting.vue';
import Handover from '@/views/user/modal/Handover.vue';

// router
const router = useRouter();
const { state } = history;

// global
const { onResponse } = useEvent();
const { execute, isLoading, state: response } = useAsyncState(requestAgencyList, {}, {
    immediate: false,
    onSuccess: onResponse,
});

const {
    isShow: isShowSettingModal,
    onShow: onShowSettingModal,
    onHide: onHideSettingModal,
} = useModal();
const {
    isShow: isShowHandoverModal,
    onShow: onShowHandoverModal,
    onHide: onHideHandoverModal,
} = useModal();

// state
/** 검색 조건 */
const search: RequestAgencyList = reactive({
    /** 현재 페이지 번호 */
    page: 1,

    ...state.search,
});
const propsData = ref<AgencyInfo | undefined>();

// computed
/** 대리점 목록 */
const datas = computed(() => (response.value.data ?? []));
/** 메시지 */
const message = computed(() => isLoading.value ? '데이터를 불러오는 중입니다.' : (response.value.message || '검색 결과가 없습니다.'));
/** 총 항목 수 */
const total = computed(() => (response.value.totalCount ?? 0));

// methods
/**
 * 대리점 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

// event
/**
 * 회원 관리
 */
const onUserListClick = () => router.push({ name: RouterName.UserList });

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

/**
 * 수정 클릭 시
 * @param idx 번호
 */
const onClickSetting = (index: AgencyInfo['seq']) => {
    if (index) {
        const item = response?.value?.data?.find(({ seq }) => seq === index);
        propsData.value = item;
    } else {
        propsData.value = undefined;
    }

    onShowSettingModal();
};

/**
 * 인수인계
 */
const onHandover = () => {
    onShowHandoverModal();
};

// watch
watch(() => search.page, requestList, { immediate: true });
</script>
