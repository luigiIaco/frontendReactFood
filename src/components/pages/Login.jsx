import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { login } from "../../service/users/users.service";
import Cookies from "js-cookie";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");

  useEffect(() => {
    const raw = Cookies.get("rememberCredential");
    if (raw) {
      const saved = JSON.parse(raw);
      setFormData({
        username: saved.username || "",
        password: saved.password || "",
        remember: false,
      });
    }
  }, []);

  const { message } = location.state || {};
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

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
      setError("Completa il reCAPTCHA per continuare.");
      return;
    }

    try {
      setLoading(true);
      const results = await login(formData.username, formData.password);
      localStorage.setItem("authToken", results.data);
      localStorage.setItem("user", JSON.stringify(results.user));

      if (formData.remember) {
        Cookies.set(
          "rememberCredential",
          JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
          { expires: 2 }
        );
      } else {
        Cookies.remove("rememberCredential");
      }

      setLoading(false);
      navigate("/home");
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {message && <AuthMessage>{message}</AuthMessage>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="checkbox-group mb-2">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />{" "}
              Ricordami
            </label>
            <Link to={"/forgotPassword"} style={{ float: "right" }}>
              Forgot password?
            </Link>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <ReCAPTCHA
              sitekey="6LfLHTYrAAAAAOFT32kF7AFYHKXsX_8j8hqmqYKk"
              onChange={handleCaptchaChange}
            />
          </div>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Accesso in corso..." : "Accedi"}
          </SubmitButton>
          <div className="footer">
            <p>
              Non hai un account? <Link to={"/register"}>Registrati</Link>
            </p>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  padding: 20px;
  transform: translateY(21%);

  .login-form {
    width: 100%;
    max-width: 400px;
    background-color: rgba(255, 255, 255, 0.2);
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
  }

  .login-form input[type="text"],
  .login-form input[type="password"] {
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

const ErrorMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #dc3545;
  color: white;
  border-radius: 5px;
  text-align: center;
`;

const AuthMessage = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgb(195, 220, 53);
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

export default Form;
