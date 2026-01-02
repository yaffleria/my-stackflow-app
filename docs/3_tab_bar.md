# 3. 하단 탭바 (Bottom Tab Bar) 구현

## 목표

- Stackflow의 "전역 레이아웃 부재" 철학을 이해하고 직접 탭바를 구현한다.
- 탭 전환 시 스택이 계속 쌓이지 않도록 처리한다.

## 구현 내용

1. **BottomTabBar 컴포넌트**:

   - `position: fixed`로 하단에 고정
   - iPhone 등의 Safe Area (`env(safe-area-inset-bottom)`) 고려

2. **탭 전환 로직**:

   - `push()` 대신 `replace()` 사용
   - **이유**: 탭 이동은 "새로운 깊이"로 들어가는 것이 아니라 "화면 교체"이기 때문. 스택이 무한히 쌓이는 것을 방지.

3. **구조적 배치**:
   - `AppScreen` 내부, 컨텐츠 하단에 배치
   - 컨텐츠가 탭바에 가려지지 않도록 `padding-bottom` 추가

## 내부 동작 원리

### push() vs replace() 비교

**push()를 사용한 탭 전환 (잘못된 방식):**

```
Home → Profile → Home → Profile → ...
[Home] [Profile] [Home] [Profile]  ← 스택이 무한히 쌓임!
```

뒤로가기를 누르면 이전 탭으로 계속 돌아가는 이상한 UX.

**replace()를 사용한 탭 전환 (올바른 방식):**

```
Home → Profile → Home
[Home]  →  [Profile]  →  [Home]  ← 항상 스택 깊이 1
```

뒤로가기를 누르면 앱 종료/이전 페이지로 (네이티브 앱과 동일).

### DOM 상태 차이

**push() 사용 시:**

```html
<div class="activity" style="display:none">Home</div>
<div class="activity" style="display:none">Profile</div>
<div class="activity" style="display:block">Home (또 생성됨)</div>
```

**replace() 사용 시:**

```html
<div class="activity" style="display:block">Home</div>
<!-- 이전 화면은 완전히 제거됨 -->
```

### 왜 Stackflow는 탭바를 제공하지 않나?

Stackflow는 **"스택 네비게이션"**에만 집중합니다.
탭바는 앱마다 디자인이 너무 다르기 때문에, 레이아웃 영역은 개발자에게 맡깁니다.
이것이 **"headless"** 설계 철학입니다.

## 배운 점

- **Stackflow의 Scope**: Stackflow는 네비게이션 로직에 집중하며, 레이아웃은 전적으로 React 컴포넌트 영역임.
- **Replace vs Push**: 네이티브 앱스러운 UX를 위해 상황에 맞는 네비게이션 메소드 선택 중요.
