import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
}

export const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onSave,
  initialName,
}) => {
  const [name, setName] = useState(initialName);

  React.useEffect(() => {
    setName(initialName);
  }, [initialName, open]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Board
        </Typography>
        <TextField
          label="Board Name"
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
