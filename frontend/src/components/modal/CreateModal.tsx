import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export const CreateModal: React.FC<{
  title: string;
  inputPlaceholder?: string;
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}> = ({ title, inputPlaceholder, open, onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName("");
    }
  };

  const BoxStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={BoxStyle}>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <TextField
          label={inputPlaceholder || ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          autoFocus
          margin="normal"
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
