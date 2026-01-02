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

3. **유효성 검사**:

   - `zod` + `react-hook-form` 조합 사용
   - 스키마 정의 → 폼 연결 → 에러 표시 구조

4. **완료 후 처리**:
   - `pop(3)`으로 스택의 모든 화면(Complete, Step2, Step1) 제거
   - fallbackActivity로 MainActivity 표시

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

### push()와 pop()의 마운트/언마운트 동작

| 동작                            | Step1             | Step2           | 결과                         |
| ------------------------------- | ----------------- | --------------- | ---------------------------- |
| Step1 → **push** → Step2        | DOM에 유지 (숨김) | 새로 마운트     | Step2가 스택 위에 쌓임       |
| Step2 → **pop** → Step1         | DOM에 유지 (보임) | **언마운트**    | Step2가 DOM에서 제거됨       |
| Step1 → **push** → Step2 (다시) | DOM에 유지        | **새로 마운트** | 새 인스턴스, useState 초기화 |

### 상태 유지 여부 정리

| 시나리오                | Step1 이메일       | Step2 비밀번호        |
| ----------------------- | ------------------ | --------------------- |
| Step1 → Step2 진입      | 유지 (숨겨진 상태) | 빈 값 (새 마운트)     |
| Step2 → Step1 뒤로가기  | **유지됨**         | 언마운트로 사라짐     |
| Step1 → Step2 다시 진입 | 유지됨             | **빈 값** (새 마운트) |

**결론**:

- **뒤로 가면** → 현재 화면 pop (언마운트) → 상태 초기화
- **앞에 있던 화면** → 그대로 유지 → 상태 유지

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
  │  pop(3)  ← 스택에서 3개 화면 모두 제거
  ▼
MainActivity (fallbackActivity)
```

### 왜 Zustand 같은 상태관리가 필요 없는가?

1. **다음 단계로 갈 때**: `push()`의 두 번째 인자로 데이터 전달
2. **이전 단계로 갈 때**: 컴포넌트가 죽지 않았으므로 `useState`가 그대로

**상태관리가 필요한 경우:**

- 완전히 다른 플로우에서 같은 데이터 접근 필요할 때
- 복잡한 전역 상태가 필요할 때
- 이 경우 Zustand, Jotai 등 사용 (Stackflow와 무관)

## 디버깅 기록

### 문제 1: Complete에서 홈으로 이동 후 뒤로가기 버튼 표시

**증상**: Complete에서 `replace("MainActivity")`로 홈 이동 후, MainActivity에 뒤로가기 버튼이 생기고 누르면 Step2로 이동함.

**원인**: `replace()`는 현재 화면만 교체하고, 스택 아래의 화면(Step1, Step2)은 그대로 남아있음.

```
Before replace:
[MainActivity] → [Step1] → [Step2] → [Complete]

After replace("MainActivity"):
[MainActivity] → [Step1] → [Step2] → [MainActivity(새)]  ← 스택 깊이 4
```

**해결**: `pop(3)` 사용하여 스택에서 Complete, Step2, Step1 모두 제거.

```tsx
// Complete.tsx
const handleGoHome = () => {
  pop(3); // 3개 화면 제거 → fallbackActivity로 MainActivity 표시
};
```

### 문제 2: Complete에서 스와이프로 뒤로가기 가능

**해결**: `AppScreen`에 `preventSwipeBack` prop 추가 + 뒤로가기 버튼 숨김

```tsx
<AppScreen
  appBar={{
    title: "회원가입 완료",
    backButton: { render: () => null },  // 버튼 숨김
  }}
  preventSwipeBack  // 스와이프 제스처 방지
>
```

## 핵심 코드

```tsx
// Step1에서 Step2로 이동
push("SignupStep2", { email });

// Step2에서 Complete로 이동
push("SignupComplete", { email: params.email, password });

// Complete에서 홈으로 (스택 전체 제거)
pop(3);
```

## 유효성 검사 (zod + react-hook-form)

```tsx
// 스키마 정의
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

// 폼 연결
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(emailSchema),
});

// 에러 표시
{
  errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>;
}
```

## 배운 점

- **스택 유지**: `push`로 화면을 쌓으면 이전 화면의 상태(`useState`)가 그대로 유지됨.
- **pop은 언마운트**: 뒤로가기(pop)된 화면은 DOM에서 제거되어 상태가 초기화됨.
- **replace의 한계**: `replace()`는 현재 화면만 교체하며, 스택 아래는 유지됨.
- **pop(n)**: 여러 화면을 한 번에 제거할 때 유용.
- **preventSwipeBack**: iOS 스와이프 뒤로가기 방지에 필수.
