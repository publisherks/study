<template>
    <div class="info-box">
        <strong class="tit">{{ data?.clientName }}</strong>
        <p
            v-if="data?.clientType"
            class="type"
        >
            {{ data?.clientType }}
        </p>
        <p
            v-if="data?.product"
            class="product"
        >
            {{ data?.product }}
        </p>
        <p class="bizno">
            사업자 등록 번호 : {{ data?.bizNo ?? '-' }}
        </p>
        <a
            v-if="data?.homepage"
            :href="`http://${data?.homepage}`"
            target="_blank"
            class="homepage"
        >
            {{ data?.homepage }}
        </a>
        <p class="address">
            {{ data?.address }}
        </p>
        <div class="control">
            <i
                class="icon fa-sharp fa-regular fa-phone mr-14"
                @click="onClickContactList"
            />
            <i
                class="icon fa-sharp fa-regular fa-pen"
                @click="onClickClientSetting"
            />
        </div>
    </div>
    <ClientSetting
        v-if="isShowClientSettingModal"
        @hide="onHideClientSettingModal"
        :data="data"
    />
    <ContactList
        v-if="isShowContactListModal"
        @hide="onHideContactListModal"
        :clientName="data?.clientName"
        :datas="datas"
    />
</template>

<script lang="ts">
import type { SalesDetail } from '@/api/sales/interface';

// type
export type Props = {
    data?: SalesDetail;
};
</script>
<script setup lang="ts">
import { computed } from 'vue';
import { useAsyncState } from '@vueuse/core';

import useEvent from '@/global/useEvent';
import useModal from '@/global/useModal';

import { requestClientInfo } from '@/api/client';

import ClientSetting from '@/views/customerStatus/modal/ClientSetting.vue';
import ContactList from '@/views/salesStatus/modal/ContactList.vue';

// props
const { data } = defineProps<Props>();

// global
const { onResponse } = useEvent();
const { execute, state: response } = useAsyncState(requestClientInfo, {}, {
    immediate: false,
    onSuccess: onResponse,
});
const {
    isShow: isShowClientSettingModal,
    onShow: onShowClientSettingModal,
    onHide: onHideClientSettingModal,
} = useModal();
const {
    isShow: isShowContactListModal,
    onShow: onShowContactListModal,
    onHide: onHideContactListModal,
} = useModal();

// computed
/** 고객사 seq */
const idx = computed(() => 7);
/** 고객사 연락처 목록 */
const datas = computed(() => (response.value.data?.clientContact ?? []));

// methods
/**
 * 고객사 조회 요청
 */
const requestList = async () => await execute(0, idx.value);

// event
const onClickClientSetting = () => {
    onShowClientSettingModal();
};

const onClickContactList = () => {
    onShowContactListModal();
};

// lifecycle
requestList();
</script>
