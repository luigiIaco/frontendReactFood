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
        <Title>
        <h3>🔍 Cerca Prodotto</h3>
        </Title>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Inserisci quello che vuoi cercare...."
        />
        <button type="submit">Cerca</button>
      </FormStyle>
    </>
  );
};

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: auto;
  margin-top: 10px;
  padding: 20px;
  background: #2a7b9b;
  background: linear-gradient(
    90deg,
    rgba(42, 123, 155, 1) 0%,
    rgba(94, 218, 133, 1) 0%,
    rgba(178, 237, 83, 1) 64%
  );
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  input {
    width: 100%;
    padding: 12px 16px;
    margin: 8px 0;
    border: 2px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    color: black;
    background-color: #fff;
    transition: border-color 0.3s, background-color 0.3s;

    &:focus {
      border-color: #5b8c5a;
      background-color: #f1fdf0;
      outline: none;
    }

    &::placeholder {
      color: #aaa;
    }
  }

  button {
    padding: 12px 16px;
    margin-top: 16px;
    font-size: 16px;
    background-color: #5b8c5a;
    color: black;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #4b7b47;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const Title = styled.div`
 font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
`

export default Search;
