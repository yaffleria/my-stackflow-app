// Mock 데이터 타입
export interface ArticleData {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// 가상의 API 호출 함수 (실제로는 fetch 등 사용)
export const fetchArticleData = async (id: string): Promise<ArticleData> => {
  // 네트워크 지연 시뮬레이션 (500ms)
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id,
    title: `Article #${id}`,
    content: `This is the content of article ${id}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    author: "John Doe",
    createdAt: new Date().toISOString(),
  };
};
