<!-- 회원 관리 -->
<template>
    <VTitle>
        전체 회원 관리
        <template #button>
            <VBtn
                :kind="ButtonType.Sub"
                @click="onAgencyListClick"
            >
                대리점 관리
            </VBtn>
            <VBtn
                @click="onShowApplyJoinModal"
                class="ml-14"
            >
                회원가입 신청 관리
            </VBtn>
        </template>
    </VTitle>
    <div class="contents">
        <form
            class="search-div mb-13"
            @submit.prevent="onSearch"
        >
            <VSelect
                v-model:value="search.type"
                :options="[
                    {
                        label: '성명',
                        value: '성명',
                    },
                    {
                        label: '직함',
                        value: '직함',
                    },
                    {
                        label: '소속',
                        value: '소속',
                    },
                    {
                        label: '부서',
                        value: '부서',
                    },
                    {
                        label: '이메일',
                        value: '이메일',
                    },
                    {
                        label: '개인 연락처',
                        value: '개인 연락처',
                    },
                    {
                        label: '회사 연락처',
                        value: '회사 연락처',
                    },
                    {
                        label: '권한',
                        value: '권한',
                    },
                ]"
                placeholder="검색 조건"
                class="ml-auto"
            />
            <VInput
                v-model:value.trim="search.text"
                leftUnit
                search
                class="xl ml-10"
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
                <col width="10%" />
                <col width="7.5%" />
                <col width="12%" />
                <col width="12%" />
                <col width="*" />
                <col width="9.5%" />
                <col width="9.5%" />
                <col width="9.5%" />
            </template>
            <template #head>
                <th>성명</th>
                <th>직함</th>
                <th>소속</th>
                <th>부서</th>
                <th>이메일</th>
                <th>개인 연락처</th>
                <th>회사 연락처</th>
                <th>권한</th>
            </template>
            <tr v-show="!total">
                <td colspan="8">
                    {{ message }}
                </td>
            </tr>
            <tr
                v-for="({ idx, name, position, dept, agencyName, email, personalTelNumber, companyTelNumber, addAuthorities }) in datas"
                :key="`datas${idx}`"
                @click="onClickModify(idx)"
                class="cursor-p"
            >
                <td>{{ name || 'ㅡ' }}</td>
                <td>{{ position || 'ㅡ' }}</td>
                <td>{{ dept || 'ㅡ' }}</td>
                <td>{{ agencyName || 'ㅡ' }}</td>
                <td>{{ email || 'ㅡ' }}</td>
                <td>{{ personalTelNumber || 'ㅡ' }}</td>
                <td>{{ companyTelNumber || 'ㅡ' }}</td>
                <td>{{ authorityText(addAuthorities) }}</td>
            </tr>
        </VTable>
        <VPagination
            v-model:page="search.page"
            limit="12"
            :total="total"
        />
    </div>
    <ModifyModal
        v-if="isShowModifyModal"
        @hide="onHideModifyModal"
        :idx="propsData"
        @submit="onHandover"
    />
    <ApplyJoinModal
        v-if="isShowApplyJoinModal"
        @hide="onHideApplyJoinModal"
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

import { requestUserList } from '@/api/user';
import type { UserInfo, RequestUserList } from '@/api/user/interface';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { RouterName, ButtonType } from '@/mappings/enum';

import ModifyModal from '@/views/user/modal/ModifyModal.vue';
import ApplyJoinModal from '@/views/user/modal/ApplyJoinModal.vue';
import Handover from '@/views/user/modal/Handover.vue';

// global
const {
    isShow: isShowModifyModal,
    onShow: onShowModifyModal,
    onHide: onHideModifyModal,
} = useModal();
const {
    isShow: isShowApplyJoinModal,
    onShow: onShowApplyJoinModal,
    onHide: onHideApplyJoinModal,
} = useModal();
const {
    isShow: isShowHandoverModal,
    onShow: onShowHandoverModal,
    onHide: onHideHandoverModal,
} = useModal();

// variable
/** 권한 */
const authority = [
    {
        key: 'ROLE_MASTER',
        text: 'Master',
    },
    {
        key: 'ROLE_ADMIN',
        text: 'Admin',
    },
    {
        key: 'ROLE_MANAGER',
        text: 'Manager',
    },
    {
        key: 'ROLE_PARTNER_ADMIN',
        text: 'Partner_Admin',
    },
    {
        key: 'ROLE_PARTNER_MANAGER',
        text: 'Partner_Manager',
    },
];

// router
const router = useRouter();
const { state } = history;

// global
const { onResponse } = useEvent();
const { execute, isLoading, state: response } = useAsyncState(requestUserList, {}, {
    immediate: false,
    onSuccess: onResponse,
});

// state
/** 체크 목록 */
const checks = ref<number[]>([]);
/** 검색 조건 */
const search: RequestUserList = reactive({
    /** 현재 페이지 번호 */
    page: 1,

    ...state.search,
});
const propsData = ref<number | undefined>();

// computed
/** 계정 목록 */
const datas = computed(() => (response.value.data ?? []));
/** 메시지 */
const message = computed(() => isLoading.value ? '데이터를 불러오는 중입니다.' : (response.value.message || '검색 결과가 없습니다.'));
/** 총 항목 수 */
const total = computed(() => (response.value.totalCount ?? 0));

// methods
/**
 * 계정 목록 조회 요청
 */
const requestList = async () => await execute(0, search);

// event
/**
 * 대리점 관리
 */
const onAgencyListClick = () => router.push({ name: RouterName.AgencyList });

/**
 * 수정 클릭 시
 * @param idx 번호
 */
const onClickModify = (index: UserInfo['idx']) => {
    // const item = response?.value?.data?.find(({ idx }) => idx === index);
    propsData.value = index;
    onShowModifyModal();
};

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
 * 인수인계
 */
const onHandover = () => {
    onShowHandoverModal();
};

const authorityText = (value: string) => {
    let authorityText = '';
    authority.forEach(({ key, text }) => {
        if (value.indexOf(key) !== -1) {
            authorityText = text;
        }
    });
    return authorityText;
};

// watch
watch(() => search.page, requestList, { immediate: true });
watch(datas, () => {
    // 목록 변경 시 체크 목록 초기화
    checks.value = [];
}, { deep: true });
</script>
