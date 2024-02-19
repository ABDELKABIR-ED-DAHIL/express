import React, { useState } from "react";
import axios from "axios";

const StagiaireByName = () => {
  const [stagiaireName, setStagiaireName] = useState("");
  const [result, setresult] = useState([]);

  const handleNameChange = (e) => {
    setStagiaireName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3001/api/stagiaires/name/${stagiaireName}`);
      setresult(response.data);
    } catch (error) {
      console.error("Error fetching stagiaires by name:", error);
    }
  };

  return (
    <div>
      <h2>Search by Name</h2>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Stagiaire Name"
            value={stagiaireName}
            onChange={handleNameChange}
          />
        <button variant="primary" type="submit">
          Submit
        </button>
      </form>
      {result.length > 0 && (
        <div>
          <h3>Les Stagiaires</h3>
          {result.map((stg) => (
            <div key={stg.id}>
              <p>Stagiaire: {stg.name}{" "} {stg.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StagiaireByName;