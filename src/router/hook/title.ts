import type { NavigationHookAfter } from 'vue-router';
import { useTitle } from '@vueuse/core';

/**
 * 경로 변경 후에 브라우저 타이틀 변경
 */
const afterEach: NavigationHookAfter = (to) => useTitle(`${to.name as Exclude<typeof to.name, symbol>} | ${import.meta.env.VITE_TITLE}`);

export { afterEach };
