import { BottomSheet } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";

// Define the params type if you want strict typing for activity params
interface MyBottomSheetParams {
  title?: string;
}

export const MyBottomSheet = ({ params }: { params: MyBottomSheetParams }) => {
  const { pop } = useFlow();

  return (
    <BottomSheet>
      <div style={{ padding: "20px 16px 40px 16px" }}>
        <h3 style={{ marginTop: 0 }}>{params.title || "My Bottom Sheet"}</h3>
        <p style={{ marginBottom: "20px", lineHeight: "1.5" }}>
          This is a Stackflow ActionSheet (Bottom Sheet).
          <br />
          It behaves just like an activity!
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => pop()}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Confirm
          </button>

          <button
            onClick={() => pop()}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              backgroundColor: "transparent",
              fontSize: "16px",
              color: "#333",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};
