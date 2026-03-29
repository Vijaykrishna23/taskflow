import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import type { boardsData } from "../Main";
import { useState } from "react";
import { EditModal } from "../modal/EditModal";
import { DeleteModal } from "../modal/DeleteModal";
import { CreateModal } from "../modal/CreateModal";
import { AddList } from "./AddList";
import { CardSection } from "../card/CardSection";

const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-left: 16px;
  overflow-x: auto;
`;

const ListColumn = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: 250px;
  width: fit-content;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border: 1px solid #e0e0e0;
  background: #b7abab;
  height: fit-content;
`;

const Card = styled.div`
  background: #f7fafc;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

export const TaskList = (props: {
  boards: typeof boardsData;
  setBoards: (boards: typeof boardsData) => void;
  selectedBoard: (typeof boardsData)[0];
  setSelectedBoard: (board: (typeof boardsData)[0]) => void;
}) => {
  const { boards, setBoards, selectedBoard, setSelectedBoard } = props;
  const [editingList, setEditingList] = useState<any>(null);
  const [editListModalOpen, setEditListModalOpen] = useState(false);
  const [deletingList, setDeletingList] = useState<any>(null);
  const [deleteListModalOpen, setDeleteListModalOpen] = useState(false);
  const [addListModalOpen, setAddListModalOpen] = useState(false);

  const handleEditList = (list: any) => {
    setEditingList(list);
    setEditListModalOpen(true);
  };
  const handleDeleteList = (list: any) => {
    setDeletingList(list);
    setDeleteListModalOpen(true);
  };

  const handleSaveEditList = (name: string) => {
    if (editingList) {
      const updatedLists = selectedBoard.lists.map((l: any) =>
        l.id === editingList.id ? { ...l, name } : l,
      );
      const updatedBoards = boards.map((b: any) =>
        b.id === selectedBoard.id ? { ...b, lists: updatedLists } : b,
      );
      setBoards(updatedBoards);
      setSelectedBoard({ ...selectedBoard, lists: updatedLists });
    }
    setEditListModalOpen(false);
    setEditingList(null);
  };

  const handleConfirmDeleteList = () => {
    if (deletingList) {
      const updatedLists = selectedBoard.lists.filter(
        (l: any) => l.id !== deletingList.id,
      );
      const updatedBoards = boards.map((b: any) =>
        b.id === selectedBoard.id ? { ...b, lists: updatedLists } : b,
      );
      setBoards(updatedBoards);
      setSelectedBoard({ ...selectedBoard, lists: updatedLists });
    }
    setDeleteListModalOpen(false);
    setDeletingList(null);
  };

  const handleCreateList = (name: string) => {
    const newList = {
      id:
        selectedBoard.lists.length > 0
          ? Math.max(...selectedBoard.lists.map((l) => l.id)) + 1
          : 1,
      name,
      cards: [],
    };
    const updatedBoards = boards.map((b) =>
      b.id === selectedBoard.id ? { ...b, lists: [...b.lists, newList] } : b,
    );
    setBoards(updatedBoards);
    setSelectedBoard({
      ...selectedBoard,
      lists: [...selectedBoard.lists, newList],
    });
    setAddListModalOpen(false);
  };

  return (
    <MainArea>
      {selectedBoard.lists.map((list) => (
        <ListColumn key={list.id}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 0,
              marginBottom: "16px",
              borderBottom: "1px solid #000",
              width: "100%",
            }}
          >
            <h3 style={{ margin: 0 }}>{list.name}</h3>
            <span>
              <IconButton size="small" onClick={() => handleEditList(list)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleDeleteList(list)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </div>
          <CardSection
            cards={list.cards}
            setCards={(newCards: string[]) => {
              const updatedLists = selectedBoard.lists.map((l: any) =>
                l.id === list.id ? { ...l, cards: newCards } : l,
              );
              const updatedBoards = boards.map((b: any) =>
                b.id === selectedBoard.id ? { ...b, lists: updatedLists } : b,
              );
              setBoards(updatedBoards);
              setSelectedBoard({ ...selectedBoard, lists: updatedLists });
            }}
          />
        </ListColumn>
      ))}
      <AddList
        onAdd={() => {
          setAddListModalOpen(true);
        }}
      />
      {/* Modals */}
      <CreateModal
        title="Create List"
        inputPlaceholder="List Name"
        open={addListModalOpen}
        onClose={() => setAddListModalOpen(false)}
        onSave={handleCreateList}
      />
      <EditModal
        open={editListModalOpen}
        onClose={() => {
          setEditListModalOpen(false);
          setEditingList(null);
        }}
        onSave={handleSaveEditList}
        initialName={editingList ? editingList.name : ""}
      />
      <DeleteModal
        open={deleteListModalOpen}
        onClose={() => {
          setDeleteListModalOpen(false);
          setDeletingList(null);
        }}
        onConfirm={handleConfirmDeleteList}
        boardName={deletingList ? deletingList.name : ""}
      />
    </MainArea>
  );
};
