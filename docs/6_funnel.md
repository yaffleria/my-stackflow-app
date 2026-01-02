# 6. Funnel (퍼널) 패턴 구현

## 목표

- 회원가입처럼 **여러 단계(Step)**로 이루어진 흐름을 Stackflow로 자연스럽게 구현한다.
- 뒤로 가기 시 이전 단계의 입력 상태가 유지되도록 한다.

## 구현 내용

1. **Activity 분리**:

   - `signup/Step1.tsx`: 이메일 입력
   - `signup/Step2.tsx`: 비밀번호 입력 (params로 email 수신)
   - `signup/Complete.tsx`: 완료 화면 (params로 email, password 수신)

2. **데이터 전달 방식**: Params 전달

   - `push("SignupStep2", { email })` 형태로 다음 단계에 데이터 전달
   - Activity 컴포넌트에서 `{ params }` props로 수신

3. **완료 후 처리**:
   - `replace("MainActivity", {})`로 스택을 교체하여 뒤로 가기 시 가입 플로우로 돌아가지 않도록 처리

## 내부 동작 원리

### 핵심 개념: 스택에 쌓인 화면은 DOM에 살아있다

**Step2에 있을 때의 실제 DOM 구조:**

```html
<div id="stackflow">
  <div class="activity" style="transform: translateX(-30%)">
    <!-- Step1 - 숨겨져 있지만 컴포넌트는 살아있음! -->
    <input value="user@email.com" />
    <!-- useState 값 그대로 유지 -->
  </div>
  <div class="activity" style="transform: translateX(0)">
    <!-- Step2 - 현재 보이는 화면 -->
    <input type="password" />
  </div>
</div>
```

### 뒤로 가기 시 상태가 유지되는 이유

| 일반 라우터                          | Stackflow                            |
| ------------------------------------ | ------------------------------------ |
| 뒤로가기 → 이전 컴포넌트 새로 마운트 | 뒤로가기 → 숨겨진 컴포넌트 다시 표시 |
| `useState` 초기화됨                  | `useState` 값 그대로                 |
| 전역 상태관리 필요                   | 추가 라이브러리 불필요               |

### 데이터 흐름 다이어그램

```
Step1 (email 입력)
  │
  │  const [email, setEmail] = useState("");
  │  push("SignupStep2", { email })  ──────────────────┐
  │                                                     │
  ▼                                                     ▼
Step2 (password 입력)                            params.email 수신
  │
  │  const [password, setPassword] = useState("");
  │  push("SignupComplete", { email: params.email, password })
  │
  ▼
Complete (완료)
  │
  │  replace("MainActivity", {})  ← 스택 전체 교체 (뒤로가기 방지)
  ▼
MainActivity
```

### 왜 Zustand 같은 상태관리가 필요 없는가?

1. **다음 단계로 갈 때**: `push()`의 두 번째 인자로 데이터 전달
2. **이전 단계로 갈 때**: 컴포넌트가 죽지 않았으므로 `useState`가 그대로

**상태관리가 필요한 경우:**

- 완전히 다른 플로우에서 같은 데이터 접근 필요할 때
- 복잡한 전역 상태가 필요할 때
- 이 경우 Zustand, Jotai 등 사용 (Stackflow와 무관)

### replace() vs pop()

**Complete에서 홈으로 갈 때:**

```tsx
// ❌ pop() 사용 시
pop(); // Step2로 돌아감
pop(); // Step1으로 돌아감
pop(); // 그제야 MainActivity...

// ✅ replace() 사용 시
replace("MainActivity", {}); // 스택 전체를 MainActivity로 교체
```

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
