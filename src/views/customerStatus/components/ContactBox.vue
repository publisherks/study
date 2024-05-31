<template>
    <div class="contact-box">
        <div class="contact-top">
            <strong>{{ data?.contactName }}</strong>
            <span>{{ data?.dept }}</span>
            <div class="icon-group">
                <i
                    class="fa-sharp fa-regular fa-pen mr-14"
                    @click="onSettingClick"
                />
                <i
                    class="fa-sharp fa-regular fa-trash-xmark"
                    @click="onDeleteClick"
                />
            </div>
        </div>
        <ul>
            <li
                v-for="item in data?.clientContactSalesSimpleDtoList"
                :key="item.salesName"
            >
                <p
                    class="link-text"
                    @click="onSalesClick(item.salesSeq)"
                >
                    {{ item.salesName }}
                </p>
            </li>
        </ul>
        <div class="contact-info">
            <p>연락처<strong>{{ data?.personalTelNumber }}</strong></p>
            <p>이메일<strong>{{ data?.email }}</strong></p>
        </div>
    </div>
</template>

<script lang="ts">
import type { ContactInfo } from '@/api/client/interface';

// type
export type Props = {
    data?: ContactInfo;
};

export type Emits = {
    setting: [ContactInfo['seq']];
};
</script>
<script setup lang="ts">
import useMessageStore from '@/stores/message';

// props
const { data } = defineProps<Props>();

// emits
const emit = defineEmits<Emits>();

// store
/** 메시지 */
const messageStore = useMessageStore();

// event
const onSalesClick = (index: ContactInfo['clientContactSalesSimpleDtoList']['salesSeq']) => {
    console.log(index);
};

const onSettingClick = () => emit('setting', data);

const onDeleteClick = () => messageStore.$patch({
    isShow: true,
    isConfirm: true,
    message: '연락처를 삭제하시겠습니까?',
    callback: {
        ok() {
            console.log('삭제');
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/contactBox";
</style>
