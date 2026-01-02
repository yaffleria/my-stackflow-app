# 2. 바텀 시트 (Bottom Sheet) 구현

## 목표

- Stackflow의 강력한 특징인 "모든 것을 Activity로 취급" 개념을 이해하고 적용한다.
- 일반적인 Modal 방식이 아닌, 라우팅 가능한 Bottom Sheet를 구현한다.

## 구현 내용

1. **Activity 생성**:

   - `@stackflow/plugin-basic-ui`의 `BottomSheet` 컴포넌트를 사용한 `MyBottomSheet.tsx` 생성

2. **Stackflow 등록**:

   - `stackflow.ts`에 `MyBottomSheet` Activity 등록
   - URL 경로 `/sheet`에 매핑 (Direct Access 가능)

3. **호출 방식**:
   - `useFlow().push("MyBottomSheet", { title: ... })` 형태로 호출
   - 네이티브 앱처럼 뒤로 가기(Back) 버튼으로 닫기 가능

## 내부 동작 원리

### 일반 모달 vs Stackflow 바텀시트

**일반 React 모달 방식:**

```tsx
const [isOpen, setIsOpen] = useState(false);
// 문제: 뒤로가기 누르면 모달이 아닌 "페이지"가 뒤로 감
```

**Stackflow 방식:**

```tsx
push("MyBottomSheet", { title: "..." });
// 장점: 뒤로가기 = 바텀시트만 닫힘 (pop)
```

### DOM 구조 (바텀시트가 열린 상태)

```html
<div id="stackflow">
  <div class="activity">MainActivity (보임, 반투명 배경 뒤)</div>
  <div class="activity overlay">MyBottomSheet (위에 떠있음)</div>
</div>
```

### 스택 상태

```
[MainActivity]     ← 스택 바닥, 숨겨지지 않고 뒤에 보임
[MyBottomSheet]    ← 스택 맨 위, 오버레이로 표시
```

뒤로가기(pop) 시:

- `MyBottomSheet`만 스택에서 제거
- `MainActivity`가 다시 온전히 보임
- **MainActivity의 상태는 그대로 유지됨**

## 배운 점

- **Activity로서의 모달**: 바텀 시트도 스택에 쌓이는 하나의 화면으로 관리됨.
- **URL 동기화**: 모달이 열린 상태가 URL에 반영되어 공유 가능 (Deep Linking 용이).
- **타입 안정성**: `plugin-basic-ui`의 컴포넌트(`AppScreen`, `BottomSheet`) 활용법.
