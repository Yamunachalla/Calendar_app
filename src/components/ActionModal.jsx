import React, { useState } from "react";

const ActionModal = ({ company, onClose, onSave }) => {
  const [form, setForm] = useState({
    type: "",
    date: "",
    notes: "",
  });

  const handleSubmit = () => {
    if (!form.type || !form.date || !form.notes) {
      alert("All fields are required.");
      return;
    }
    onSave({ ...form, completed: true }); // Pass all form data along with completed status
    onClose(); // Close the modal after saving
    console.log(form);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          width: "50%",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>Log Communication for {company.name}</h2>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Type:</label>
          <input
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Date:</label>
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) =>
              setForm({
                ...form,
                date: e.target.value,
              })
            }
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Notes:</label>
          <textarea
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", height: "80px" }}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;