import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { useState } from "react";
import { boardsData } from "../Main";
import { CreateModal } from "../modal/CreateModal";
import { EditModal } from "../modal/EditModal";
import { DeleteModal } from "../modal/DeleteModal";

const Sidebar = styled.div`
  flex: 0.2;
  padding: 20px;
  background: #6e6e6e;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

const BoardList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BoardItem = styled.li<{ selected: boolean }>`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background: ${({ selected }) => (selected ? "#007bff" : "transparent")};
  color: ${({ selected }) => (selected ? "#fff" : "#cfd8dc")};
  cursor: pointer;
  &:hover {
    background: #007bff;
    color: #fff;
  }
`;

export const BoardSection = (props: {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  boards: typeof boardsData;
  setBoards: (boards: typeof boardsData) => void;
  selectedBoard: (typeof boardsData)[0];
  setSelectedBoard: (board: (typeof boardsData)[0]) => void;
}) => {
  const {
    modalOpen,
    setModalOpen,
    boards,
    setBoards,
    selectedBoard,
    setSelectedBoard,
  } = props;

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<
    (typeof boardsData)[0] | null
  >(null);
  const [deletingBoard, setDeletingBoard] = useState<
    (typeof boardsData)[0] | null
  >(null);

  const handleCreateBoard = async (name: string) => {
    // Placeholder for API call
    // await api.callApi('/api/boards', 'POST', { name });
    const newBoard = {
      id: boards.length + 1,
      name,
      lists: [],
    };
    setBoards([...boards, newBoard]);
    setModalOpen(false);
    setSelectedBoard(newBoard);
  };

  const handleEditBoard = (board: (typeof boardsData)[0]) => {
    setEditingBoard(board);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (name: string) => {
    if (editingBoard) {
      const updated = boards.map((b) =>
        b.id === editingBoard.id ? { ...b, name } : b,
      );
      setBoards(updated);
      if (selectedBoard.id === editingBoard.id)
        setSelectedBoard({ ...editingBoard, name });
    }
    setEditModalOpen(false);
    setEditingBoard(null);
  };

  const handleDeleteBoard = (board: (typeof boardsData)[0]) => {
    setDeletingBoard(board);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingBoard) {
      const filtered = boards.filter((b) => b.id !== deletingBoard.id);
      setBoards(filtered);
      if (selectedBoard.id === deletingBoard.id && filtered.length > 0)
        setSelectedBoard(filtered[0]);
      else if (filtered.length === 0)
        setSelectedBoard({ id: 0, name: "", lists: [] });
    }
    setDeleteModalOpen(false);
    setDeletingBoard(null);
  };

  return (
    <Sidebar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: "1rem",
          borderBottom: "1px solid #fff",
        }}
      >
        <h2 style={{ margin: 0 }}>Boards</h2>
        <IconButton
          color="primary"
          onClick={() => setModalOpen(true)}
          size="small"
          sx={{ color: "#fff" }}
        >
          <AddIcon />
        </IconButton>
      </div>
      <BoardList>
        {boards.map((board) => (
          <BoardItem
            key={board.id}
            selected={selectedBoard.id === board.id}
            onClick={() => setSelectedBoard(board)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span style={{ flex: 1 }}>{board.name}</span>
            <span>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditBoard(board);
                }}
                sx={{ color: "#fff" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(board);
                }}
                sx={{ color: "#fff" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </span>
          </BoardItem>
        ))}
      </BoardList>
      <CreateModal
        title="Create Board"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleCreateBoard}
      />
      <EditModal
        open={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingBoard(null);
        }}
        onSave={handleSaveEdit}
        initialName={editingBoard ? editingBoard.name : ""}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDeletingBoard(null);
        }}
        onConfirm={handleConfirmDelete}
        boardName={deletingBoard ? deletingBoard.name : ""}
      />
    </Sidebar>
  );
};
