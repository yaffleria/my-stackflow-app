import { StackflowPlugin } from "@stackflow/core";

export function simpleLoggerPlugin(): StackflowPlugin {
  return () => ({
    key: "simple-logger",
    onPush({ activity, params }: { activity: any; params: any }) {
      console.log(
        "%c[Stackflow] Push:",
        "color: #4caf50; font-weight: bold;",
        activity.name,
        params
      );
    },
    onPop({ activity }: { activity: any }) {
      console.log(
        "%c[Stackflow] Pop:",
        "color: #f44336; font-weight: bold;",
        activity.name
      );
    },
    onReplace({ activity, params }: { activity: any; params: any }) {
      console.log(
        "%c[Stackflow] Replace:",
        "color: #2196f3; font-weight: bold;",
        activity.name,
        params
      );
    },
  });
}
