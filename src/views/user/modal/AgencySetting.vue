<!-- 대리점 상세 모달 -->
<template>
    <VModal>
        <template #top>
            대리점 {{ isModify ? '상세' : '추가' }}
        </template>
        <div
            v-if="isModify"
            class="flex-r mb-6"
        >
            <p class="required-text self-b mr-10">
                * 대리점을 삭제해도 영업 정보는 삭제되지 않습니다.
            </p>
            <VBtn
                :kind="ButtonType.Delete"
                sm
                @click="onClickDelete"
            >
                삭제
            </VBtn>
        </div>
        <VTable
            hori
            class="mb-20"
        >
            <template #col>
                <col width="12%" />
                <col width="*" />
            </template>
            <tr>
                <th>대리점명</th>
                <td>
                    <VInput
                        v-model:value="agencyName"
                        v-bind="agencyNameProps"
                        class="pull"
                    />
                </td>
            </tr>
        </VTable>
        <p class="message-text align-l">
            계정 등록 수 제한
        </p>
        <VTable
            hori
            class="mt-12"
        >
            <template #col>
                <col width="12%" />
                <col width="38%" />
                <col width="12%" />
                <col width="38%" />
            </template>
            <tr>
                <th>관리자</th>
                <td>
                    <VInput
                        v-model:value="adminAccountCount"
                        v-bind="adminAccountCountProps"
                        class="pull"
                    />
                </td>
                <th>일반</th>
                <td>
                    <VInput
                        v-model:value="managerAccountCount"
                        v-bind="managerAccountCountProps"
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
                {{ isModify ? '수정' : '저장' }}
            </VBtn>
        </template>
    </VModal>
</template>

<script lang="ts">
import type { AgencyInfo } from '@/api/agency/interface';

// type
export type Props = {
    item?: AgencyInfo;
};

export type Emits = {
    /** 모달 숨김 */
    hide: [];

    submit: [];
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import { ButtonType } from '@/mappings/enum';

// props
const { item } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// computed
/** 수정 여부 */
const isModify = computed(() => Boolean(item));

// validate
const validationSchema = yup.object({
    agencyName: yup.string(),
    adminAccountCount: yup.number(),
    managerAccountCount: yup.number(),
});
const { defineField, submitCount } = useForm({
    initialValues: {
        agencyName: item?.agencyName || '',
        adminAccountCount: item?.adminAccountCount || '',
        managerAccountCount: item?.managerAccountCount || '',
    },
    validationSchema: toTypedSchema(validationSchema),
});
const [agencyName, agencyNameProps] = defineField('agencyName', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [adminAccountCount, adminAccountCountProps] = defineField('adminAccountCount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });
const [managerAccountCount, managerAccountCountProps] = defineField('managerAccountCount', { props: ({ errors }) => ({ invalidMessage: submitCount.value ? errors[0] : '' }) });

// event
/**
 * 설정
 */
const onSubmit = () => console.log('setting');

/**
 * 삭제
 */
const onClickDelete = () => {
    emit('submit');
    emit('hide');
};

/**
 * Esc 키 입력 시
 */
onKeyStroke('Escape', () => emit('hide'));
</script>

<style lang="scss" scoped>
:deep(.modal-container) {
    width: rem(900px);
}
</style>
