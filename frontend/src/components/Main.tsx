import React, { useState } from "react";
import styled from "styled-components";
import { useApi } from "../hooks/useApi";
import { BoardSection } from "./board/BoardSection";
import { TaskList } from "./tasklist/TaskList";

const Container = styled.div`
  display: flex;
  height: 98vh;
  width: 100%;
`;

export const boardsData = [
  {
    id: 1,
    name: "Project Alpha",
    lists: [
      { id: 1, name: "To Do", cards: ["Setup repo", "Write docs"] },
      { id: 2, name: "In Progress", cards: ["Build UI"] },
      { id: 3, name: "Done", cards: ["Initial planning"] },
    ],
  },
  {
    id: 2,
    name: "Project Beta",
    lists: [
      { id: 4, name: "Backlog", cards: ["Research", "Design"] },
      { id: 5, name: "Sprint", cards: ["Implement API"] },
    ],
  },
];

const Main: React.FC = () => {
  const [boards, setBoards] = useState(boardsData);
  const [selectedBoard, setSelectedBoard] = useState(boardsData[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const api = useApi();

  return (
    <Container>
      <BoardSection
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        boards={boards}
        setBoards={setBoards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
      />
      <TaskList
        boards={boardsData}
        setBoards={setBoards}
        selectedBoard={selectedBoard}
        setSelectedBoard={setSelectedBoard}
      />
    </Container>
  );
};

export default Main;
