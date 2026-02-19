import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { resetPassword } from "../../service/users/users.service";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setError("Token non valido o scaduto. Richiedi un nuovo link.");
    }
  }, [token, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !userId) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await resetPassword({ userId, token, newPassword });
      setMessage(response.message || "Password aggiornata con successo!");
      setLoading(false);

      // Reindirizza dopo 3s
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message || "Errore durante il reset della password.");
      setLoading(false);
    }
  };

  return (
    <Container>
      <ResetBox>
        <Header>
          <IconWrapper>
            <ShieldCheck size={28} />
          </IconWrapper>
          <h2>Nuova Password</h2>
          <p>Scegli una password sicura per il tuo account</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <SuccessMessage>✨ {message} Verrai reindirizzato al login...</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Inserisci la nuova password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={!token || !userId}
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </ToggleButton>
          </InputGroup>

          <SubmitButton type="submit" disabled={loading || !token || !userId}>
            {loading ? "Salvataggio..." : "Aggiorna Password"}
          </SubmitButton>
        </form>
      </ResetBox>
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 20px;
`;

const ResetBox = styled.div`
  width: 100%;
  max-width: 420px;
  background: white;
  padding: 40px;
  border-radius: 32px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f1f5f9;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-size: 1.75rem;
    color: #0f172a;
    font-weight: 800;
    margin-top: 16px;
    letter-spacing: -0.025em;
  }

  p {
    color: #64748b;
    font-size: 0.95rem;
    margin-top: 8px;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  background: #f0fdf4;
  color: #10b981;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 24px;

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 14px 48px 14px 48px;
    border: 2px solid #f1f5f9;
    border-radius: 16px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #f8fafc;
    color: #1e293b;

    &:focus {
      outline: none;
      border-color: #10b981;
      background: white;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.08);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #10b981;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 12px 20px -5px rgba(16, 185, 129, 0.3);
  }

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  color: #dc2626;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #fee2e2;
  margin-bottom: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  color: #16a34a;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #dcfce7;
  margin-bottom: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
`;

export default ResetPassword;