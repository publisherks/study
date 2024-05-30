<!-- 메시지 모달 컴포넌트 -->
<template>
    <VModal v-if="isShow">
        <template
            v-if="title"
            #top
        >
            {{ title }}
        </template>
        <p
            class="message-text"
            v-html="nl2br(message)"
        />
        <template #bottom>
            <VBtn
                v-if="isConfirm"
                :kind="ButtonType.Sub1"
                class="mr-10"
                @click="onClickButton('cancel')"
            >
                {{ buttonText.cancel || '취소' }}
            </VBtn>
            <VBtn @click="onClickButton('ok')">
                {{ buttonText.ok || '확인' }}
            </VBtn>
        </template>
    </VModal>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { ButtonType } from '@/mappings/enum';

import useMessageStore from '@/stores/message';

import nl2br from '@/utils/format/nl2br';

// store
/** 메시지 */
const messageStore = useMessageStore();
const { isShow, title, message, isConfirm, buttonText } = storeToRefs(messageStore);
const { onClickButton } = messageStore;
</script>
