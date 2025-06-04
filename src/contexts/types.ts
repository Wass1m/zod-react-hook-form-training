import { ReactNode } from "react";

export type ProviderProps = {
  children: ReactNode;
};

export type ThemeProviderProps = {
  children: ReactNode;
};

export type SnackbarProviderProps = {
  children: ReactNode;
};

export type ConfirmContextType = {
  confirm: (_title?: string, _description?: string) => Promise<unknown>;
};

export type SnackbarSeverity = "error" | "warning" | "info" | "success";

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
};

export type SnackbarContextType = {
  snackbar: SnackbarState;
  popSnackbar: (message: string, severity: SnackbarSeverity) => void;
  closeSnackbar: () => void;
};
