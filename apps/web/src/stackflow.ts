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
import { createPreloadRef, fetchArticleData } from "./preload";

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
          return createPreloadRef(() => fetchArticleData(articleId));
        },
      },
    }),
    devtoolsPlugin(),
  ],
});
