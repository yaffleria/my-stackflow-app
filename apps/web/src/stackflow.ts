import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { devtoolsPlugin } from "@stackflow/plugin-devtools";
import {
  preloadPlugin,
  useActivityPreloadRef,
} from "@stackflow/plugin-preload";
import { MainActivity } from "./activities/MainActivity";
import { DetailActivity } from "./activities/DetailActivity";
import { ProfileActivity } from "./activities/ProfileActivity";
import { MyBottomSheet } from "./activities/MyBottomSheet";
import { SignupStep1 } from "./activities/signup/Step1";
import { SignupStep2 } from "./activities/signup/Step2";
import { SignupComplete } from "./activities/signup/Complete";

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

// 가상의 API 호출 함수 (실제로는 fetch 등 사용)
const fetchArticleData = async (id: string): Promise<ArticleData> => {
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

// 캐시를 위한 간단한 헬퍼 함수
function createPreloadRef<T>(fetchFn: () => Promise<T>): PreloadRef<T> {
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

export { useActivityPreloadRef };

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    MainActivity,
    DetailActivity,
    MyBottomSheet,
    ProfileActivity,
    SignupStep1,
    SignupStep2,
    SignupComplete,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: "cupertino",
    }),
    historySyncPlugin({
      routes: {
        MainActivity: "/",
        DetailActivity: "/detail/:articleId",
        MyBottomSheet: "/sheet",
        ProfileActivity: "/profile",
        SignupStep1: "/signup/step1",
        SignupStep2: "/signup/step2",
        SignupComplete: "/signup/complete",
      },
      fallbackActivity: () => "MainActivity",
    }),
    preloadPlugin({
      loaders: {
        DetailActivity({
          activityParams,
        }: {
          activityParams: { articleId?: string };
        }) {
          const articleId = activityParams.articleId || "1";
          // PreloadRef를 반환 - 화면 전환 애니메이션 동안 데이터를 미리 가져옴
          return createPreloadRef(() => fetchArticleData(articleId));
        },
      },
    }),
    devtoolsPlugin(),
  ],
});
