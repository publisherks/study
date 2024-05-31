const jsRules = require('./js.cjs');
const tsRules = require('./ts.cjs');

/**
 * Vue ESLint Rules
 * @see {@link https://eslint.vuejs.org/rules}
 */
const vueRules = {
    /**
     * `<template>`에서 `eslint-disable` 주석 사용 지원
     * @see {@link https://eslint.vuejs.org/rules/comment-directive}
     */
    'vue/comment-directive': [
        2,
        {
            /** 사용하지 않는 `eslint-disable` HTML 주석 확인 여부 */
            reportUnusedDisableDirectives: true,
        },
    ],

    /**
     * 컴포넌트 이름이 항상 여러 단어인지 확인
     * @see {@link https://eslint.vuejs.org/rules/multi-word-component-names}
     */
    'vue/multi-word-component-names': 0,

    /**
     * 속성의 중복 확인
     * @see {@link https://eslint.vuejs.org/rules/no-duplicate-attributes}
     */
    'vue/no-duplicate-attributes': [
        2,
        {
            /** `v-bind:class` 디렉티브가 일반 `class` 속성과 공존 여부 */
            allowCoexistClass: false,

            /** `v-bind:style` 디렉티브가 일반 `style` 속성과 공존 여부 */
            allowCoexistStyle: false,
        },
    ],

    /**
     * 템플릿 내부에서 사용되지 않는 등록된 컴포넌트 확인
     * @see {@link https://eslint.vuejs.org/rules/no-unused-components}
     */
    'vue/no-unused-components': [
        2,
        {
            /** 템플릿에서 바인딩이 탐지된 경우 모든 확인 무시 여부 */
            ignoreWhenBindingPresent: false,
        },
    ],

    /**
     * 계산된 프로퍼티에 반환문이 있는지 확인
     * @see {@link https://eslint.vuejs.org/rules/return-in-computed-property}
     */
    'vue/return-in-computed-property': 0,

    /**
     * 템플릿의 커스텀 컴포넌트에 하이픈으로 연결된 속성 이름을 사용하지 않는지 확인
     * @see {@link https://eslint.vuejs.org/rules/attribute-hyphenation}
     */
    'vue/attribute-hyphenation': [2, 'never'],

    /**
     * 첫 번째 속성의 위치 확인
     * @see {@link https://eslint.vuejs.org/rules/first-attribute-linebreak}
     */
    'vue/first-attribute-linebreak': [
        2,
        {
            /** 속성이 한 줄에 있을 경우 첫 번째 속성 앞에 있는 줄 바꿈 확인 */
            singleline: 'beside',
        },
    ],

    /**
     * `<template>`에서 들여쓰기 확인
     * @see {@link https://eslint.vuejs.org/rules/html-indent}
     */
    'vue/html-indent': [2, 4],

    /**
     * 내용이 없는 요소는 자체 닫힘 확인
     * @see {@link https://eslint.vuejs.org/rules/html-self-closing}
     */
    'vue/html-self-closing': [2, { html: { void: 'always' } }],

    /**
     * 템플릿의 커스텀 컴포넌트에 하이픈으로 연결된 v-on 이벤트 이름을 사용하지 않는지 확인
     * @see {@link https://eslint.vuejs.org/rules/v-on-event-hyphenation}
     */
    'vue/v-on-event-hyphenation': [2, 'never'],

    /**
     * `v-slot` 디렉티브 스타일 확인
     * - `#` 단축 문법 사용
     * @see {@link https://eslint.vuejs.org/rules/v-slot-style}
     */
    'vue/v-slot-style': [2, 'shorthand'],

    /**
     * 속성 순서 확인
     * @see {@link https://eslint.vuejs.org/rules/attributes-order}
     */
    'vue/attributes-order': 0,

    /**
     * v-html 사용 확인 (XSS 공격 방지)
     * @see {@link https://eslint.vuejs.org/rules/no-v-html}
     */
    'vue/no-v-html': 0,

    /**
     * 컴포넌트에 프로퍼티 순서 확인
     * @see {@link https://eslint.vuejs.org/rules/order-in-components}
     */
    'vue/order-in-components': 0,

    /**
     * 사용 가능한 `lang` 이외의 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/block-lang}
     */
    'vue/block-lang': [2, { script: { lang: 'ts' } }],

    /**
     * 컴포넌트 최상위 요소의 순서 확인
     * @see {@link https://eslint.vuejs.org/rules/block-order}
     */
    'vue/block-order': [
        2,
        {
            /** 최상위 요소 이름의 순서 */
            order: [
                'template',
                'script:not([setup])',
                'script[setup]',
                'style:not([scoped])',
                'style[scoped]',
            ],
        },
    ],

    /**
     * 블록 태그를 열고 닫기 전에 줄 바꿈 확인
     * @see {@link https://eslint.vuejs.org/rules/block-tag-newline}
     */
    'vue/block-tag-newline': [
        2,
        {
            /** 단일 라인 블록 태그를 열고 닫기 전에 줄 바꿈 필요 */
            singleline: 'always',
        },
    ],

    /**
     * 컴포넌트 API 스타일 확인
     * - `<script setup>` 허용
     * @see {@link https://eslint.vuejs.org/rules/component-api-style}
     */
    'vue/component-api-style': [2, ['script-setup']],

    /**
     * 템플릿에서 컴포넌트 태그 이름이 파스칼 표기법인지 확인
     * @see {@link https://eslint.vuejs.org/rules/component-name-in-template-casing}
     */
    'vue/component-name-in-template-casing': [
        2,
        'PascalCase',
        {
            /** 등록된 컴포넌트만 확인 여부 */
            registeredComponentsOnly: false,
        },
    ],

    /**
     * `components` 옵션에서 컴포넌트 이름이 파스칼 표기법인지 확인
     * @see {@link https://eslint.vuejs.org/rules/component-options-name-casing}
     */
    'vue/component-options-name-casing': 2,

    /**
     * 커스텀 이벤트 이름에 대해 카멜 표기법인지 확인
     * @see {@link https://eslint.vuejs.org/rules/custom-event-name-casing}
     */
    'vue/custom-event-name-casing': [
        2,
        'camelCase',
        {
            /** 무시할 이벤트 이름 */
            ignores: [
                // 'click:row'
                '/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u',
            ],
        },
    ],

    /**
     * `defineEmits`의 타입 기반 선언 확인
     * @see {@link https://eslint.vuejs.org/rules/define-emits-declaration}
     */
    'vue/define-emits-declaration': [2, 'type-literal'],

    /**
     * `defineProps`의 타입 기반 선언 확인
     * @see {@link https://eslint.vuejs.org/rules/define-props-declaration}
     */
    'vue/define-props-declaration': 2,

    /**
     * 명시적 `type` 속성 없이 버튼 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/html-button-has-type}
     */
    'vue/html-button-has-type': 2,

    /**
     * HTML 주석에서 줄 바꿈 확인
     * @see {@link https://eslint.vuejs.org/rules/html-comment-content-newline}
     */
    'vue/html-comment-content-newline': 2,

    /**
     * HTML 주석에서 `<!--` 뒤와 `-->` 앞에 공백 확인
     * @see {@link https://eslint.vuejs.org/rules/html-comment-content-spacing}
     */
    'vue/html-comment-content-spacing': 2,

    /**
     * `nextTick`에서 Promise(프라미스) 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/next-tick-style}
     */
    'vue/next-tick-style': 2,

    /**
     * 더 이상 사용되지 않는 `model` 정의 확인 (Vue 3 이상)
     * @see {@link https://eslint.vuejs.org/rules/no-deprecated-model-definition}
     */
    'vue/no-deprecated-model-definition': [
        2,
        {
            /** Vue 3 이상 `v-model` 구문과 일치하는 Props/이벤트 이름으로 `model` 정의 허용 여부 */
            allowVue3Compat: true,
        },
    ],

    /**
     * `v-bind="$attrs"`를 사용할 경우 `inheritAttrs`를 `false`로 설정 확인
     * @see {@link https://eslint.vuejs.org/rules/no-duplicate-attr-inheritance}
     */
    'vue/no-duplicate-attr-inheritance': 2,

    /**
     * `<template>` `<script>` `<style>` 블록이 비어 있는지 확인
     * @see {@link https://eslint.vuejs.org/rules/no-empty-component-block}
     */
    'vue/no-empty-component-block': 2,

    /**
     * 여러 객체를 클래스에 배열로 전달 확인
     * @see {@link https://eslint.vuejs.org/rules/no-multiple-objects-in-class}
     */
    'vue/no-multiple-objects-in-class': 2,

    /**
     * 컴포넌트 프로퍼티에서 잠재적인 오타 확인
     * @see {@link https://eslint.vuejs.org/rules/no-potential-component-option-typo}
     */
    'vue/no-potential-component-option-typo': [
        2,
        {
            /** 여러 공통 Vue 컴포넌트 옵션 프리셋 */
            presets: ['vue', 'vue-router'],
        },
    ],

    /**
     * 기본값이 있는 Props가 선택적 Props인지 확인
     * @see {@link https://eslint.vuejs.org/rules/no-required-prop-with-default}
     */
    'vue/no-required-prop-with-default': [
        2,
        {
            /** 자동 수정 여부 */
            autofix: true,
        },
    ],

    /**
     * `v-bind`에서 `'/^v-/'` 인수 확인
     * @see {@link https://eslint.vuejs.org/rules/no-restricted-v-bind}
     */
    'vue/no-restricted-v-bind': 2,

    /**
     * 정적 인라인 `style` 속성 확인
     * @see {@link https://eslint.vuejs.org/rules/no-static-inline-styles}
     */
    'vue/no-static-inline-styles': [
        2,
        {
            /** 정적 인라인 `style` 바인딩 허용 여부 */
            allowBinding: true,
        },
    ],

    /**
     * `beforeRouteEnter` 메서드에서 `this` 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/no-this-in-before-route-enter}
     */
    'vue/no-this-in-before-route-enter': 2,

    /**
     * `<template>`에서 할당되지 않은 컴포넌트의 사용 확인
     * - 전역적으로 등록된 컴포넌트도 확인함 (`ignorePatterns` 추가 필요)
     * @see {@link https://eslint.vuejs.org/rules/no-undef-components}
     */
    'vue/no-undef-components': [
        2,
        {
            /** 모든 확인을 무시할 컴포넌트 이름의 패턴 */
            ignorePatterns: ['router(\\-\\w+)+', 'v(\\-\\w+)+'],
        },
    ],

    /**
     * 할당되지 않은 프로퍼티 확인
     * @see {@link https://eslint.vuejs.org/rules/no-undef-properties}
     */
    'vue/no-undef-properties': 2,

    /**
     * 지정한 버전에서 지원되지 않는 Vue 구문 확인
     * @see {@link https://eslint.vuejs.org/rules/no-unsupported-features}
     */
    'vue/no-unsupported-features': [2, { version: require('../package.json').dependencies.vue }],

    /**
     * 사용하지 않는 프로퍼티 확인
     * @see {@link https://eslint.vuejs.org/rules/no-unused-properties}
     */
    'vue/no-unused-properties': [
        2,
        {
            /**
             * 프로퍼티를 검색할 그룹의 배열
             * - `'props'`
             * - `'data'`
             * - `'computed'`
             * - `'methods'`
             * - `'setup'`
             */
            groups: [
                // 'props',
                'data',
                'computed',
                'methods',
                'setup',
            ],

            /** `data`에 할당된 프로퍼티의 객체의 깊은 검색 여부 */
            deepData: true,
        },
    ],

    /**
     * 사용하지 않는 템플릿 참조 확인
     * @see {@link https://eslint.vuejs.org/rules/no-unused-refs}
     */
    'vue/no-unused-refs': 2,

    /**
     * `v-for`와 같은 요소에서 `v-else-if`/`v-else` 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/no-use-v-else-with-v-for}
     */
    'vue/no-use-v-else-with-v-for': 2,

    /**
     * 불필요한 이중 중괄호 보간법 확인
     * @see {@link https://eslint.vuejs.org/rules/no-useless-mustaches}
     */
    'vue/no-useless-mustaches': 2,

    /**
     * 불필요한 `v-bind` 디렉티브 확인
     * @see {@link https://eslint.vuejs.org/rules/no-useless-v-bind}
     */
    'vue/no-useless-v-bind': 2,

    /**
     * v-text 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/no-v-text}
     */
    'vue/no-v-text': 2,

    /**
     * 기본 내보내기 대신 `defineOptions` 사용 확인
     * @see {@link https://eslint.vuejs.org/rules/prefer-define-options}
     */
    'vue/prefer-define-options': 2,

    /**
     * `v-bind` 값이 `true`일 경우 단축 문법 속성 필요
     * @see {@link https://eslint.vuejs.org/rules/prefer-true-attribute-shorthand}
     */
    'vue/prefer-true-attribute-shorthand': 2,

    /**
     * 특정 매크로 변수 이름 필요
     * @see {@link https://eslint.vuejs.org/rules/require-macro-variable-name}
     */
    'vue/require-macro-variable-name': 2,

    /**
     * Vue 컴포넌트에서 이름 프로퍼티 필요
     * @see {@link https://eslint.vuejs.org/rules/require-name-property}
     */
    'vue/require-name-property': 2,

    /**
     * 객체 Props에 타입 선언 추가 확인
     * @see {@link https://eslint.vuejs.org/rules/require-typed-object-prop}
     */
    'vue/require-typed-object-prop': 2,

    /**
     * `<script>`에서 들여쓰기 확인
     * @see {@link https://eslint.vuejs.org/rules/script-indent}
     */
    'vue/script-indent': [
        2,
        4,
        {
            /** `case`/`default`문에 대한 들여쓰기 곱셈 */
            switchCase: 1,
        },
    ],

    /**
     * 유효한 `defineOptions` 컴파일러 매크로 확인
     * @see {@link https://eslint.vuejs.org/rules/valid-define-options}
     */
    'vue/valid-define-options': 2,

    /**
     * `<template>`에서 조건에 상수 표현식 확인
     * @see {@link https://eslint.vuejs.org/rules/no-constant-condition}
     */
    'vue/no-constant-condition': 2,

    /**
     * `<template>`에서 빈 구조 분해 패턴 확인
     * @see {@link https://eslint.vuejs.org/rules/no-empty-pattern}
     */
    'vue/no-empty-pattern': 2,

    /**
     * `<template>`에서 정밀도가 손실되는 리터럴 숫자 확인
     * @see {@link https://eslint.vuejs.org/rules/no-loss-of-precision}
     */
    'vue/no-loss-of-precision': 2,
};

/** JavaScript/TypeScript 규칙과 같은 Vue 규칙 동기화 (`<template>`에 적용됨) */
const syncRules = [
    'array-bracket-newline',
    'array-bracket-spacing',
    'array-element-newline',
    'arrow-spacing',
    'block-spacing',
    'brace-style',
    'camelcase',
    'comma-dangle',
    'comma-spacing',
    'comma-style',
    'dot-location',
    'dot-notation',
    'eqeqeq',
    'func-call-spacing',
    'key-spacing',
    'keyword-spacing',
    'max-len',
    'multiline-ternary',
    'no-console',
    'no-constant-condition',
    'no-empty-pattern',
    'no-extra-parens',
    'no-irregular-whitespace',
    'no-loss-of-precision',
    'no-restricted-syntax',
    'no-sparse-arrays',
    'no-useless-concat',
    'object-curly-newline',
    'object-curly-spacing',
    'object-property-newline',
    'object-shorthand',
    'operator-linebreak',
    'prefer-template',
    'quote-props',
    'space-in-parens',
    'space-infix-ops',
    'space-unary-ops',
    'template-curly-spacing',
];

module.exports = {
    ...vueRules,
    ...syncRules.reduce((result, rule) => {
        const rules = structuredClone(result);
        const syncRule = (jsRules[rule] ?? tsRules[`@typescript-eslint/${rule}`]);

        if (syncRule) {
            rules[`vue/${rule}`] = syncRule;
        }

        return rules;
    }, {}),
};
