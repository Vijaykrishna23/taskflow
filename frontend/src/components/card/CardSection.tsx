import { useState } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddCard } from "./AddCard";
import { CreateCardModal } from "../modal/CreateCardModal";
import { EditModal } from "../modal/EditModal";
import { DeleteModal } from "../modal/DeleteModal";

export const CardSection = (props: {
  cards: string[];
  setCards: (cards: string[]) => void;
}) => {
  const { cards, setCards } = props;
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingCardIdx, setEditingCardIdx] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deletingCardIdx, setDeletingCardIdx] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleAddCard = (name: string) => {
    setCards([...cards, name]);
    setAddModalOpen(false);
  };
  const handleEditCard = (idx: number) => {
    setEditingCardIdx(idx);
    setEditModalOpen(true);
  };
  const handleSaveEditCard = (name: string) => {
    if (editingCardIdx !== null) {
      const updated = [...cards];
      updated[editingCardIdx] = name;
      setCards(updated);
    }
    setEditModalOpen(false);
    setEditingCardIdx(null);
  };
  const handleDeleteCard = (idx: number) => {
    setDeletingCardIdx(idx);
    setDeleteModalOpen(true);
  };
  const handleConfirmDeleteCard = () => {
    if (deletingCardIdx !== null) {
      const updated = cards.filter((_, i) => i !== deletingCardIdx);
      setCards(updated);
    }
    setDeleteModalOpen(false);
    setDeletingCardIdx(null);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            background: "#f7fafc",
            borderRadius: 4,
            padding: "0.75rem 1rem",
            marginBottom: 12,
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{card}</span>
          <span>
            <IconButton size="small" onClick={() => handleEditCard(idx)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => handleDeleteCard(idx)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>
        </div>
      ))}
      <AddCard onAdd={() => setAddModalOpen(true)} />
      <CreateCardModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAddCard}
      />
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingCardIdx(null);
        }}
        onSave={handleSaveEditCard}
        initialName={editingCardIdx !== null ? cards[editingCardIdx] : ""}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingCardIdx(null);
        }}
        onConfirm={handleConfirmDeleteCard}
        boardName={deletingCardIdx !== null ? cards[deletingCardIdx] : ""}
      />
    </div>
  );
};
