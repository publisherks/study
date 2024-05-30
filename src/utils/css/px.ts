import type { Numeric } from '@/mappings/types/common';

import isNumeric from '@/utils/isNumeric';

/**
 * `px`(픽셀) 값이 숫자인 경우 `${px}px` 문자열로 변환
 * @param px 픽셀(px)
 * @return `${px}px` 문자열
 */
const px = (px: Numeric) => (typeof px === 'string' && !isNumeric(px)) ? px : `${px}px`;

export default px;
