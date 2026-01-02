import { useState } from "react";
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../../stackflow";

interface SignupStep2Params {
  email: string;
}

export const SignupStep2 = ({ params }: { params: SignupStep2Params }) => {
  const { push } = useFlow();
  const [password, setPassword] = useState("");

  const handleNext = () => {
    if (password.length < 4) {
      alert("비밀번호는 4자 이상이어야 합니다.");
      return;
    }
    push("SignupComplete", { email: params.email, password });
  };

  return (
    <AppScreen appBar={{ title: "회원가입 (2/3)" }}>
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "8px" }}>비밀번호 입력</h2>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          <strong>{params.email}</strong> 계정의 비밀번호를 설정해주세요.
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호 (4자 이상)"
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
          완료
        </button>
      </div>
    </AppScreen>
  );
};
