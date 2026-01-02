import { AppScreen } from "@stackflow/plugin-renderer-basic";
import { useFlow } from "../stackflow";

export const DetailActivity = () => {
  const { pop } = useFlow();

  return (
    <AppScreen appBar={{ title: "Detail Activity" }}>
      <div style={{ padding: "16px" }}>
        <h2>This is Detail</h2>
        <p>You navigated here using Stackflow.</p>
        <button
          onClick={() => pop()}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    </AppScreen>
  );
};
