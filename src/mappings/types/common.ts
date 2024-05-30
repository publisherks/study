import type { CommonRequestList } from '@/api/interface';

/** emits */
export type Emits<P extends unknown[], R = void> = (...params: P) => R;

/** 모달 emits */
export type ModalEmits = {
    /** 모달 숨김 */
    hide: [];
};

/** 입력 값 */
export type InputValue = Numeric | Nullish;

/** 원시 값 */
export type Primitive = InputValue | boolean;

/** JSON */
export type JSONValue<T = unknown> = T[] | Record<string, T>;

/** `null` 포함 */
export type Nullable<T> = T | null;

/** HTML 요소 */
export type NullableHTMLElement<T extends HTMLElement = HTMLElement> = Nullable<T>;

/** 생성자 함수의 인스턴스 타입 */
export type NullableInstanceType<T extends abstract new (...args: any) => any> = Nullable<InstanceType<T>>;

/** Nullish */
export type Nullish = null | undefined;

/** 숫자 */
export type Numeric = number | string;

/** Select Option */
export type Option<T = Primitive> = {
    /** 라벨 */
    label: string;

    /** 값 */
    value: T;
};

/** 객체의 값 유니언 */
export type UnionObjectValue<T extends object, U> = {
    [K in keyof T]: T[K] | U;
};

/** 목록 검색 조건 */
export type SearchList<T extends CommonRequestList> = Omit<T, 'page'> & Required<Pick<T, 'page'>>;

/** 파일 업로드 */
export type UploadFile = File | FileList | Nullish;
