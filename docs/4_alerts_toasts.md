# 4. 알림(Alert) 및 토스트(Toast) 구현

## 목표

- 하이브리드 앱에서 네이티브 느낌을 주는 상호작용(Interaction) 요소를 추가한다.
- 브라우저 기본 기능과 React 라이브러리를 적절히 혼합하여 사용한다.

## 구현 내용

1. **Native Alerts**:

   - `window.alert()`: 시스템 기본 경고창 호출 (WebView에서는 네이티브 다이얼로그로 뜸)
   - `window.confirm()`: 사용자 선택(확인/취소)을 받는 다이얼로그

2. **Toast Notifications**:
   - `react-hot-toast` 라이브러리 도입
   - `Toaster`를 `App.tsx` 최상위(`Stack` 형제 요소)에 배치하여 모든 화면 위에 뜨도록 설정
   - 성공/실패 등 상태에 따른 시각적 피드백 제공

## 배운 점

- **레이어 관리**: Toast 같은 오버레이 요소는 Stackflow(`Stack`) 바깥에 두어야 화면 전환과 무관하게 유지됨.
- **웹뷰의 특성**: 간단한 알림은 브라우저 API(`window.alert`)만으로도 훌륭한 네이티브 경험 제공 가능.
