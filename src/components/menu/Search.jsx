import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${search}`);
  };


  return (
    <>
      <FormStyle onSubmit={handleSubmit}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Inserisci quello che vuoi cercare...."
        />
        <button type="submit"></button>
      </FormStyle>
    </>
  );
};

const FormStyle = styled.form`
  position: relative;
  max-width: 500px;
  margin: 0 auto;

  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem; /* Spazio a sinistra per la lente */
    border-radius: 12px;
    border: 2px solid #f3f4f6;
    background: #f9fafb;
    transition: all 0.2s;

    &:focus {
      background: white;
      border-color: #5b8c5a;
      box-shadow: 0 0 0 4px rgba(91, 140, 90, 0.1);
    }
  }

  /* La lente d'ingrandimento fissa */
  &:before {
    content: "🔍";
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.5;
  }
`;

const Title = styled.div`
 font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
`

export default Search;
