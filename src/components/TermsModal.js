import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function TermsModal({ open, onClose, tyc }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Términos y Condiciones
        <IconButton onClick={onClose} style={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2" paragraph>
          {tyc}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default TermsModal;
