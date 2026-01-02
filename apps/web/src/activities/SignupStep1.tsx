import { useState } from "react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../stackflow";

export const SignupStep1 = () => {
  const { push } = useFlow();
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (!email.trim()) {
      alert("이메일을 입력해주세요.");
      return;
    }
    push("SignupStep2", { email });
  };

  return (
    <AppScreen appBar={{ title: "회원가입 (1/3)" }}>
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "8px" }}>이메일 입력</h2>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          사용하실 이메일 주소를 입력해주세요.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleNext}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          다음
        </button>
      </div>
    </AppScreen>
  );
};
