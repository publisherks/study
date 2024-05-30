<!--
    Modal 컴포넌트

    1. slots
    1) <template #top> : 상단(타이틀)
    2) default : 내용
    3) <template #bottom> : 하단(버튼)
-->
<template>
    <VCol>
        <VBtn @click="onClickShowMessage">
            Message Modal
        </VBtn>
    </VCol>
</template>

<script setup lang="ts">
import useMessageStore from '@/stores/message';

// store
/** 메시지 */
const messageStore = useMessageStore();

// event
/**
 * 메시지 표시 클릭 시
 */
const onClickShowMessage = () => messageStore.$patch({
    isShow: true,
    message: '메시지입니다.',
});
</script>
