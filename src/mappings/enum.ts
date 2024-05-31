/** 경로명 */
export enum RouterName {
    // FIXME: 경로 정의에 맞춰서 수정 필요
    Login = '로그인',
    ResetPassword = '비밀번호 재설정',
    Join = '회원 가입',
    Login2 = '로그인 2',
    ResetPassword2 = '비밀번호 재설정 2',
    Main = '메인',
    Mypage = '마이페이지',
    Inquiry = '문의 현황',
    SalesStatus = '영업 현황',
    SalesRegist = '신규 영업 등록',
    SalesDetails = '영업 현황 상세',
    SalesModify = '영업 정보 수정',
    CustomerStatus = '고객 현황',
    UserList = '회원 관리',
    AgencyList = '대리점 관리',
    // Standard = '기준 정보',
    // UserList = '계정 관리',
    // SetUser = '계정 설정',
    Guide = '가이드',
    StyleGuide = '스타일 가이드',
    ComponentGuide = '컴포넌트 가이드',
    ContactUs = '문의하기',
    NotFound = '존재하지 않는 경로 안내',
}

/** API 공통 응답 코드 */
export enum Response {
    // FIXME: API 정의에 맞춰서 수정 필요
    Success = 200,
    InvalidToken = 999,
    Error = 500,
}

/** 헤더명 */
export enum HeaderName {
    /** 토큰 */
    Token = 'X-AUTH-TOKEN', // FIXME: API 정의에 맞춰서 수정 필요
}

/** Storage(Local Storage, Session Storage, 쿠키) 키 */
export enum StorageKey {
    /** 로그인 계정 정보 */
    LoginUser = 'loginUser',

    /** 저장된 아이디 */
    SaveUserId = 'saveUserId',
}

/** 버튼 구분 */
export enum ButtonType {
    Main = 'main',
    Sub = 'sub',
    Cancel = 'cancel',
    Delete = 'delete',
}

/** 라벨 위치 */
export enum LabelLoc {
    Top = 'top',
    Left = 'left',
}
