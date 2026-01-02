import "@stackflow/plugin-basic-ui/index.css";
import { Stack } from "./stackflow";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Stack />
      <Toaster position="bottom-center" />
    </>
  );
};

export default App;
