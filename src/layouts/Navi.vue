<!-- Navi 레이아웃 -->
<template>
    <nav id="nav">
        <ul>
            <li
                v-for="({ icon, name, childrens = [] }, index) in navis"
                :key="`navis.${name}`"
                :class="{ depth1: childrens.length }"
            >
                <!-- 하위 메뉴가 있는 경우 -->
                <template v-if="childrens.length">
                    <a
                        :class="{ on: (index === currentMenu.index) }"
                        @click="onClickMenu(index)"
                    >
                        <i :class="icon" />
                        {{ name }}
                    </a>

                    <!-- 하위 메뉴 -->
                    <div :class="['sub-nav', { show: (index === currentMenu.index && currentMenu.isShow) }]">
                        <ul>
                            <li
                                v-for="(children) in childrens"
                                :key="`navis.${children.name}`"
                            >
                                <RouterLink :to="{ name: children.name }">
                                    {{ children.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </template>

                <!-- 하위 메뉴가 없는 경우 -->
                <RouterLink
                    v-else
                    :to="{ name }"
                >
                    <i :class="icon" />
                    {{ name }}
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import menus from '@/mappings/menus';

import useLoginStore from '@/stores/login';

// type
/** 현재 메뉴 정보 */
type CurrentMenu = {
    /** 인덱스 */
    index: number;

    /** 하위 메뉴 표시 여부 */
    isShow: boolean;
};

// router
const route = useRoute();

// store
const { authority } = storeToRefs(useLoginStore());

// state
/** 현재 메뉴 정보 */
const currentMenu = ref<CurrentMenu>({
    index: -1,
    isShow: false,
});

// computed
/** 메뉴 목록 */
const navis = computed(
    () => menus.map(
        (value) => value.childrens
            ? ({
                ...value,
                childrens: value.childrens.filter(({ roles }) => (!roles || roles.includes(authority.value))),
            })
            : value,
    )
        .filter(({ roles, childrens }) => ((!roles || roles.includes(authority.value)) && (!childrens || childrens.length))),
);

// methods
/**
 * 초기 설정
 */
const init = () => {
    // 현재 메뉴 인덱스 찾기
    const index = navis.value.findIndex(({ name, childrens = [], links = [] }) => (
        name === route.name
        || childrens.some(({ name, links = [] }) => (name === route.name || links.some((value) => (value === route.name))))
        || links.some((value) => (value === route.name))
    ));

    // 현재 메뉴 인덱스를 찾은 경우
    if (index >= 0) {
        // 현재 메뉴 설정
        currentMenu.value = {
            index,
            isShow: true,
        };
    }
};

// event
/**
 * 메뉴 클릭 시
 * @param index 클릭한 메뉴 인덱스
 */
const onClickMenu = (index: number) => {
    currentMenu.value = {
        // 클릭한 메뉴 인덱스 설정
        index,

        // 하위 메뉴 표시/숨김
        isShow: (index !== currentMenu.value.index || !currentMenu.value.isShow),
    };
};

// watch
watch(() => route.name, init, { immediate: true });
</script>
