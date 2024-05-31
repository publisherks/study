import dayjs from 'dayjs';
import type { ConfigType } from 'dayjs';

/**
 * `utc`(UTC) 시간을 `tz`(시간대)의 시간으로 변환
 * @param utc UTC
 * @param tz 시간대
 * @param format 형식
 * @return 변환 후 시간
 */
const utcToTimezone = ({
    utc,
    tz = new Intl.DateTimeFormat()
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
