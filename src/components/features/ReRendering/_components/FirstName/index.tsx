import { Typography } from "@mui/material";
import { useFirstName } from "../../context/reRenderContext";

function FirstName() {
  const { firstName } = useFirstName();
  return <Typography variant="h4">Hello {firstName || "ASK"}!</Typography>;
}

export default FirstName;
