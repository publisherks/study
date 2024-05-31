# vue-standard

## Branch

- `main` : 메인 (운영 서버)
- `release` : 개발(테스트) 서버
- `develop` : 기능 개발 완료
- `feature/기능명` : 기능 개발
- `hotfix/핫픽스명` : 버그 수정 (긴급)

## Commit Message Prefix

- `[add]` : 컴포넌트/기능 추가 시
- `[modify]` : 컴포넌트/기능 수정 시
- `[delete]` : 컴포넌트/기능 삭제 시
- `[fix]` : 버그 수정 시
- `[hotfix]` : 긴급 버그 수정 시

## Stack

- [Vue 3](https://ko.vuejs.org)
- [Vue Router](https://router.vuejs.kr)
- [Pinia](https://pinia.vuejs.kr) : Store (전역 상태 관리)
- [TypeScript](https://www.typescriptlang.org/ko)
- [Vite](https://ko.vitejs.dev)
- [ESLint](https://eslint.org)
- [SCSS](https://sass-lang.com/dart-sass)
- [Axios](https://axios-http.com/kr) : API 통신
- [Sentry](https://ulalalab.sentry.io/projects/vue-standard) : 오류 모니터링

## NPM Script

#### 종속성 설치

```sh
# NPM
npm install

# Bun
bun install
```

#### 로컬 개발`(Vite Server)` 실행

```sh
# NPM
npm run dev

# Bun
bun run dev
```

#### 운영 서버 배포를 위한 컴파일/압축 + 타입 확인

```sh
# NPM
npm run build

# Bun (컴파일/압축과 타입 확인을 따로 실행해야 됨)
bun run type-check
bun run build-only
```

#### 개발 서버 배포를 위한 컴파일/압축 + 타입 확인

```sh
# NPM
npm run build:dev

# Bun (컴파일/압축과 타입 확인을 따로 실행해야 됨)
bun run type-check
bun run build-only:dev
```

#### 운영 서버 배포를 위한 컴파일/압축

```sh
# NPM
npm run build-only

# Bun
bun run build-only
```

#### 개발 서버 배포를 위한 컴파일/압축

```sh
# NPM
npm run build-only:dev

# Bun
bun run build-only:dev
```

#### 운영 서버 배포 버전 미리 보기

```sh
# NPM
npm run preview

# Bun
bun run preview
```

#### 개발 서버 배포 버전 미리 보기

```sh
# NPM
npm run preview:dev

# Bun
bun run preview:dev
```

#### 타입 확인

```sh
# NPM
npm run type-check

# Bun
bun run type-check
```

#### `ESLint` 실행

```sh
# NPM
npm run lint

# Bun
bun run lint
```
