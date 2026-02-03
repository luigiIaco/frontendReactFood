import React, { useState } from "react";
import styled from "styled-components";
import { register } from "../../service/users/users.service";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Nuovo stato
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await register(username, password, email); // Invia anche email
      setSuccess(true);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <h2 style={{ textAlign: "center", marginBottom: "6px" }}>Sign up</h2>
        {success && (
          <SuccessMessage>
            Registrazione completata con successo!
          </SuccessMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Registrazione in corso..." : "Registrati"}
          </SubmitButton>

          <LoginLinkContainer>
            Hai già un account? <Link to="/login">Accedi</Link>
          </LoginLinkContainer>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  padding: 20px;
  transform: translateY(21%);
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Per Safari */
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1); /* Ombra "a doppio livello" */
  font-family: "Segoe UI", sans-serif;
`;

const SuccessMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid black;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
const LoginLinkContainer = styled.div`
  margin-top: 16px;
  text-align: center;
  font-size: 14px;

  a {
    color: #007bff;
    text-decoration: none;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register;
