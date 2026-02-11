import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../service/users/users.service";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { Lock, User, Eye, EyeOff } from "lucide-react";

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Stati per la gestione del form
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { message } = location.state || {};
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  // Recupero credenziali salvate dai cookie
  useEffect(() => {
    const raw = Cookies.get("rememberCredential");
    if (raw) {
      const saved = JSON.parse(raw);
      setFormData(prev => ({
        ...prev,
        username: saved.username || "",
        password: saved.password || "",
      }));
    }
  }, []);

  const handleCaptchaChange = (token) => setCaptchaToken(token);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      setError("Per favore, conferma che non sei un robot.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const results = await login(formData.username, formData.password);
      
      // Seed dinamico per l'avatar basato sullo username
      const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${formData.username}`;
      results.user.linkAvatar = avatarUrl;
      
      localStorage.setItem("authToken", results.data);
      localStorage.setItem("user", JSON.stringify(results.user));

      if (formData.remember) {
        Cookies.set("rememberCredential", JSON.stringify({
          username: formData.username,
          password: formData.password,
        }), { expires: 7 });
      } else {
        Cookies.remove("rememberCredential");
      }

      navigate("/home");
    } catch (err) {
      setError("Credenziali non valide. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Header>
          <IconWrapper>
             <Lock size={28} />
          </IconWrapper>
          <h2>Benvenuto</h2>
          <p>Inserisci i tuoi dati per accedere</p>
        </Header>

        <form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {message && <AuthMessage>{message}</AuthMessage>}

          <InputGroup>
            <User size={18} className="input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            //   autocomplete="current-password"
              value={formData.password}
              onChange={handleChange}
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

          <ActionsRow>
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span className="checkmark"></span>
              Ricordami
            </label>
            <Link to="/forgotPassword">Password dimenticata?</Link>
          </ActionsRow>

          <CaptchaWrapper>
            <ReCAPTCHA
              sitekey="6LfLHTYrAAAAAOFT32kF7AFYHKXsX_8j8hqmqYKk"
              onChange={handleCaptchaChange}
              size="normal"
            />
          </CaptchaWrapper>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "In attesa che l'hosting esca dallo sleep..." : "Accedi"}
          </SubmitButton>
        </form>

        <Footer>
          Non hai un account? <Link to="/register">Registrati ora</Link>
        </Footer>
      </LoginBox>
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

const LoginBox = styled.div`
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
    padding: 14px 48px 14px 48px; /* Spazio per icone sinistra e destra */
    border: 2px solid #f1f5f9;
    border-radius: 16px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: #f8fafc;
    color: #1e293b;

    &::placeholder {
      color: #94a3b8;
    }

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

const ActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 0.875rem;

  a {
    color: #10b981;
    text-decoration: none;
    font-weight: 700;
    &:hover { text-decoration: underline; }
  }

  .checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #64748b;
    font-weight: 500;
    
    input { 
      margin-right: 10px; 
      accent-color: #10b981; 
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
`;

const CaptchaWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  transform: scale(0.85);
  overflow: hidden;
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

  &:active {
    transform: translateY(0);
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

const AuthMessage = styled(ErrorMessage)`
  background: #f0fdf4;
  color: #16a34a;
  border-color: #dcfce7;
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
    &:hover { text-decoration: underline; }
  }
`;

export default Form;