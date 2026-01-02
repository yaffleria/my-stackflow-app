import "@stackflow/plugin-basic-ui/index.css";
import { Stack } from "./stackflow";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <Toaster position="bottom-center" />
    </QueryClientProvider>
  );
};

export default App;
