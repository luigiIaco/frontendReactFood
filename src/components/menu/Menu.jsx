import React, { useState } from "react";
import { Link } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";
import { MdShoppingCartCheckout, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

const Menu = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { cartCount } = useContext(CartContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const username =
    JSON.parse(localStorage.getItem("user"))?.username || "utente";

  return (
    <>
      <WrapperButton>
        <IconButton
          as="button"
          onClick={() => setShowDialog(true)}
          title="Profilo"
        >
          <FaUserCircle />
        </IconButton>

        <div style={{ position: "relative" }}>
          {cartCount > 0 && (
            <IconButton as={Link} to="/cart" title="Vai al carrello">
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {cartCount}
              </span>
              <MdShoppingCartCheckout />
            </IconButton>
          )}

          {cartCount === 0 && <IconButton as={Link} to="/cart" title="Vai al carrello"><MdShoppingCartCheckout /></IconButton>}
        </div>
        <IconButton as="button" onClick={handleLogout} title="Logout">
          <MdLogout />
        </IconButton>
      </WrapperButton>

      {showDialog && (
        <Overlay onClick={() => setShowDialog(false)}>
          <DialogBox onClick={(e) => e.stopPropagation()}>
            <p>
              Sei autenticato come <strong>{username}</strong>
            </p>
            <CloseButton onClick={() => setShowDialog(false)}>
              Chiudi
            </CloseButton>
          </DialogBox>
        </Overlay>
      )}
      <Search />
      <SectionWrapper>
        <SectionTitle>📚 Categorie</SectionTitle>
        <Category />
      </SectionWrapper>
    </>
  );
};

const WrapperButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 16px;
  z-index: 10;
`;

const IconButton = styled.div`
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 9999px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #374151;

  &:hover {
    background-color: #e5e7eb;
    transform: scale(1.1);
    color: #111827;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const DialogBox = styled.div`
  background: white;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 16px;
  background-color: #374151;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #111827;
  }
`;

const SectionWrapper = styled.div`
  background-color: #f9fafb;
  margin: 24px auto;
  padding: 10px;
  border-radius: 12px;
  max-width: 800px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
  text-align: center;
`;

export default Menu;
