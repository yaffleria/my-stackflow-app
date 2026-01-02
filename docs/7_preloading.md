# 7. Preloading (프리로딩) 구현

## 목표

- 화면 전환과 동시에 데이터를 비동기로 가져온다.
- 화면 도착 시 데이터가 준비되어 있으면 바로 표시, 아니면 스켈레톤 UI 표시.

## 구현 내용

1. **TanStack Query 설치**:

   - `pnpm --filter web-app add @tanstack/react-query`

2. **QueryClientProvider 설정**:

   - `App.tsx`에서 전역으로 `QueryClientProvider` 감싸기

3. **useSuspenseQuery 사용**:
   - `DetailActivity`에서 `useSuspenseQuery` 훅으로 데이터 fetching
   - React `Suspense`와 함께 사용하여 로딩 UI 처리

## 내부 동작 원리

### Preloading 타임라인

```
사용자가 "Go to Detail" 버튼 클릭
│
├─ push("DetailActivity", { articleId: "42" })
│
├─ 화면 전환 애니메이션 시작 (350ms)
│
└─ 애니메이션 완료 → 컴포넌트 렌더링 시작
    │
    ├─ useSuspenseQuery 실행 → fetch 시작
    ├─ Suspense가 Promise 감지 → 스켈레톤 표시
    │
    └─ fetch 완료 → 실제 데이터 표시
```

### 일반 useEffect vs useSuspenseQuery

**useEffect 방식:**

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchData()
    .then(setData)
    .finally(() => setLoading(false));
}, []);

if (loading) return <Skeleton />;
return <Content data={data} />;
```

**useSuspenseQuery 방식 (권장):**

```tsx
// 부모에서 Suspense로 감싸기
<Suspense fallback={<Skeleton />}>
  <Content articleId={id} />
</Suspense>;

// 자식 컴포넌트
const Content = ({ articleId }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticle(articleId),
  });
  return <div>{data.title}</div>; // 데이터 보장됨
};
```

### TanStack Query의 장점

| 기능                | 설명                                      |
| ------------------- | ----------------------------------------- |
| **캐싱**            | 동일한 queryKey는 재요청 없이 캐시 사용   |
| **staleTime**       | 설정 시간 동안 fresh 상태로 유지          |
| **자동 재시도**     | 실패 시 자동으로 재시도                   |
| **백그라운드 갱신** | 오래된 데이터는 백그라운드에서 갱신       |
| **Suspense 지원**   | `useSuspenseQuery`로 자연스러운 로딩 처리 |

### 파일 구조

```
src/
├── App.tsx              ← QueryClientProvider 설정
├── stackflow.ts         ← 핵심 네비게이션 설정 (깔끔하게 유지)
├── mock/
│   └── article.ts       ← Mock 데이터 & fetch 함수
└── activities/
    └── DetailActivity.tsx  ← useSuspenseQuery 사용
```

## 핵심 코드

### App.tsx

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분간 fresh 상태
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Stack />
  </QueryClientProvider>
);
```

### DetailActivity.tsx

```tsx
import { useSuspenseQuery } from "@tanstack/react-query";

const ArticleContent = ({ articleId }: { articleId: string }) => {
  const { data } = useSuspenseQuery<ArticleData>({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleData(articleId),
  });

  return <h2>{data.title}</h2>;
};

export const DetailActivity = ({ params }) => (
  <AppScreen appBar={{ title: "Article Detail" }}>
    <Suspense fallback={<ArticleSkeleton />}>
      <ArticleContent articleId={params.articleId} />
    </Suspense>
  </AppScreen>
);
```

## 배운 점

- **TanStack Query + Suspense**: 로딩 상태를 선언적으로 처리할 수 있음.
- **useSuspenseQuery**: 데이터가 반드시 존재함을 보장 (타입 안전).
- **캐싱**: 동일한 글을 다시 열면 즉시 표시 (네트워크 요청 없음).
- **관심사 분리**: Mock 데이터는 `mock/` 폴더, UI는 `activities/` 폴더.
