/* eslint-disable @eslint-react/hooks-extra/no-direct-set-state-in-use-effect */
import {
  ThemeProvider as MUIThemeProvider,
  useTheme,
} from "@mui/material/styles";

import { ThemeProviderProps } from "./types";

function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useTheme();
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}

export default ThemeProvider;
