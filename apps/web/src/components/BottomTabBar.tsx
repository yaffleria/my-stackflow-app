import { useFlow } from "../stackflow";

type Tab = "Home" | "Profile";

interface BottomTabBarProps {
  currentTab: Tab;
}

export const BottomTabBar = ({ currentTab }: BottomTabBarProps) => {
  const { replace } = useFlow();

  const onTabClick = (tab: Tab, activityName: string) => {
    if (currentTab === tab) return;

    // Use replace to switch tabs without pushing to stack (prevents back button history buildup)
    // animate: false would be ideal if supported directly, but basic renderer usually animates.
    // For a perfect tab experience, advanced CSS or a custom renderer is often used,
    // but replace() works well enough for simple apps.
    replace(activityName as any, {}, { animate: false });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "white",
        borderTop: "1px solid #e0e0e0",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 1000,
        paddingBottom: "env(safe-area-inset-bottom)", // Handle iPhone Home Indicator
      }}
    >
      <button
        onClick={() => onTabClick("Home", "MainActivity")}
        style={{
          border: "none",
          backgroundColor: "transparent",
          color: currentTab === "Home" ? "#007bff" : "#888",
          fontWeight: currentTab === "Home" ? "bold" : "normal",
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "20px", marginBottom: "2px" }}>🏠</span>
        Home
      </button>

      <button
        onClick={() => onTabClick("Profile", "ProfileActivity")}
        style={{
          border: "none",
          backgroundColor: "transparent",
          color: currentTab === "Profile" ? "#007bff" : "#888",
          fontWeight: currentTab === "Profile" ? "bold" : "normal",
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "20px", marginBottom: "2px" }}>👤</span>
        Profile
      </button>
    </div>
  );
};
