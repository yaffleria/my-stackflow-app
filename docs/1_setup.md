# 1. 초기 설정 및 Monorepo 구성

## 목표

- React Native (Expo)와 React (Stackflow)를 하나의 Monorepo 환경에서 관리한다.
- pnpm workspace를 사용하여 의존성과 스크립트를 효율적으로 관리한다.

## 구현 내용

1. **Monorepo 초기화**:

   - `pnpm init`으로 루트 `package.json` 생성
   - `pnpm-workspace.yaml` 설정 (`apps/*` 포함)

2. **Web App (`apps/web`)**:

   - Vite + React + TypeScript 템플릿 사용
   - Stackflow 기본 설정 (`basicRendererPlugin`, `basicUIPlugin`)
   - `historySyncPlugin`으로 브라우저 URL 동기화 적용

3. **Native App (`apps/native`)**:

   - Expo 기반 React Native 프로젝트 생성
   - `react-native-webview`를 사용하여 Web App을 렌더링
   - `apps/mobile` -> `apps/native`로 폴더명 변경하여 명확성 확보

4. **스크립트 통합**:
   - 루트 `package.json`에서 `pnpm web`, `pnpm native` 명령어로 각각의 앱을 손쉽게 실행하도록 설정

## 내부 동작 원리

### Stackflow란?

Stackflow는 **"화면을 스택(Stack)처럼 쌓는"** 네비게이션 프레임워크입니다.

```
[MainActivity]  ← 첫 번째 화면 (스택 바닥)
      ↓ push("DetailActivity")
[DetailActivity] ← 위에 쌓임
      ↓ push("SettingsActivity")
[SettingsActivity] ← 맨 위
```

### 일반 React Router와의 차이점

| 구분       | React Router             | Stackflow                      |
| ---------- | ------------------------ | ------------------------------ |
| 화면 전환  | 이전 화면 언마운트(제거) | 이전 화면 유지(숨김)           |
| 뒤로가기   | 새로 렌더링              | 숨겨진 화면 다시 표시          |
| 상태 유지  | Context/전역 상태 필요   | 자동 유지 (DOM에 살아있음)     |
| 애니메이션 | 별도 구현 필요           | 기본 제공 (iOS/Android 스타일) |

### 왜 하이브리드 앱에 적합한가?

- WebView에서 네이티브 앱과 동일한 "뒤로가기" 경험 제공
- URL 동기화로 딥링크 지원
- 전환 애니메이션이 기본 포함

## 배운 점

- TypeScript 설정 충돌 해결: `skipLibCheck: true` 옵션으로 Web과 Native 간의 타입 정의 충돌 방지
- Monorepo 구조의 장점: 공통 패키지 관리 용이성 및 개발 경험 통일
