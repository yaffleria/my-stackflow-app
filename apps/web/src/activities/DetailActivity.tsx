import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow, useActivityPreloadRef } from "../stackflow";
import { PreloadRef, ArticleData } from "../preload";
import { Suspense } from "react";

// 데이터를 표시하는 내부 컴포넌트
const ArticleContent = () => {
  const preloadRef = useActivityPreloadRef<PreloadRef<ArticleData>>();
  const data = preloadRef.read();

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

export const DetailActivity = () => {
  const { pop } = useFlow();

  return (
    <AppScreen appBar={{ title: "Article Detail" }}>
      <div style={{ padding: "16px" }}>
        <Suspense fallback={<ArticleSkeleton />}>
          <ArticleContent />
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
