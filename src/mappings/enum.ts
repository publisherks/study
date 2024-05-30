/** 경로명 */
export enum RouterName {
    // FIXME: 경로 정의에 맞춰서 수정 필요
    Login = '로그인',
    ResetPassword = '비밀번호 재설정',
    Login2 = '로그인 2',
    ResetPassword2 = '비밀번호 재설정 2',
    Main = '메인',
    Profile = '프로필',
    Dashboard = '대시보드',
    WidgetDashboard = '위젯 대시보드',
    CustomDashboard = '커스텀 대시보드',
    Standard = '기준 정보',
    UserList = '계정 관리',
    SetUser = '계정 설정',
    Guide = '가이드',
    StyleGuide = '스타일 가이드',
    ComponentGuide = '컴포넌트 가이드',
    NotFound = '존재하지 않는 경로 안내',
}

/** API 공통 응답 코드 */
export enum Response {
    // FIXME: API 정의에 맞춰서 수정 필요
    Ok = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    UnprocessableEntity = 422,
    InternalServerError = 500,
}

/** 헤더명 */
export enum HeaderName {
    // FIXME: API 정의에 맞춰서 수정 필요
    /** 인증 토큰 */
    AccessToken = 'Access-Token',

    /** 재발행용 토큰 */
    RefreshToken = 'Refresh-Token',
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
    Main2 = 'main2',
    Sub1 = 'sub1',
    Sub2 = 'sub2',
    Cancel = 'cancel',
    Delete = 'delete',
}

/** 라벨 위치 */
export enum LabelLoc {
    Top = 'top',
    Left = 'left',
}

/** 공통 코드 */
export enum Code {
    // FIXME: 공통 코드 정의에 맞춰서 수정 필요
    /** 부서명 */
    Partname = 'PTN',

    /** 직급 */
    Position = 'POS',
}

/**
 * 계정 권한
 */
export enum UserAuthority {
    // FIXME: 계정 권한 정의에 맞춰서 수정 필요
    System = 'SYSTEM',
    Master = 'MASTER',
    Admin = 'ADMIN',
    Manager = 'MANAGER',
    User = 'USER',
}
