<!-- 계정 목록 -->
<template>
    <VTitle class="mb-20">
        계정 목록
    </VTitle>
    <div class="contents">
        <form
            class="flex mb-13"
            @submit.prevent="onSearchList"
        >
            <VInput
                v-model:value.trim="searchUsers.name"
                placeholder="이름"
                autofocus
                class="lg mr-6"
            />
            <VSelect
                v-model:value="searchUsers.position"
                :options="convertOptionsToPrependAll(positions)"
                placeholder="직급"
                class="mr-6"
            />
            <VSelect
                v-model:value="searchUsers.partname"
                :options="convertOptionsToPrependAll(partnames)"
                placeholder="부서명"
                class="mr-6"
            />
            <VSelect
                v-model:value="searchUsers.team"
                :options="convertOptionsToPrependAll(teams)"
                placeholder="팀명"
                class="mr-10"
            />
            <VSelect
                v-model:value="searchUsers.isUsed"
                :options="convertOptionsToPrependAll(uses)"
                placeholder="사용 여부"
                class="mr-10"
            />
            <VBtn
                type="submit"
                :kind="ButtonType.Sub1"
                class="mr-20"
                :disabled="isLoadingUsers"
            >
                조회
            </VBtn>
            <p class="search-text">
                조회 결과 :
                <strong>{{ comma(totalUsers) }} 건</strong>
            </p>
            <VBtn
                :kind="ButtonType.Delete"
                class="ml-auto"
                :disabled="isLoadingDelete || !checks.length"
                @click="onClickDelete"
            >
                일괄 미사용
            </VBtn>
            <VBtn
                :kind="ButtonType.Sub1"
                class="ml-10"
                :disabled="isLoadingRestore || !checks.length"
                @click="onClickRestore"
            >
                일괄 사용
            </VBtn>
            <VBtn
                class="ml-10"
                @click="onClickRegist"
            >
                신규 계정 등록
            </VBtn>
        </form>
        <VTable class="mb-20">
            <template #col>
                <col width="40px" />
                <col width="60px" />
                <col width="15%" />
                <col width="19%" />
                <col width="*" />
                <col width="21%" />
                <col width="80px" />
                <col width="90px" />
            </template>
            <template #head>
                <th>
                    <VCheck
                        :checked="isAllCheck"
                        @update:checked="onChangeAllCheck"
                    />
                </th>
                <th>No.</th>
                <th>이름</th>
                <th>직급</th>
                <th>부서명</th>
                <th>팀명</th>
                <th>사용 여부</th>
                <th>관리</th>
            </template>
            <tr v-show="!totalUsers">
                <td colspan="8">
                    {{ isLoadingUsers ? '데이터를 불러오는 중입니다.' : (responseUsers.message || '검색 결과가 없습니다.') }}
                </td>
            </tr>
            <tr
                v-for="({ idx, name, position, partname, team, isUsed }) in users"
                :key="`users${idx}`"
                :class="{ unuse: !isUsed }"
            >
                <td>
                    <VCheck
                        :checked="checks.includes(idx)"
                        @update:checked="onChangeCheck(idx, $event)"
                    />
                </td>
                <td>{{ idx }}</td>
                <td>{{ name || 'ㅡ' }}</td>
                <td>{{ position || 'ㅡ' }}</td>
                <td>{{ partname || 'ㅡ' }}</td>
                <td>{{ team || 'ㅡ' }}</td>
                <td>{{ getLabelByValue(uses, isUsed) }}</td>
                <td>
                    <VBtn
                        :kind="ButtonType.Sub1"
                        table
                        @click="onClickModify(idx)"
                    >
                        수정
                    </VBtn>
                </td>
            </tr>
        </VTable>
        <VPagination
            v-model:page="searchUsers.page"
            :limit="searchUsers.size"
            :total="totalUsers"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { HistoryState } from 'vue-router';
import { useAsyncState } from '@vueuse/core';

import { requestCodeList } from '@/api/code';
import { requestUserList, requestDeleteUser, requestRestoreUser } from '@/api/user';
import type { UserInfo, RequestUserList } from '@/api/user/interface';

import { convertOptionsToPrependAll } from '@/functions/convert';

import useEvent from '@/global/useEvent';
import useSelectOption from '@/global/useSelectOption';

import { RouterName, ButtonType, Code } from '@/mappings/enum';
import { uses } from '@/mappings/option';
import type { SearchList } from '@/mappings/types/common';

import useMessageStore from '@/stores/message';

import comma from '@/utils/format/comma';

// variable
const historyStatePrefix = 'searchUsers.';

// router
const router = useRouter();
const historyState: HistoryState = history.state;

// global
const { onResponse } = useEvent();
const { state: responsePartnames } = useAsyncState(() => requestCodeList({ parentCode: Code.Partname }), {}, { onSuccess: onResponse });
const { state: responsePositions } = useAsyncState(() => requestCodeList({ parentCode: Code.Position }), {}, { onSuccess: onResponse });
const { execute: requestTeams, state: responseTeams } = useAsyncState(requestCodeList, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const { execute: requestUsers, isLoading: isLoadingUsers, state: responseUsers } = useAsyncState(requestUserList, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { isShowMessage: false }),
});
const { execute: requestDelete, isLoading: isLoadingDelete } = useAsyncState(requestDeleteUser, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: requestList }),
});
const { execute: requestRestore, isLoading: isLoadingRestore } = useAsyncState(requestRestoreUser, {}, {
    immediate: false,
    onSuccess: (response) => onResponse(response, { success: requestList }),
});
const { getLabelByValue } = useSelectOption();

// store
/** 메시지 */
const messageStore = useMessageStore();

// state
/** 체크 목록 */
const checks = ref<number[]>([]);
/** 계정 목록 검색 조건 */
const searchUsers: SearchList<RequestUserList> = reactive({
    /** 현재 페이지 번호 */
    page: 1,

    /** 페이지당 표시할 항목 수 */
    size: 10,

    ...Object.fromEntries(
        Object.entries(historyState)
            .filter(([key]) => key.includes(historyStatePrefix))
            .map(([key, value]) => [key.replace(historyStatePrefix, ''), value]),
    ),
});

// computed
/** 전체 체크 여부 */
const isAllCheck = computed(() => Boolean(users.value.length && users.value.length === checks.value.length));
/** 부서명 목록 */
const partnames = computed(() => (responsePartnames.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 직급 목록 */
const positions = computed(() => (responsePositions.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 팀명 목록 */
const teams = computed(() => (responseTeams.value.data?.results ?? []).map(({ code, name }) => ({
    label: name,
    value: code,
})));
/** 계정 목록 총 항목 수 */
const totalUsers = computed(() => (responseUsers.value.data?.totalCount ?? 0));
/** 계정 목록 */
const users = computed(() => (responseUsers.value.data?.results ?? []));

// methods
/**
 * 목록 검색 요청
 */
const requestList = () => requestUsers(0, {
    ...searchUsers,
    page: (searchUsers.page - 1),
});

// event
/**
 * 전체 체크 여부 변경 시
 * @param checked 전체 체크 여부
 */
const onChangeAllCheck = (checked: boolean) => {
    checks.value = checked ? users.value.map(({ idx }) => idx) : [];
};

/**
 * 체크 여부 변경 시
 * @param value 값
 * @param checked 체크 여부
 */
const onChangeCheck = (value: UserInfo['idx'], checked: boolean) => {
    if (checked) {
        checks.value.push(value);

        return;
    }

    checks.value = checks.value.filter((checked) => (value !== checked));
};

/**
 * 일괄 미사용 클릭 시
 */
const onClickDelete = () => messageStore.$patch({
    isShow: true,
    title: '일괄 미사용',
    message: '선택한 계정을 모두 미사용 처리하시겠습니까?\n미사용 처리 시 해당 계정은 시스템 접속이 되지 않습니다.',
    isConfirm: true,
    buttonText: { ok: '미사용' },
    callback: { ok: () => requestDelete(0, checks.value) },
});

/**
 * 수정 클릭 시
 * @param idx idx
 */
const onClickModify = (idx: UserInfo['idx']) => router.push({
    name: RouterName.SetUser,
    params: { idx },
    state: Object.fromEntries(
        Object.entries(searchUsers)
            .map(([key, value]) => [`${historyStatePrefix}${key}`, value]),
    ),
});

/**
 * 등록 클릭 시
 */
const onClickRegist = () => router.push({
    name: RouterName.SetUser,
    state: Object.fromEntries(
        Object.entries(searchUsers)
            .map(([key, value]) => [`${historyStatePrefix}${key}`, value]),
    ),
});

/**
 * 일괄 사용 클릭 시
 */
const onClickRestore = () => messageStore.$patch({
    isShow: true,
    title: '일괄 사용',
    message: '선택한 계정을 모두 사용 처리하시겠습니까?\n사용 처리 시 해당 계정은 시스템 접속이 가능하게 됩니다.',
    isConfirm: true,
    buttonText: { ok: '사용' },
    callback: { ok: () => requestRestore(0, checks.value) },
});

/**
 * 목록 검색
 */
const onSearchList = () => {
    if (searchUsers.page === 1) {
        requestList();

        return;
    }

    searchUsers.page = 1;
};

// watch
watch(() => searchUsers.page, requestList, { immediate: true });
watch(() => searchUsers.partname, (parentCode) => {
    // 부서명 검색 조건 변경 시 기존 선택된 팀명 검색 조건 초기화
    searchUsers.team = '';

    // 팀명 목록 검색 요청
    requestTeams(0, { parentCode });
});
watch(users, () => {
    // 계정 목록 변경 시 체크 목록 초기화
    checks.value = [];
}, { deep: true });
</script>
