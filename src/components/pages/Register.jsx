import React, { useState } from "react";
import styled from "styled-components";
import { register } from "../../service/users/users.service";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Stato per la visibilità
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await register(username, password, email);
      setSuccess(true);
      setLoading(false);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (e) {
      setError(e.message || "Errore durante la registrazione");
      setLoading(false);
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Header>
          <IconWrapper>
            <UserPlus size={28} />
          </IconWrapper>
          <h2>Crea Account</h2>
          <p>Unisciti alla nostra community culinaria</p>
        </Header>

        {success && (
          <SuccessMessage>
            ✨ Registrazione completata! Ora puoi{" "}
            <Link to="/login">accedere</Link>.
          </SuccessMessage>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <form onSubmit={handleSubmit}>
          <InputGroup>
            <User size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"} // Tipo dinamico
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ToggleButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Nascondi password" : "Mostra password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </ToggleButton>
          </InputGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Creazione in corso..." : "Registrati"}
          </SubmitButton>
        </form>

        <Footer>
          Hai già un account? <Link to="/login">Accedi</Link>
        </Footer>
      </RegisterBox>
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

const RegisterBox = styled.div`
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
  margin-bottom: 20px;

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
  margin-top: 10px;

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

  a {
    color: #16a34a;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: center;
  color: #64748b;
  font-size: 0.9rem;

  a {
    color: #10b981;
    font-weight: 700;
    text-decoration: none;
    margin-left: 5px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Register;