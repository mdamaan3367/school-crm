import React from "react";

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
  },
  modal: {
    background: "#fff",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "600px",
    padding: "1rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    animation: "fadeIn 0.25s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
  },
  content: {
    maxHeight: "70vh",
    overflowY: "auto",
  },
};

export default Modal;
