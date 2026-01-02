import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { devtoolsPlugin } from "@stackflow/plugin-devtools";
import { MainActivity } from "./activities/MainActivity";
import { DetailActivity } from "./activities/DetailActivity";
import { ProfileActivity } from "./activities/ProfileActivity";
import { MyBottomSheet } from "./activities/MyBottomSheet";
import { SignupStep1 } from "./activities/SignupStep1";
import { SignupStep2 } from "./activities/SignupStep2";
import { SignupComplete } from "./activities/SignupComplete";

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
        DetailActivity: "/detail",
        MyBottomSheet: "/sheet",
        ProfileActivity: "/profile",
        SignupStep1: "/signup/step1",
        SignupStep2: "/signup/step2",
        SignupComplete: "/signup/complete",
      },
      fallbackActivity: () => "MainActivity",
    }),
    devtoolsPlugin(),
  ],
});
