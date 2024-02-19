import React, { useState, useEffect } from "react";
import axios from "axios";

const GmailStagiairesList = () => {
  const [gmailStagiaires, setGmailStagiaires] = useState([]);

  useEffect(() => {
    fetchGmailStagiaires();
  }, []);

  const fetchGmailStagiaires = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/stagiaires/email/gmail");
      setGmailStagiaires(response.data);
    } catch (error) {
      console.error("Error fetching Gmail stagiaires:", error.message);
    }
  };

  return (
    <div>
      <h2>Gmail Stagiaires</h2>
      <ul>
        {gmailStagiaires.map((stagiaire) => (
          <li key={stagiaire.id}>{stagiaire.name} - {stagiaire.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default GmailStagiairesList;
