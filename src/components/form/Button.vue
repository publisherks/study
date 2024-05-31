<!-- Button 컴포넌트 -->
<template>
    <button
        :class="className"
        :type="type"
    >
        <slot />
    </button>
</template>

<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue';

import { ButtonType } from '@/mappings/enum';

// type
// REVIEW: 배포(빌드) 시 Vue 컴파일러에서 오류가 발생되는 이슈로 인한 임시 수정
// export type Props = Pick<ButtonHTMLAttributes, 'type'> & {
export type Props = {
    /** 유형 */
    type?: ButtonHTMLAttributes['type'];

    /** 구분 */
    kind?: ButtonType;

    /** 작은 버튼 여부 */
    sm?: boolean;

    /** 큰 버튼 여부 */
    lg?: boolean;
};
</script>
<script setup lang="ts">
import { computed } from 'vue';

// props
const { type = 'button', kind = ButtonType.Main, sm: isSmall, lg: isLarge } = defineProps<Props>();

// computed
/** 클래스명 */
const className = computed(() => {
    let className = `btn-${kind}`;

    if (isLarge) {
        className += '-lg';
    } else if (isSmall) {
        className += '-sm';
    }

    return className;
});
</script>
