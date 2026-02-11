import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, ChefHat } from "lucide-react";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  return (
    <nav className="relative top-0 left-0 right-0 w-full bg-slate-900 border-b border-slate-800 shadow-xl z-50">
      <div className="max-w mx-10">
        <div className="flex justify-between items-center h-16">
          {/* LATO SINISTRO: Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/home")}
          >
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:bg-emerald-400 transition-colors">
              <ChefHat className="text-slate-900" size={24} />
            </div>
            <span className="text-white font-black tracking-tighter text-xl hidden sm:block">
              FOOD<span className="text-emerald-500">APP</span>
            </span>
          </div>

          {/* CENTRO: Link di Navigazione */}
          <div className="hidden md:flex items-center gap-8">
            <HashLink
              smooth
              to="/cucina/italian#prodotti"
              className="text-slate-300 hover:text-emerald-400 font-medium transition-all duration-200 text-sm tracking-wide"
            >
              Prodotti
            </HashLink>

            <Link
              to="/aboutUs"
              className="text-slate-300 hover:text-emerald-400 font-medium transition-all duration-200 text-sm tracking-wide"
            >
              About Us
            </Link>
            <HashLink
              smooth
              to="/home#contatti"
              className="text-slate-300 hover:text-emerald-400 font-medium transition-all duration-200 text-sm tracking-wide"
            >
              Contatti
            </HashLink>
          </div>

          {/* LATO DESTRO: Logout e Profilo */}
          {authToken ? (
            <div className="flex items-center gap-2 sm:gap-6">
              {/* Profilo */}
              <div
                className="group flex items-center gap-3 cursor-pointer py-1.5 pl-1.5 pr-3 hover:border-emerald-500/50 transition-all"
                onClick={() => navigate("/userProfile")}
              >
                <div className="relative">
                  <img
                    src={user?.linkAvatar || "https://via.placeholder.com/150"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-slate-600 group-hover:border-emerald-500 transition-all object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                </div>
              </div>

              {/* Logout */}
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  navigate("/login");
                }}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            /* Se non loggato, mostra tasto Login */
            <button
              onClick={() => navigate("/login")}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 px-5 py-2 rounded-xl font-bold text-sm transition-all"
            >
              Accedi
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
