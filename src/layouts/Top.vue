<!-- Top 레이아웃 -->
<template>
    <div class="top-container">
        <p class="cate-nav">
            {{ currentMenu.name }}
            <template v-if="currentMenu.children">
                <i class="fas fa-chevron-right" />
                {{ currentMenu.children }}
            </template>
        </p>
        <div
            ref="userMenuElement"
            :class="['user', { open: isShowUserMenu }]"
            @click="onClickUserMenu"
        >
            <div class="icon">
                <i class="fa-solid fa-user" />
            </div>
            <div class="user-menu">
                <ul>
                    <li @click="onClickProfile">
                        프로필
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
import { useRoute, useRouter } from 'vue-router';
import { onClickOutside, reactiveComputed, useToggle } from '@vueuse/core';

import { RouterName } from '@/mappings/enum';
import menus from '@/mappings/menus';
import type { NullableHTMLElement } from '@/mappings/types/common';

import useLoginStore from '@/stores/login';
import useMessageStore from '@/stores/message';

// router
const route = useRoute();
const router = useRouter();

// refs
const userMenuElement = ref<NullableHTMLElement<HTMLDivElement>>(null);

// global
const [isShowUserMenu, setIsShowUserMenu] = useToggle();

// store
const { logout } = useLoginStore();
/** 메시지 */
const messageStore = useMessageStore();

// computed
/** 현재 메뉴 */
const currentMenu = reactiveComputed(() => {
    const { name, childrens = [] } = (menus.find(({ name, childrens = [], links = [] }) => (
        name === route.name
        || childrens.some(({ name, links = [] }) => (name === route.name || links.some((value) => (value === route.name))))
        || links.some((value) => (value === route.name))
    )) ?? {});

    return {
        name: (name ?? route.name),
        children: childrens.length ? route.name : null,
    };
});

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
            // 로그아웃
            logout();

            // 로그인 화면 표시
            router.push({ name: RouterName.Login });
        },
    },
});

/**
 * 프로필 클릭 시
 */
const onClickProfile = () => router.push({ name: RouterName.Profile });

/**
 * 계정 메뉴 클릭 시
 */
const onClickUserMenu = () => setIsShowUserMenu();

/**
 * 계정 메뉴 외부 클릭 시
 */
onClickOutside(userMenuElement, () => setIsShowUserMenu(false));
</script>
