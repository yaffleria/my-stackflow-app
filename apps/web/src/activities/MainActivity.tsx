import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";
import { BottomTabBar } from "../components/BottomTabBar";
import toast from "react-hot-toast";

export const MainActivity = () => {
  const { push } = useFlow();

  return (
    <AppScreen appBar={{ title: "Main Activity" }}>
      <div style={{ padding: "16px", paddingBottom: "80px" }}>
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

        <div style={{ height: "10px" }} />

        <button
          onClick={() => push("MyBottomSheet", { title: "Hello from Main" })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Open Bottom Sheet
        </button>

        <div style={{ height: "20px" }} />

        <h3>Interactions</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => window.alert("This is a native alert!")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            Native Alert
          </button>

          <button
            onClick={() => {
              const result = window.confirm("Do you like hybrid apps?");
              toast(result ? "You said YES! 🎉" : "You said NO... 😢");
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              background: "white",
            }}
          >
            Native Confirm
          </button>

          <button
            onClick={() => toast.success("Successfully saved!")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#e0f7fa",
              color: "#006064",
            }}
          >
            Toast Success
          </button>

          <button
            onClick={() => toast.error("Something went wrong.")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#ffebee",
              color: "#c62828",
            }}
          >
            Toast Error
          </button>
        </div>

        <div style={{ height: "20px" }} />

        <h3>Funnel Demo</h3>
        <button
          onClick={() => push("SignupStep1", {})}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#9c27b0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          회원가입 시작 →
        </button>
      </div>
      <BottomTabBar currentTab="Home" />
    </AppScreen>
  );
};
