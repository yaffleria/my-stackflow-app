# 7. Preloading (프리로딩) 구현

## 목표

- 화면 전환 애니메이션이 실행되는 동안 데이터를 미리 가져온다.
- 화면이 뜨자마자 로딩 없이 데이터가 표시되도록 한다.

## 구현 내용

1. **패키지 설치**:

   - `pnpm --filter web-app add @stackflow/plugin-preload`

2. **preloadPlugin 설정**:

   - `stackflow.ts`에서 각 Activity별 `loader` 함수 정의
   - loader는 `activityParams`를 받아 데이터를 미리 가져옴

3. **컴포넌트에서 데이터 사용**:
   - `useActivityPreloadRef` 훅으로 preload된 데이터 참조 획득
   - React `Suspense`와 함께 사용하여 로딩 UI 처리

## 내부 동작 원리

### Preloading 타임라인

```
사용자가 "Go to Detail" 버튼 클릭
│
├─ push("DetailActivity", { articleId: "42" })
│
├─ [동시에 시작]
│   ├─ 화면 전환 애니메이션 (350ms)
│   └─ loader 실행: fetchArticleData("42")
│
└─ 애니메이션 완료 시점
    ├─ 데이터 이미 도착 → 바로 표시
    └─ 데이터 아직 로딩 중 → Suspense fallback 표시
```

### 일반적인 방식 vs Preloading

**일반적인 방식 (useEffect):**

```
버튼 클릭 → 애니메이션 시작 → 애니메이션 끝 → useEffect 실행 → fetch → 로딩 → 데이터 표시
[    350ms    ] [   wait   ] [  500ms  ] = 총 850ms+
```

**Preloading 방식:**

```
버튼 클릭 → 애니메이션 시작 + fetch 동시 → 애니메이션 끝 → 데이터 이미 있음!
[    350ms + fetch 500ms 병렬    ] = 총 500ms (체감 350ms)
```

### PreloadRef 패턴 (Suspense 연동)

```tsx
// loader에서 반환
function createPreloadRef<T>(fetchFn: () => Promise<T>): PreloadRef<T> {
  let data: T | null = null;
  let promise: Promise<T> | null = null;

  return {
    read: () => {
      if (data) return data; // 데이터 있으면 반환
      if (!promise) promise = fetchFn(); // 없으면 fetch 시작
      throw promise; // Suspense가 잡아서 대기
    },
  };
}

// 컴포넌트에서 사용
const ArticleContent = () => {
  const preloadRef = useActivityPreloadRef<PreloadRef<ArticleData>>();
  const data = preloadRef.read(); // Suspense 경계에서 사용
  return <div>{data.title}</div>;
};
```

### 왜 throw promise인가?

React Suspense의 동작 방식:

1. 컴포넌트가 Promise를 throw하면 Suspense가 이를 잡음
2. fallback UI 표시
3. Promise가 resolve되면 컴포넌트 다시 렌더링
4. 이번엔 데이터가 있으므로 정상 반환

## 핵심 코드

### stackflow.ts

```tsx
preloadPlugin({
  loaders: {
    DetailActivity({ activityParams }) {
      const articleId = activityParams.articleId || "1";
      return createPreloadRef(() => fetchArticleData(articleId));
    },
  },
}),
```

### DetailActivity.tsx

```tsx
export const DetailActivity = () => {
  return (
    <AppScreen appBar={{ title: "Article Detail" }}>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent />
      </Suspense>
    </AppScreen>
  );
};

const ArticleContent = () => {
  const preloadRef = useActivityPreloadRef<PreloadRef<ArticleData>>();
  const data = preloadRef.read();
  return <h2>{data.title}</h2>;
};
```

## 배운 점

- **병렬 처리**: 애니메이션과 데이터 fetching을 동시에 실행하여 체감 로딩 시간 단축.
- **Suspense 패턴**: `throw promise` 패턴으로 React Suspense와 자연스럽게 연동.
- **loader 함수**: 각 Activity별로 필요한 데이터를 정의할 수 있어 관심사 분리.
- **스켈레톤 UI**: 데이터 로딩 중에도 레이아웃이 유지되어 CLS(Cumulative Layout Shift) 방지.
