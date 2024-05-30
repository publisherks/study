import dayjs from 'dayjs';
import type { ConfigType } from 'dayjs';

/**
 * `utc`(UTC) 시간을 `tz`(시간대)의 시간으로 변환
 * @param options 옵션
 * @param options.utc UTC
 * @param options.tz 시간대
 * @param options.format 형식
 * @return 변환 후 시간
 */
const utcToTimezone = ({
    utc,
    tz = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,
    format = 'YYYY-MM-DD HH:mm:ss',
}: {
    utc?: ConfigType;
    tz?: string;
    format?: string;
}) => dayjs(utc)
    .utc(true)
    .tz(tz)
    .format(format);

export default utcToTimezone;