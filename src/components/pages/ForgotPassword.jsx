import React, { useState } from "react";
import styled from "styled-components";
import { recoveryPasswordByEmail } from "../../service/users/users.service";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await recoveryPasswordByEmail(email);
      setSuccess(data.message);
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Recovery password</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          <input
            type="email"
            name="email"
            placeholder="Inserisci l'email associata all'utente"
            value={email}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Recovering..." : "Recovery password"}
          </SubmitButton>
        </form>
        <RedirectLoginWrapper>
          <Link to={"/login"}>Back to Login page</Link> <FaArrowRightLong />
        </RedirectLoginWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;

  .login-form {
    width: 100%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); /* Per Safari */
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1); /* Ombra "a doppio livello" */
    font-family: "Segoe UI", sans-serif;
  }

  .login-form h2 {
    text-align: center;
    margin-bottom: 6px;
    color: #333;
  }

  .login-form input[type="email"] {
    width: 100%;
    padding: 12px 14px;
    margin-bottom: 16px;
    border: 1px solid black;
    border-radius: 8px;
    font-size: 15px;
    transition: border-color 0.3s ease;
  }

  .login-form input:focus {
    border-color: #007bff;
    outline: none;
  }

  .login-form button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    border: none;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .login-form button:hover {
    background-color: #0056b3;
  }

  .login-form .message {
    text-align: center;
    margin-top: 16px;
    font-size: 14px;
    color: #666;
  }

  .login-form .footer {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
  }

  .login-form .footer a {
    color: #007bff;
    text-decoration: none;
  }

  .login-form .footer a:hover {
    text-decoration: underline;
  }
`;

const RedirectLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  svg {
    margin-top: 4px;
    margin-left: 6px;
  }
`;

const ErrorMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: green;
  color: white;
  border-radius: 5px;
  text-align: center;
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

export default ForgotPassword;
