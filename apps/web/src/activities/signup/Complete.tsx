import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../../stackflow";

interface SignupCompleteParams {
  email: string;
  password: string;
}

export const SignupComplete = ({
  params,
}: {
  params: SignupCompleteParams;
}) => {
  const { replace } = useFlow();

  const handleGoHome = () => {
    // replace로 스택을 완전히 교체하여 뒤로가기 시 가입 플로우로 못 돌아가게 함
    replace("MainActivity", {});
  };

  return (
    <AppScreen
      appBar={{
        title: "회원가입 완료",
        backButton: {
          render: () => null, // 뒤로가기 버튼 숨김
        },
      }}
      preventSwipeBack // iOS 스와이프 백 제스처 방지
    >
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
        <h2 style={{ marginBottom: "8px" }}>가입 완료!</h2>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          <strong>{params.email}</strong> 계정이 생성되었습니다.
        </p>

        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
            📧 이메일: {params.email}
          </p>
          <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#666" }}>
            🔒 비밀번호: {"•".repeat(params.password.length)}
          </p>
        </div>

        <button
          onClick={handleGoHome}
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          홈으로 이동
        </button>
      </div>
    </AppScreen>
  );
};
