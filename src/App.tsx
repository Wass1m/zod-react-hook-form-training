import Home from "./components/features/Home";
import { SnackbarProvider } from "./contexts/SnackbarContext";

export default function App() {
  return (
    <SnackbarProvider>
      <Home />
    </SnackbarProvider>
  );
}
