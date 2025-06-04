import { DialogProps } from "@mui/material";
import { ReactNode } from "react";
import { Control } from "react-hook-form";

import { FEATURES } from "@/domains/permissions/enums";

import { DialogEscapeCloseProps } from "../components/ui/common/DialogEscapeClose/types";

export type ControlledComponentProps = {
  name: string;
  control?: Control;
};

export type RowData = {
  id: string;
  field: string;
  value: string;
};

export type RequireAuthProps = {
  children: ReactNode;
};

export type RequireRightsProps = {
  children: ReactNode;
  feature: FEATURES;
};

export type RequireDisconnectedProps = {
  children?: ReactNode;
};

export type SvgIconComponent = OverridableComponent<
  SvgIconTypeMap<object, "svg">
> & {
  muiName: string;
};

export type DialogEscapeCloseProps = {
  children: ReactNode;
  onClose: () => void | null;
  open?: boolean;
  title?: string;
  key?: string;
} & Partial<DialogProps>;
