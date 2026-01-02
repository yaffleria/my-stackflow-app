# 6. Funnel (퍼널) 패턴 구현

## 목표

- 회원가입처럼 **여러 단계(Step)**로 이루어진 흐름을 Stackflow로 자연스럽게 구현한다.
- 뒤로 가기 시 이전 단계의 입력 상태가 유지되도록 한다.

## 구현 내용

1. **Activity 분리**:

   - `SignupStep1.tsx`: 이메일 입력
   - `SignupStep2.tsx`: 비밀번호 입력 (params로 email 수신)
   - `SignupComplete.tsx`: 완료 화면 (params로 email, password 수신)

2. **데이터 전달 방식**: Params 전달

   - `push("SignupStep2", { email })` 형태로 다음 단계에 데이터 전달
   - Activity 컴포넌트에서 `{ params }` props로 수신

3. **완료 후 처리**:
   - `replace("MainActivity", {})`로 스택을 교체하여 뒤로 가기 시 가입 플로우로 돌아가지 않도록 처리

## 핵심 코드

```tsx
// Step1에서 Step2로 이동
push("SignupStep2", { email });

// Step2에서 Complete로 이동
push("SignupComplete", { email: params.email, password });

// Complete에서 홈으로 (스택 교체)
replace("MainActivity", {});
```

## 배운 점

- **스택 유지**: `push`로 화면을 쌓으면 이전 화면의 상태(`useState`)가 그대로 유지됨.
- **Params vs 상태관리 라이브러리**: WebView 앱 환경에서는 URL 노출 걱정이 없어 Params 방식이 간편함.
- **replace의 활용**: 완료 후 스택을 완전히 교체하여 사용자 경험 개선.
