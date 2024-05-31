<!--
    Pagination 컴포넌트

    1. model (* : 필수)
    1) v-model:page (Numeric: '@/mappings/types/common') : 현재 페이지 번호 (default : 1)

    2. props (* : 필수)
    1) limit (Numeric: '@/mappings/types/common') : 페이지당 표시할 항목 수 (default : 20)
    2) total (Numeric: '@/mappings/types/common') : 총 항목 수 (default : 0)
    3) block (Numeric: '@/mappings/types/common') : 표시할 페이지 수 (default : 10)
-->
<template>
    <VFlex class="mb-30">
        <VRow cols="1">
            <VCol>
                <VPagination
                    v-model:page="page"
                    total="150"
                    limit="10"
                />
            </VCol>
        </VRow>
    </VFlex>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// state
/** 현재 페이지 번호 */
const page = ref<number>(1);
</script>
