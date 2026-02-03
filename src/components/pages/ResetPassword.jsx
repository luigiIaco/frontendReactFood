import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../../service/users/users.service";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Recupera query params
  const searchParams = new URLSearchParams(useLocation().search);
  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  useEffect(() => {
    if (!token || !userId) {
      setError("Token non valido o mancante.");
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await resetPassword({ userId, token, newPassword });
      setMessage(response.message);
      setLoading(false);

      // Reindirizza dopo 3s
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Errore durante il reset.");
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h2>Reimposta la tua password</h2>
        {error && <Error>{error}</Error>}
        {message && <Success>{message}</Success>}

        <input
          type="password"
          placeholder="Nuova password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Salvataggio..." : "Salva password"}
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;

  form {
    width: 100%;
    max-width: 400px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0,0,0,0.15);
  }

  form h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  form input {
    width: 100%;
    padding: 12px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  form button {
    width: 100%;
    padding: 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }

  form button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  background-color: #dc3545;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  text-align: center;
`;

const Success = styled.div`
  background-color: green;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  text-align: center;
`;

export default ResetPassword;
