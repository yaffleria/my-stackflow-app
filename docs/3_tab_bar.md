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

## 배운 점

- **Stackflow의 Scope**: Stackflow는 네비게이션 로직에 집중하며, 레이아웃은 전적으로 React 컴포넌트 영역임.
- **Replace vs Push**: 네이티브 앱스러운 UX를 위해 상황에 맞는 네비게이션 메소드 선택 중요.
