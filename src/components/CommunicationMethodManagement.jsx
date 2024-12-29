import React, { useState } from "react";

const CommunicationMethodManagement = () => {
  const [methods, setMethods] = useState([
    { name: "LinkedIn Post", description: "Post on LinkedIn", sequence: 1, mandatory: true },
    { name: "LinkedIn Message", description: "Message on LinkedIn", sequence: 2, mandatory: false },
    { name: "Email", description: "Send email", sequence: 3, mandatory: true },
    { name: "Phone Call", description: "Call on phone", sequence: 4, mandatory: false },
    { name: "Other", description: "Any other communication", sequence: 5, mandatory: false },
  ]);

  const [newMethod, setNewMethod] = useState({
    name: "",
    description: "",
    sequence: 0,
    mandatory: false,
  });

  const [isEditing, setIsEditing] = useState(false); // State to determine edit mode
  const [editIndex, setEditIndex] = useState(null); // Index of the method being edited

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMethod((prev) => ({
      ...prev,
      [name]: name === "mandatory" ? e.target.checked : value, // Handle checkbox correctly
    }));
  };

  // Add or update communication method
  const saveMethod = () => {
    if (isEditing) {
      // Update an existing method
      setMethods((prev) =>
        prev.map((method, index) =>
          index === editIndex ? { ...newMethod, sequence: method.sequence } : method
        )
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add a new method
      setMethods((prev) => [...prev, { ...newMethod, sequence: prev.length + 1 }]);
    }

    // Reset the form
    setNewMethod({ name: "", description: "", sequence: 0, mandatory: false });
  };

  // Edit a method
  const editMethod = (index) => {
    setNewMethod(methods[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Delete a method
  const deleteMethod = (index) => {
    setMethods((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Manage Communication Methods</h2>

      {/* Form to add or edit a communication method */}
      <div>
        <h3>{isEditing ? "Edit Communication Method" : "Add a New Communication Method"}</h3>
        <input
          type="text"
          name="name"
          placeholder="Method Name"
          value={newMethod.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newMethod.description}
          onChange={handleInputChange}
        />
        <label>
          Mandatory:
          <input
            type="checkbox"
            name="mandatory"
            checked={newMethod.mandatory}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={saveMethod}>{isEditing ? "Update Method" : "Add Method"}</button>
      </div>

      {/* Display communication methods list */}
      <h3>Communication Methods List</h3>
      <ul>
        {methods.map((method, index) => (
          <li key={index}>
            <strong>{method.name}</strong> - {method.description} - Sequence: {method.sequence} -{" "}
            {method.mandatory ? "Mandatory" : "Optional"}
            <br />
            <button onClick={() => editMethod(index)}>Edit</button>
            <button onClick={() => deleteMethod(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunicationMethodManagement;
