import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
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
    historySyncPlugin({
      routes: {
        MainActivity: "/",
        DetailActivity: "/detail",
      },
      fallbackActivity: () => "MainActivity",
    }),
  ],
});
