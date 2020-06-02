import React from "react";
import MuiAlert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

export const INFO_ALERT_SEVERITY = {
  add: 'success',
  delete: 'warning',
  update: 'info',
};

export class InfoAlert extends React.Component {
  render() {
    const { isOpen, onClose, severity, text } = this.props;
    return (
      <Snackbar open={isOpen} autoHideDuration={3000} onClose={onClose}>
        <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
          {text}
        </MuiAlert>
      </Snackbar>
    );
  }
}
