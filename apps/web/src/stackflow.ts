import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { basicUIPlugin } from "@stackflow/plugin-basic-ui";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { MainActivity } from "./activities/MainActivity";
import { DetailActivity } from "./activities/DetailActivity";

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    MainActivity,
    DetailActivity,
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
      },
      fallbackActivity: () => "MainActivity",
    }),
  ],
});
