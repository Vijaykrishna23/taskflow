export const AddCard = (props: { onAdd: () => void }) => {
  const { onAdd } = props;
  return (
    <div
      style={{
        marginTop: "16px",
        padding: "8px",
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
      <span style={{ color: "#888", fontWeight: 500 }}>+ Add Card</span>
    </div>
  );
};
