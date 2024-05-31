<!-- 회원가입 신청 관리 모달 -->
<template>
    <VModal>
        <template #top>
            회원가입 신청 관리
        </template>
        <VInfiniteScroll :maxHeight="530">
            <VTable>
                <template #col>
                    <col width="7%" />
                    <col width="8%" />
                    <col width="12%" />
                    <col width="13%" />
                    <col width="*" />
                    <col width="9%" />
                    <col width="9%" />
                    <col width="24%" />
                </template>
                <template #head>
                    <th>성명</th>
                    <th>직함</th>
                    <th>소속</th>
                    <th>부서</th>
                    <th>이메일</th>
                    <th>개인 연락처</th>
                    <th>회사 연락처</th>
                    <th>선택</th>
                </template>
                <tr
                    v-for="({ name, position, dept, agencyName, email, personalTelNumber, companyTelNumber, addAuthorities }, idx) in list"
                    :key="`data${idx}`"
                >
                    <td>{{ name || '' }}</td>
                    <td>{{ position || '' }}</td>
                    <td>{{ dept || '' }}</td>
                    <td>{{ agencyName || '' }}</td>
                    <td>{{ email || '' }}</td>
                    <td>{{ personalTelNumber || '' }}</td>
                    <td>{{ companyTelNumber || '' }}</td>
                    <td>
                        <div class="flex">
                            <VSelect
                                v-bind="addAuthorities"
                                :options="authority"
                                class="lg"
                            />
                            <VBtn
                                :kind="ButtonType.Sub"
                                class="ml-10"
                            >
                                승인
                            </VBtn>
                            <VBtn
                                :kind="ButtonType.Delete"
                                class="ml-10"
                            >
                                취소
                            </VBtn>
                        </div>
                    </td>
                </tr>
            </VTable>
        </VInfiniteScroll>
        <template #bottom>
            <VBtn
                :kind="ButtonType.Cancel"
                class="mr-10"
                @click="emit('hide')"
            >
                취소
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
// type
export type Emits = {
    /** 모달 숨김 */
    hide: [];
};
</script>
<script setup lang="ts">
import { ref } from 'vue';
import { onKeyStroke } from '@vueuse/core';

import { ButtonType } from '@/mappings/enum';

// emits
const emit = defineEmits<Emits>();

// variable
/** 권한 */
const authority = [
    {
        label: 'Master',
        value: 'ROLE_MASTER',
    },
    {
        label: 'Admin',
        value: 'ROLE_ADMIN',
    },
    {
        label: 'Manager',
        value: 'ROLE_MANAGER',
    },
    {
        label: 'Partner_Admin',
        value: 'ROLE_PARTNER_ADMIN',
    },
    {
        label: 'Partner_Manager',
        value: 'ROLE_PARTNER_MANAGER',
    },
];

// state
const list = ref<any>(Array.from({ length: 20 }, (_, idx) => ({
    name: `성명${idx}`,
    position: `직함${idx}`,
    dept: `소속${idx}`,
    agencyName: `부서${idx}`,
    email: `이메일${idx}`,
    personalTelNumber: `개인 연락처${idx}`,
    companyTelNumber: `회사 연락처${idx}`,
    addAuthorities: {
        label: 'Manager',
        value: 'ROLE_MANAGER',
    },
})));

// event
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
