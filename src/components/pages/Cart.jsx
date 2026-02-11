// @ts-nocheck
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete, MdOutlineShoppingCart } from "react-icons/md";
import { ChevronLeft, Trash2, ShoppingBag } from "lucide-react";
import { 
  getCart, 
  removeCartById, 
  removeAllCart 
} from "../../service/recipes/recipes.service";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;
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
      await removeAllCart({ username: username });
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
  }, [username, setCartCount]);

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
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Navigazione */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/cucina/italian"
            className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all font-medium"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Continua lo shopping
          </Link>
          
          {cart.data?.products?.length > 0 && (
            <button
              onClick={handleRemoveAll}
              className="flex items-center gap-2 text-red-400 hover:text-red-600 text-sm font-semibold transition-colors cursor-pointer"
            >
              <Trash2 size={16} />
              Svuota tutto
            </button>
          )}
        </div>

        {/* Card Principale Carrello */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl">
                <ShoppingBag size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-800">Il tuo Carrello</h2>
            </div>

            {/* Lista Prodotti */}
            {!cart.data?.products || cart.data.products.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdOutlineShoppingCart size={40} className="text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">Il tuo carrello è deserto...</p>
                <Link to="/cucina/italian" className="text-emerald-600 hover:underline mt-2 inline-block">
                  Aggiungi qualcosa di delizioso!
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.data.products.map((item) => (
                  <li
                    key={item._id}
                    className="group flex items-center justify-between p-4 bg-slate-50 hover:bg-white hover:shadow-md hover:ring-1 hover:ring-emerald-100 rounded-2xl transition-all duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {item.product}
                      </h3>
                      <div className="flex gap-4 mt-1 text-sm text-slate-500">
                        <span className="font-medium text-emerald-600">{item.price.toFixed(2)}€</span>
                        <span>Quantità: <b className="text-slate-700">{item.amount}</b></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Input Quantità Custom */}
                      <input
                        type="number"
                        min="1"
                        max={item.amount}
                        defaultValue="1"
                        className="w-14 px-2 py-1.5 bg-white border border-slate-200 rounded-xl text-center text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                        onChange={(e) => (item.toRemove = parseInt(e.target.value))}
                      />
                      
                      {/* Tasto Rimuovi */}
                      <button
                        onClick={() => handleRemoveById(item)}
                        className="p-2.5 bg-white text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl border border-slate-100 transition-all shadow-sm cursor-pointer"
                        title="Rimuovi prodotto"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Footer Carrello */}
            {cart.data?.products?.length > 0 && (
              <div className="mt-10 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Totale Ordine</p>
                    <p className="text-4xl font-black text-slate-800">
                      {total.toFixed(2)}<span className="text-emerald-500 text-2xl ml-1">€</span>
                    </p>
                  </div>
                  
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center gap-2">
                    Procedi al Checkout
                    <FaArrowRightLong />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}