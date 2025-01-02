import React, { useState } from "react";

const CommunicationMethodManagement = ({ methods, onAddOrUpdate, onDelete }) => {
  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: methods.length + 1,
    mandatory: false,
  });

  const handleAddOrUpdateMethod = () => {
    if (!newMethod.name || !newMethod.description) {
      alert("Please fill out the required fields.");
      return;
    }
    onAddOrUpdate(newMethod);
    setNewMethod({
      name: "",
      description: "",
      sequence: methods.length + 1,
      mandatory: false,
    });
  };

  const handleDeleteMethod = (name) => {
    onDelete(name);
  };

  const handleChange = (e) => {
    setNewMethod({
      ...newMethod,
      [e.target.name]: e.target.name === "mandatory" ? e.target.checked : e.target.value,
    });
  };

  return (
    <div>
      <h4>Add or Update Communication Method</h4>
      <input
        type="text"
        name="name"
        placeholder="Communication Method Name"
        value={newMethod.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newMethod.description}
        onChange={handleChange}
      />
      <input
        type="number"
        name="sequence"
        placeholder="Sequence"
        value={newMethod.sequence}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="mandatory"
          checked={newMethod.mandatory}
          onChange={handleChange}
        />
        Mandatory
      </label>
      <button onClick={handleAddOrUpdateMethod}>Add/Update Method</button>

      <h4>Existing Communication Methods</h4>
      {methods.map((method, index) => (
        <div key={index}>
          <h5>{method.name}</h5>
          <p>{method.description}</p>
          <button onClick={() => handleDeleteMethod(method.name)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CommunicationMethodManagement;
