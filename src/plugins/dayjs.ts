import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

/**
 * Day.js 초기 설정
 * @see {@link https://day.js.org}
 */
const init = () => {
    // 시간대(UTC) 관련 함수 추가
    dayjs.extend(utc);
    dayjs.extend(timezone);

    // 한글화
    dayjs.locale('ko');
};

export default init;
