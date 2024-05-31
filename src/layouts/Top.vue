<!-- Top 레이아웃 -->
<template>
    <div class="top-container">
        <div
            ref="userMenuElement"
            :class="['user', { open: isShowUserMenu }]"
            @click="onClickUserMenu"
        >
            <div class="icon">
                <i class="fa-sharp fa-solid fa-user" />
            </div>
            <div class="user-menu">
                <ul>
                    <li @click="onClickProfile">
                        마이페이지
                    </li>
                    <li @click="onClickLogout">
                        로그아웃
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onClickOutside, useToggle } from '@vueuse/core';

import { RouterName } from '@/mappings/enum';

import useLoginStore from '@/stores/login';
import useMessageStore from '@/stores/message';

// router
const router = useRouter();

// refs
const userMenuElement = ref<HTMLDivElement | null>(null);

// global
const [isShowUserMenu, toggleUserMenu] = useToggle();

// store
const { logout } = useLoginStore();
/** 메시지 */
const messageStore = useMessageStore();

// event
/**
 * 로그아웃 클릭 시
 */
const onClickLogout = () => messageStore.$patch({
    isShow: true,
    title: '로그아웃',
    message: '로그아웃하시겠습니까?',
    isConfirm: true,
    buttonText: { ok: '로그아웃' },
    callback: {
        ok() {
            logout();
            router.push({ name: RouterName.Login });
        },
    },
});

/**
 * 프로필 클릭 시
 */
const onClickProfile = () => router.push({ name: RouterName.Mypage });

/**
 * 계정 메뉴 클릭 시
 */
const onClickUserMenu = () => toggleUserMenu();

/**
 * 계정 메뉴 외부 클릭 시
 */
onClickOutside(userMenuElement, () => toggleUserMenu(false));
</script>
