import type { NavigationHookAfter } from 'vue-router';
import { useTitle } from '@vueuse/core';

/**
 * 경로 변경 후에 브라우저 타이틀 변경
 */
const afterEach: NavigationHookAfter = (to) => {
    const titles = [import.meta.env.VITE_TITLE];

    let { name } = to;

    // 경로명 타입이 symbol인 경우
    if (typeof name === 'symbol') {
        // 심볼에 대한 설명을 경로명으로 설정
        name = name.description;
    }

    // 최종적으로 경로명이 있는 경우
    if (name) {
        // 경로명 추가
        titles.unshift(name);
    }

    // 브라우저 타이틀 변경
    useTitle(titles.join(' | '));
};

export { afterEach };
