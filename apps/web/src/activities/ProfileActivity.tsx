import { AppScreen } from "@stackflow/plugin-basic-ui";
import { BottomTabBar } from "../components/BottomTabBar";

export const ProfileActivity = () => {
  return (
    <AppScreen appBar={{ title: "My Profile" }}>
      <div style={{ padding: "16px", paddingBottom: "80px" }}>
        <h2>User Profile</h2>
        <div
          style={{
            backgroundColor: "#f5f5f5",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "30px",
              backgroundColor: "#ddd",
              marginBottom: "10px",
            }}
          />
          <strong>Username</strong>
          <p style={{ color: "#666", margin: "5px 0 0 0" }}>user@example.com</p>
        </div>
        <p>This is a separate activity acting as a tab.</p>
      </div>
      <BottomTabBar currentTab="Profile" />
    </AppScreen>
  );
};
