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

## 배운 점

- TypeScript 설정 충돌 해결: `skipLibCheck: true` 옵션으로 Web과 Native 간의 타입 정의 충돌 방지
- Monorepo 구조의 장점: 공통 패키지 관리 용이성 및 개발 경험 통일
