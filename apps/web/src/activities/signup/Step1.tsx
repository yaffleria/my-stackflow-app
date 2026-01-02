import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from "../../stackflow";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod 스키마 정의
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

type EmailFormData = z.infer<typeof emailSchema>;

export const SignupStep1 = () => {
  const { push } = useFlow();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = (data: EmailFormData) => {
    push("SignupStep2", { email: data.email });
  };

  return (
    <AppScreen appBar={{ title: "회원가입 (1/3)" }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "8px" }}>이메일 입력</h2>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          사용하실 이메일 주소를 입력해주세요.
        </p>

        <input
          type="email"
          {...register("email")}
          placeholder="example@email.com"
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            border: errors.email ? "1px solid #dc3545" : "1px solid #ddd",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />

        {errors.email && (
          <p style={{ color: "#dc3545", fontSize: "14px", marginTop: "8px" }}>
            {errors.email.message}
          </p>
        )}

        <button
          type="submit"
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
      </form>
    </AppScreen>
  );
};
