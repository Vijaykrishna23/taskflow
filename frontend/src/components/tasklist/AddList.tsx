import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddList = (props: { onAdd: () => void }) => {
  const { onAdd } = props;
  return (
    <div
      style={{
        minWidth: "250px",
        height: "100px",
        border: "2px dashed #bbb",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafbfc",
        cursor: "pointer",
      }}
      onClick={() => onAdd()}
    >
      <IconButton color="primary" size="large">
        <AddIcon style={{ color: "#888" }} />
      </IconButton>
      <span style={{ color: "#888", fontWeight: 500 }}>Add List</span>
    </div>
  );
};
