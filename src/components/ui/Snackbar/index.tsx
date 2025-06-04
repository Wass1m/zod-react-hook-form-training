import { Alert, Snackbar as MUISnackbar } from "@mui/material";
import { useSnackbar } from "../../../contexts/SnackbarContext";

function Snackbar() {
  const {
    snackbar: { severity, message, open },
    closeSnackbar,
  } = useSnackbar();

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={3000}
      role="status"
      onClose={handleClose}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={() => closeSnackbar()}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </MUISnackbar>
  );
}

export default Snackbar;
