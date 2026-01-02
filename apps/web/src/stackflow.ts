import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { MainActivity } from "./activities/MainActivity";
import { DetailActivity } from "./activities/DetailActivity";
import { MyBottomSheet } from "./activities/MyBottomSheet";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    MainActivity,
    DetailActivity,
    MyBottomSheet,
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
      },
      fallbackActivity: () => "MainActivity",
    }),
  ],
});
