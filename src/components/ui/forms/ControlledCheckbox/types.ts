import { FormControlProps } from "@mui/material";
import { ControlledComponentProps } from "../../../../types/types";

export type ControlledCheckboxProps = {
  label: string;
} & ControlledComponentProps &
  FormControlProps;
