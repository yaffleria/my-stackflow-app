# 5. 개발자 도구 (DevTools) 도입

## 목표

- 현재 Stackflow의 스택 상태, 액티비티 파라미터, 라우팅 정보를 시각적으로 확인한다.
- 복잡한 네비게이션 디버깅을 용이하게 한다.

## 구현 내용

1. **패키지 설치**:
   - `pnpm --filter web-app add @stackflow/plugin-devtools`
2. **플러그인 등록**:

   - `stackflow.ts` 파일의 `plugins` 배열에 `devtoolsPlugin()` 추가

3. **기능**:
   - **Chrome Extension 연동**: 이 플러그인은 Stackflow 상태를 외부로 노출하는 역할을 함.
   - **Stackflow Devtools 확장 프로그램**을 Chrome Web Store에서 설치해야 사용 가능.
   - 확장 프로그램에서 현재 스택, 액티비티 파라미터, 이벤트 로그 확인 가능.

## 배운 점

- **플러그인 시스템**: Stackflow 플러그인은 UI를 직접 그리기보다 상태를 관리/전파하는 역할이 클 수 있음.
- **Tools**: 전용 크롬 익스텐션을 통해 강력한 디버깅 환경 제공.
