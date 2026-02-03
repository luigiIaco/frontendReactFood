import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { addCart } from "../service/recipes/recipes.service";
import { CartContext } from "../Context/CartContext";

const Card = ({ item, generaPrezzo, cartStatus, setCartStatus }) => {
  const [amount, setAmount] = useState(1);
  const { addItem } = useContext(CartContext);

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username;
    addItem(amount);
    addCart({
      username,
      product: item.title,
      amount,
      price: generaPrezzo(),
    });
    setCartStatus((prev) => ({ ...prev, [item.title]: "clicked" }));
    setTimeout(() => {
      setCartStatus((prev) => ({ ...prev, [item.title]: "init" }));
    }, 1000);
  };

  const limitaA20Lettere = (str) =>
    str.length > 20 ? str.slice(0, 24) + "..." : str;

  const increase = () => setAmount((prev) => prev + 1);
  const decrease = () => setAmount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <WrapperCard>
      {item && <p>{limitaA20Lettere(item.title)}</p>}
      {item && <img src={item.image} alt={item.title} />}

      {/* CONTATORE QUANTITÀ */}
      <QuantityWrapper>
        <button onClick={decrease}>-</button>
        <span>{amount}</span>
        <button onClick={increase}>+</button>
      </QuantityWrapper>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Link to={`/detail/${item.id}`}>
          <BiDetail />
        </Link>

        <div onClick={handleAddToCart} style={{ cursor: "pointer" }}>
          <motion.div
            initial={{ scale: 0.8, color: "#000" }}
            animate={
              cartStatus[item.title] === "clicked"
                ? { scale: 1.2, color: "#16a34a" }
                : { scale: 0.8, color: "#000" }
            }
            transition={{ duration: 0.5 }}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            <FaCartPlus />
          </motion.div>
        </div>
      </div>
    </WrapperCard>
  );
};

const QuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 6px;
  }

  span {
    margin: 0 12px;
    font-size: 16px;
    font-weight: bold;
  }
`;

const WrapperCard = styled.div`
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px auto;
  max-width: 350px;
  padding: 37px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 200px;
    border-radius: 12px;
  }

  p {
    text-align: center;
    color: #333;
    margin-top: 12px;
    position: relative;
    bottom: 15px;
  }

  svg {
    position: relative;
    top: 10px;
    width: 35px;
    height: 35px;
  }
`;

export default Card;
