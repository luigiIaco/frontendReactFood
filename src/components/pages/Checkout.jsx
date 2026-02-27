import React, { useState } from "react";
import styled from "styled-components";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  MapPin,
  User,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { removeAllCart } from "../../service/recipes/recipes.service";

const Checkout = () => {
  const bill = localStorage.getItem("total");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await removeAllCart({ username: username });
    navigate("/orderSummary");
  };

  return (
    <Container>
      <CheckoutGrid>
        {/* SEZIONE SINISTRA: FORM */}
        <FormSection>
          <Header>
            <h2>Checkout</h2>
            <p>Completa l'ordine inserendo i dati richiesti</p>
          </Header>

          <form onSubmit={handleSubmit}>
            <SectionTitle>
              <Truck size={20} /> Informazioni di Spedizione
            </SectionTitle>

            <InputGroup>
              <User size={18} className="input-icon" />
              <input
                type="text"
                name="fullName"
                placeholder="Nome Completo"
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup>
              <MapPin size={18} className="input-icon" />
              <input
                type="text"
                name="address"
                placeholder="Indirizzo"
                onChange={handleChange}
                required
              />
            </InputGroup>

            <Row>
              <InputGroup>
                <input
                  type="text"
                  name="city"
                  placeholder="Città"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup style={{ maxWidth: "120px" }}>
                <input
                  type="text"
                  name="zip"
                  placeholder="CAP"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Row>

            <SectionTitle>
              <CreditCard size={20} /> Dettagli di Pagamento
            </SectionTitle>

            <InputGroup>
              <CreditCard size={18} className="input-icon" />
              <input
                type="text"
                name="cardNumber"
                placeholder="Numero della Carta"
                onChange={handleChange}
                required
              />
            </InputGroup>

            <Row>
              <InputGroup>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/AA"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <input
                  type="password"
                  name="cvv"
                  placeholder="CVV"
                  onChange={handleChange}
                  required
                />
              </InputGroup>
            </Row>
            <SubmitButton type="submit">
              {loading ? (
                "Processando..."
              ) : (
                <>
                  Paga Ora
                  <ArrowRight size={20} style={{ marginLeft: "10px" }} />
                </>
              )}
            </SubmitButton>

            <SecurityTag>
              <ShieldCheck size={16} /> Pagamento crittografato e sicuro
            </SecurityTag>
          </form>
        </FormSection>

        {/* SEZIONE DESTRA: RIEPILOGO */}
        <SummarySection>
          <SummaryCard>
            <h3>
              <ShoppingBag size={20} /> Riepilogo Ordine
            </h3>
            <Divider />
            <ItemRow>
              <span>Spedizione</span>
              <span className="free">Gratis</span>
            </ItemRow>

            <Divider />

            <TotalRow>
              <span>Totale</span>
              <span>{bill}</span>
            </TotalRow>

            <PromoBox>
              <input type="text" placeholder="Codice Sconto" />
              <button type="button">Applica</button>
            </PromoBox>
          </SummaryCard>
        </SummarySection>
      </CheckoutGrid>
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: white;
  padding: 40px;
  border-radius: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  margin-bottom: 32px;
  h2 {
    font-size: 2rem;
    color: #0f172a;
    font-weight: 800;
  }
  p {
    color: #64748b;
    margin-top: 8px;
  }
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
  color: #1e293b;
  margin: 32px 0 20px 0;
  font-weight: 700;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 16px;
  width: 100%;

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
  }

  input {
    width: 100%;
    padding: 14px 16px 14px 48px;
    border: 2px solid #f1f5f9;
    border-radius: 16px;
    background: #f8fafc;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #10b981;
      background: white;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
    }
  }

  /* Rimuove il padding sinistro se non c'è icona */
  input:not([placeholder*="Nome"]):not([placeholder*="Indirizzo"]):not(
      [placeholder*="Numero"]
    ) {
    padding-left: 16px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 18px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  transition: all 0.3s;

  &:hover {
    background: #059669;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
  }
`;

const SecurityTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #64748b;
  font-size: 0.85rem;
  margin-top: 16px;
`;

const SummarySection = styled.div``;

const SummaryCard = styled.div`
  background: #1e293b;
  color: white;
  padding: 32px;
  border-radius: 32px;
  position: sticky;
  top: 40px;

  h3 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 24px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 20px 0;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #cbd5e1;

  .free {
    color: #10b981;
    font-weight: 700;
  }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 800;
  color: white;
`;

const PromoBox = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;

  input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 12px;
    color: white;
    &:focus {
      outline: none;
      border-color: #10b981;
    }
  }

  button {
    background: white;
    color: #1e293b;
    border: none;
    padding: 0 16px;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      background: #f1f5f9;
    }
  }
`;

// Riutilizzo lo styled Lock se non importato
const Lock = styled(CreditCard)``;

export default Checkout;
