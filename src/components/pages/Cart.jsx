// @ts-nocheck
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import styled from "styled-components";
import {
  getCart,
  removeCartById,
  removeAllCart,
} from "../../service/recipes/recipes.service";
import { MdDelete } from "react-icons/md";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const { setCartCount } = useContext(CartContext);

  const handleRemoveById = async (item) => {
    const quantityToRemove = item.toRemove || 1;
    try {
      await removeCartById({
        cartId: cart.data._id,
        productId: item._id,
        quantityToRemove,
      });
      window.location.reload();
    } catch (error) {
      console.error("Errore durante la rimozione:", error);
    }
  };

  const handleRemoveAll = async () => {
    try {
      await removeAllCart({
        username: username,
      });
      window.location.reload();
    } catch (error) {
      console.error("Errore durante la rimozione:", error);
    }
  };

  useEffect(() => {
    setCartCount(0);
    const getProductsCart = async () => {
      const result = await getCart(username);
      setCart(result);
    };

    getProductsCart();
  }, []);

  useEffect(() => {
    let progressiveTotal = 0;
    if (cart.data?.products) {
      cart.data.products.forEach((element) => {
        progressiveTotal += element.price * element.amount;
      });
      setTotal(progressiveTotal);
    }
  }, [cart]);

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
        <HeaderCart>
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          🛒 Il tuo Carrello
        </h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 p-2 rounded shadow"
          onClick={() => handleRemoveAll()}
        >
          Svuota carrello
        </button>
        </HeaderCart>

        {cart.data?.products?.length === 0 && (
          <p className="text-center text-gray-500">Il carrello è vuoto.</p>
        )}

        <ul>
          {cart.data?.products?.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between py-4 px-4 border rounded-lg mb-4 shadow-sm"
            >
              <div>
                <p className="font-medium text-gray-800">{item.product}</p>
                <p className="text-sm text-gray-500">{item.price}€</p>
                <p className="text-sm text-gray-500">Quantità: {item.amount}</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max={item.amount}
                  defaultValue="1"
                  className="w-16 px-2 py-1 border rounded text-sm"
                  onChange={(e) => (item.toRemove = parseInt(e.target.value))}
                />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 p-2 rounded shadow"
                  onClick={() => handleRemoveById(item)}
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-semibold text-gray-700">
            Totale: <span className="text-green-600">{total}€</span>
          </p>
        </div>
      </div>
      <RedirectWrapper>
        <Link to={"/cucina/italian"}>Torna ai prodotti</Link> <FaArrowRightLong />
      </RedirectWrapper>
    </>
  );
}

const RedirectWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  svg {
    margin-top: 4px;
    margin-left: 6px;
  }  
`;

const HeaderCart = styled.div`
  display: flex;
  justify-content: space-between;
  button {
  cursor:pointer;
  position:relative;
  bottom:7px;
}
`
