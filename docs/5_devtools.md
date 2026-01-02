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

## 내부 동작 원리

### devtoolsPlugin의 역할

```
┌─────────────────────────────────────────────────────────┐
│  Web App                                                │
│  ┌──────────────────┐                                   │
│  │  devtoolsPlugin  │ ──── window.__STACKFLOW_DEVTOOLS__│
│  │                  │      (전역 변수로 상태 노출)        │
│  └──────────────────┘                                   │
└───────────────────────────────────────────────────────────┘
           │
           │ Chrome Extension이 읽어감
           ▼
┌─────────────────────────────────────────────────────────┐
│  Chrome DevTools Panel                                  │
│  - Stack Viewer: 현재 스택 구조 시각화                   │
│  - Event Logger: push, pop 등 이벤트 로그               │
│  - Action Dispatcher: 직접 push/pop 실행               │
└─────────────────────────────────────────────────────────┘
```

### 왜 화면에 아무것도 안 보이나?

`devtoolsPlugin`은 **UI를 그리지 않습니다.**
오직 Stackflow의 내부 상태를 `window` 객체에 노출하는 역할만 합니다.

```ts
// devtoolsPlugin 내부 동작 (개념)
window.__STACKFLOW_DEVTOOLS__ = {
  stack: [...],      // 현재 스택 상태
  eventLogs: [...],  // 발생한 이벤트들
  effectLogs: [...], // 실행된 효과들
};
```

Chrome Extension이 이 전역 변수를 읽어서 DevTools 패널에 표시합니다.

### 플러그인은 꼭 있어야 하나?

**Extension 없이도 콘솔에서 직접 확인 가능:**

```js
// 브라우저 콘솔에서 실행
console.log(window.__STACKFLOW_DEVTOOLS__);
```

## 배운 점

- **플러그인 시스템**: Stackflow 플러그인은 UI를 직접 그리기보다 상태를 관리/전파하는 역할이 클 수 있음.
- **Tools**: 전용 크롬 익스텐션을 통해 강력한 디버깅 환경 제공.
