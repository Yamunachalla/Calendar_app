import React, { useState } from "react";

const ActionModal = ({ company, onClose, onSave }) => {
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSave({ type, date, notes, completed: true });
  };

  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
      <div style={{ backgroundColor: "white", margin: "auto", padding: "20px", width: "50%" }}>
        <h2>Log Communication for {company.name}</h2>
        <div>
          <label>Type: </label>
          <input value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label>Date: </label>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>Notes: </label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default ActionModal;
