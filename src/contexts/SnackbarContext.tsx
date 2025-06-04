import { createContext, use, useCallback, useMemo, useState } from "react";

import {
  SnackbarContextType,
  SnackbarProviderProps,
  SnackbarSeverity,
  SnackbarState,
} from "./types";

export const SUCCESS = "success";
export const WARNING = "warning";
export const INFO = "info";
export const ERROR = "error";

const defaultSnackbarState: SnackbarContextType = {
  snackbar: {
    open: false,
    severity: "info",
    message: "",
  },
  popSnackbar: () => {},
  closeSnackbar: () => {},
};

const SnackbarContext =
  createContext<SnackbarContextType>(defaultSnackbarState);

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    severity: "info",
    message: "",
  });

  const popSnackbar = (message: string, severity: SnackbarSeverity) => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
  }, [snackbar]);

  const values = useMemo(
    () => ({
      snackbar,
      popSnackbar,
      closeSnackbar,
    }),
    [closeSnackbar, snackbar]
  );

  return <SnackbarContext value={values}>{children}</SnackbarContext>;
}

const useSnackbar = (): SnackbarContextType => {
  const context = use(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export { SnackbarProvider, useSnackbar };
