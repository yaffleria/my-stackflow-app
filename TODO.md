# Stackflow 추가 학습 TODO

오늘 구현한 내용:

- ✅ 초기 설정 및 Monorepo
- ✅ 바텀 시트
- ✅ 하단 탭바
- ✅ 알림/토스트
- ✅ DevTools
- ✅ Funnel 패턴 (회원가입 플로우)
- ✅ Preloading (TanStack Query 연동)

---

## 추가로 학습할 만한 기능

### 1. 커스텀 플러그인 작성

- 직접 플러그인을 만들어 Stackflow 동작에 개입
- 예: 화면 진입 시 Analytics 이벤트 자동 전송
- 예: 특정 조건에서 네비게이션 막기 (인증 가드)

### 2. 웹뷰 브릿지 (Native ↔ Web 통신)

- postMessage로 네이티브와 데이터 주고받기
- 예: 네이티브 카메라 호출 후 이미지 받기
- 예: 네이티브 푸시 알림 토큰 전달

### 3. 딥링크 (Deep Linking)

- 외부 URL로 앱 특정 화면 직접 열기
- `historySyncPlugin`의 routes 활용
- 예: `myapp://detail/42` → DetailActivity

### 4. 인증 흐름 (Auth Guard)

- 로그인 필요한 화면 접근 시 로그인 화면으로 리다이렉트
- 커스텀 플러그인 또는 Activity 내 로직으로 구현

### 5. 모달 스택 관리

- 여러 모달이 중첩될 때의 스택 관리
- 바텀시트 위에 또 다른 바텀시트 열기

### 6. 화면 전환 애니메이션 커스터마이징

- 기본 cupertino 외 다른 테마 적용
- 커스텀 전환 애니메이션 구현

### 7. 스크롤 위치 복원

- 리스트 스크롤 후 상세 → 뒤로가기 시 스크롤 위치 유지
- Stackflow가 기본 지원하지만 테스트 필요

### 8. SSR/SSG 지원 (Next.js 연동)

- Next.js에서 Stackflow 사용하기
- 초기 화면 서버 렌더링

### 9. 테스트 작성

- Activity 단위 테스트
- 네비게이션 플로우 통합 테스트

### 10. 성능 최적화

- 무거운 화면의 lazy loading
- 메모리 누수 방지 (스택에 쌓인 화면 정리)

---

## 참고 자료

- Stackflow 공식 문서: https://stackflow.so
- GitHub: https://github.com/daangn/stackflow
- 당근마켓 기술 블로그 (Stackflow 소개 글)
