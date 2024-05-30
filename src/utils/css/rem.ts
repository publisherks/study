import type { Numeric } from '@/mappings/types/common';

import isNumeric from '@/utils/isNumeric';

/**
 * `px`(픽셀)을 `rem`으로 변환
 * @param px 픽셀
 * @param base rem 기준 픽셀
 * @return rem
 */
const rem = (px: Numeric, base = 16) => isNumeric(px) ? `${1 / base * Number(px)}rem` : '';

export default rem;
