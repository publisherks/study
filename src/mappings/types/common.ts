/** emits */
export type Emits<P extends unknown[], R = void> = (...params: P) => R;

/** 입력 값 */
export type InputValue = Numeric | Nullish;

/** 원시 값 */
export type Primitive = InputValue | boolean;

/** JSON */
export type JSON<T = unknown> = T[] | KeyValuePair<T>;

/** 객체 */
export type KeyValuePair<T = unknown> = Record<string, T>;

/** Select Option */
export type Option<T = Primitive> = {
    /** 라벨 */
    label: string;

    /** 설명 */
    exp?: string;

    /** 값 */
    value: T;
};

/** 객체의 값 유니언 */
export type UnionObjectValue<T extends object, U> = {
    [K in keyof T]: T[K] | U;
};

/** Nullish */
export type Nullish = null | undefined;

/** 숫자 */
export type Numeric = number | string;

/** 파일 업로드 */
export type UploadFile = File | FileList | Nullish;
