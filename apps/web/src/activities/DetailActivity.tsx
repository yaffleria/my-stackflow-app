import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchArticleData, ArticleData } from "../mock/article";
import { Suspense } from "react";
import { ActivityComponentType } from "@stackflow/react";

// params 타입 정의
type DetailActivityParams = {
  articleId: string;
};

// 데이터를 표시하는 내부 컴포넌트
const ArticleContent = ({ articleId }: { articleId: string }) => {
  const { data } = useSuspenseQuery<ArticleData>({
    queryKey: ["article", articleId],
    queryFn: () => fetchArticleData(articleId),
  });

  return (
    <div>
      <h2>{data.title}</h2>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
        By {data.author} • {new Date(data.createdAt).toLocaleDateString()}
      </p>
      <p style={{ lineHeight: 1.6 }}>{data.content}</p>
    </div>
  );
};

// 로딩 중 표시할 스켈레톤 UI
const ArticleSkeleton = () => (
  <div>
    <div
      style={{
        height: "28px",
        width: "60%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        marginBottom: "16px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    />
    <div
      style={{
        height: "14px",
        width: "40%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
        marginBottom: "16px",
      }}
    />
    <div
      style={{
        height: "100px",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
      }}
    />
  </div>
);

export const DetailActivity: ActivityComponentType<DetailActivityParams> = ({
  params,
}) => {
  const { pop } = useFlow();
  const articleId = params.articleId || "1";

  return (
    <AppScreen appBar={{ title: "Article Detail" }}>
      <div style={{ padding: "16px" }}>
        <Suspense fallback={<ArticleSkeleton />}>
          <ArticleContent articleId={articleId} />
        </Suspense>

        <button
          onClick={() => pop()}
          style={{
            width: "100%",
            marginTop: "24px",
            padding: "14px",
            fontSize: "16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </AppScreen>
  );
};
