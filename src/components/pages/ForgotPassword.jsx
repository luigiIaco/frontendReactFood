import React, { useState } from "react";
import styled from "styled-components";
import { recoveryPasswordByEmail } from "../../service/users/users.service";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await recoveryPasswordByEmail(email);
      setSuccess(data.message || "Email di recupero inviata con successo!");
      setLoading(false);
    } catch (e) {
      setError(e.message || "Errore durante l'invio dell'email.");
      setLoading(false);
    }
  };

  return (
    <Container>
      <RecoveryBox>
        <Header>
          <IconWrapper>
            <Mail size={28} />
          </IconWrapper>
          <h2>Recupera Password</h2>
          <p>Ti invieremo un link per impostare una nuova password</p>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {success ? (
          <SuccessContent>
            <div className="status-icon">
              <CheckCircle size={48} style={{margin: "0 auto"}} />
            </div>
            <p>{success}</p>
          </SuccessContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Invio in corso..." : (
                <>
                  Invia Link <Send size={18} style={{ marginLeft: "8px" }} />
                </>
              )}
            </SubmitButton>
          </form>
        )}

        <Footer>
          <Link to="/login">
            <ArrowLeft size={16} /> Torna alla pagina di Login
          </Link>
        </Footer>
      </RecoveryBox>
    </Container>
  );
};

// --- STYLED COMPONENTS (Emerald Theme) ---

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 20px;
`;

const RecoveryBox = styled.div`
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
    line-height: 1.5;
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
    padding: 14px 16px 14px 48px;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
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

const SuccessContent = styled.div`
  text-align: center;
  
  .status-icon {
    color: #10b981;
    margin-bottom: 16px;
  }

  p {
    color: #1e293b;
    font-weight: 500;
  }

  .back-link {
    display: inline-block;
    color: #10b981;
    font-weight: 700;
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  margin-top: 32px;
  text-align: center;

  a {
    color: #64748b;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: color 0.2s;

    &:hover {
      color: #10b981;
    }
  }
`;

export default ForgotPassword;