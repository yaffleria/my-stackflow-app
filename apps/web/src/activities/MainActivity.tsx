import { AppScreen } from "@stackflow/plugin-renderer-basic";
import { useFlow } from "../stackflow";

export const MainActivity = () => {
  const { push } = useFlow();

  return (
    <AppScreen appBar={{ title: "Main Activity" }}>
      <div style={{ padding: "16px" }}>
        <h2>Hello Stackflow!</h2>
        <p>This is a hybrid app using Stackflow + React Native (Expo).</p>
        <button
          onClick={() => push("DetailActivity", {})}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Detail
        </button>
      </div>
    </AppScreen>
  );
};
