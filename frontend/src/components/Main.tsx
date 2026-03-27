import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100%;
  background: #f0f2f5;
  width: 100%;
`;

const Sidebar = styled.div`
  flex: 0.2;
  background: #222e3c;
  color: #fff;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
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

const MainArea = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
`;

const ListColumn = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-right: 2rem;
  min-width: 250px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ListTitle = styled.h3`
  margin: 0 0 1rem 0;
`;

const Card = styled.div`
  background: #f7fafc;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

const boardsData = [
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
  const [selectedBoard, setSelectedBoard] = useState(boardsData[0]);

  return (
    <Container>
      <Sidebar>
        <h2 style={{ marginBottom: "2rem" }}>Boards</h2>
        <BoardList>
          {boardsData.map((board) => (
            <BoardItem
              key={board.id}
              selected={selectedBoard.id === board.id}
              onClick={() => setSelectedBoard(board)}
            >
              {board.name}
            </BoardItem>
          ))}
        </BoardList>
      </Sidebar>
      <MainArea>
        {selectedBoard.lists.map((list) => (
          <ListColumn key={list.id}>
            <ListTitle>{list.name}</ListTitle>
            {list.cards.map((card: string, idx: number) => (
              <Card key={idx}>{card}</Card>
            ))}
          </ListColumn>
        ))}
      </MainArea>
    </Container>
  );
};

export default Main;
