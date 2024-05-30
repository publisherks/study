/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** 타이틀 */
    readonly VITE_TITLE: string;

    /**
     * API hostname
     * - 빈 값인 경우 `location.hostname`(브라우저의 hostname) 값으로 설정
     * - `VITE_API_URL`(API URL) 값이 우선 적용됨
     * @example 'api.wim-x.kr'
     */
    readonly VITE_API_HOST?: string;

    /**
     * API port
     * - 빈 값인 경우 `location.port`(브라우저의 port) 값으로 설정
     * - `VITE_API_URL`(API URL) 값이 우선 적용됨
     * @example 89
     */
    readonly VITE_API_PORT?: string;

    /**
     * API URL
     * - 빈 값인 경우 `VITE_API_HOST` 값과 `VITE_API_PORT` 값으로 URL 설정
     * @example 'https://api.wim-x.kr'
     */
    readonly VITE_API_URL?: string;

    /**
     * API 호출 시 CORS 오류 방지를 위한 Proxy URL
     * @requires `VITE_API_URL` (원본 API URL)
     * @example '/api'
     */
    readonly VITE_API_PROXY?: string;

    /** ESLint 자동 수정 여부 */
    readonly VITE_ESLINT_AUTO_FIX?: string;

    /**
     * Sentry 권한 토큰
     * @see {@link https://ulalalab.sentry.io/settings/account/api/auth-tokens}
     */
    readonly VITE_SENTRY_AUTH_TOKEN?: string;

    /**
     * Sentry DSN
     * @see {@link https://ulalalab.sentry.io/settings/projects/vue-standard/keys}
     */
    readonly VITE_SENTRY_DSN?: string;

    /** Sentry 사용 여부 */
    readonly VITE_SENTRY_ENABLED?: string;

    /**
     * Vite Server hostname
     * - `0.0.0.0` 또는 `true`로 설정 시 외부에서 접근 가능
     * @see {@link https://ko.vitejs.dev/config/server-options.html#server-host}
     * @default '0.0.0.0'
     */
    readonly VITE_SERVER_HOST?: string;

    /**
     * Vite Server port
     * @default 3000
     */
    readonly VITE_SERVER_PORT?: string;

    /**
     * Vite Preview hostname
     * - `0.0.0.0` 또는 `true`로 설정 시 외부에서 접근 가능
     * @see {@link https://ko.vitejs.dev/config/preview-options.html#preview-host}
     * @default '0.0.0.0'
     */
    readonly VITE_PREVIEW_HOST?: string;

    /**
     * Vite Preview port
     * @default 4173
     */
    readonly VITE_PREVIEW_PORT?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
