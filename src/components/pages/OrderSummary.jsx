import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Truck,
  Calendar,
  Hash,
  ArrowLeft,
  Download,
} from "lucide-react";

const OrderSummary = () => {
  let billSummary = localStorage.getItem("total");
  // Questi dati solitamente arriverebbero dallo stato globale o dal backend
  const orderDetails = {
    orderNumber: "ORD-99281",
    date: "19 Febbraio 2026",
    total: "45,00 €",
    status: "In elaborazione",
    items: [
      { id: 1, name: "Pizza Gourmet Smeraldo", price: "15,00 €", qty: 2 },
      { id: 2, name: "Vino Bianco della Casa", price: "15,00 €", qty: 1 },
    ],
  };

  return (
    <Container>
      <SuccessCard>
        <StatusHeader>
          <div className="icon-badge">
            <CheckCircle2 size={40} />
          </div>
          <h2>Pagamento Riuscito!</h2>
          <p>Grazie per il tuo acquisto. Il tuo ordine è in viaggio.</p>
        </StatusHeader>

        <DetailsGrid>
          <InfoBox>
            <div className="info-item">
              <Hash size={18} />
              <div>
                <label>Numero Ordine</label>
                <span>{orderDetails.orderNumber}</span>
              </div>
            </div>
            <div className="info-item">
              <Calendar size={18} />
              <div>
                <label>Data</label>
                <span>{orderDetails.date}</span>
              </div>
            </div>
          </InfoBox>

          <InfoBox>
            <div className="info-item">
              <Truck size={18} />
              <div>
                <label>Metodo Spedizione</label>
                <span>Consegna Express (24/48h)</span>
              </div>
            </div>
            <div className="info-item">
              <Package size={18} />
              <div>
                <label>Stato Ordine</label>
                <span className="status-tag">{orderDetails.status}</span>
              </div>
            </div>
          </InfoBox>
        </DetailsGrid>

        <ReceiptSection>
          <TotalRow>
            <span>Totale Pagato</span>
            <span>{billSummary}</span>
          </TotalRow>
        </ReceiptSection>

        <ButtonGroup>
          <Link to="/home" className="btn-primary">
            Vai alla Home
          </Link>
          <button className="btn-secondary" onClick={() => window.print()}>
            <Download size={18} /> Scarica Ricevuta
          </button>
        </ButtonGroup>

        <FooterLink>
          <Link to="/cucina/italian">
            <ArrowLeft size={16} /> Torna ad acquistare
          </Link>
        </FooterLink>
      </SuccessCard>
    </Container>
  );
};

// --- STYLED COMPONENTS ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const SuccessCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;

  @media (max-width: 500px) {
    padding: 24px;
  }
`;

const StatusHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;

  .icon-badge {
    width: 80px;
    height: 80px;
    background: #f0fdf4;
    color: #10b981;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  h2 {
    font-size: 1.75rem;
    color: #0f172a;
    font-weight: 800;
  }
  p {
    color: #64748b;
    margin-top: 8px;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  background: #f8fafc;
  padding: 20px;
  border-radius: 20px;

  .info-item {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    color: #1e293b;

    &:last-child {
      margin-bottom: 0;
    }

    svg {
      color: #94a3b8;
      margin-top: 3px;
    }

    label {
      display: block;
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
    }

    span {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .status-tag {
      color: #10b981;
      font-weight: 700;
    }
  }
`;

const ReceiptSection = styled.div`
  border: 2px dashed #f1f5f9;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;

  h3 {
    font-size: 1rem;
    color: #0f172a;
    margin-bottom: 16px;
    font-weight: 700;
  }
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.95rem;

  .item-info {
    display: flex;
    gap: 8px;
    .qty {
      font-weight: 700;
      color: #10b981;
    }
    .name {
      color: #1e293b;
    }
  }
  .price {
    font-weight: 600;
    color: #0f172a;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #f1f5f9;
  margin: 16px 0;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  .btn-primary {
    flex: 2;
    background: #10b981;
    color: white;
    text-decoration: none;
    text-align: center;
    padding: 16px;
    border-radius: 16px;
    font-weight: 700;
    transition: all 0.2s;
    &:hover {
      background: #059669;
      transform: translateY(-2px);
    }
  }

  .btn-secondary {
    flex: 1;
    background: #f1f5f9;
    color: #475569;
    border: none;
    border-radius: 16px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
    &:hover {
      background: #e2e8f0;
    }
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

const FooterLink = styled.div`
  text-align: center;
  a {
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    &:hover {
      color: #10b981;
    }
  }
`;

export default OrderSummary;
