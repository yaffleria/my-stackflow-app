// DetailActivity에서 사용할 데이터 타입
export interface ArticleData {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// PreloadRef 타입 정의
export interface PreloadRef<T> {
  read: () => T;
}

// 캐시를 위한 간단한 헬퍼 함수
export function createPreloadRef<T>(fetchFn: () => Promise<T>): PreloadRef<T> {
  let data: T | null = null;
  let promise: Promise<T> | null = null;
  let error: Error | null = null;

  return {
    read: () => {
      if (error) throw error;
      if (data) return data;
      if (!promise) {
        promise = fetchFn()
          .then((result) => {
            data = result;
            return result;
          })
          .catch((err) => {
            error = err;
            throw err;
          });
      }
      throw promise; // Suspense를 위해 Promise throw
    },
  };
}

// 가상의 API 호출 함수 (실제로는 fetch 등 사용)
export const fetchArticleData = async (id: string): Promise<ArticleData> => {
  // 네트워크 지연 시뮬레이션 (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    title: `Article #${id}`,
    content: `This is the content of article ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    author: "John Doe",
    createdAt: new Date().toISOString(),
  };
};
