import Home from "./components/features/Home";
import Snackbar from "./components/ui/Snackbar";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import ThemeProvider from "./contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <Home />
        <Snackbar />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
