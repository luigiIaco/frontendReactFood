import React from "react";
import { ChevronLeft, MapPin, LinkIcon, Mail, ShieldCheck, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Top Navigation Bar */}
        <div className="flex justify-between items-center mb-6">
          {/* Bottone Indietro */}
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all duration-200 font-medium cursor-pointer"
          >
            <ChevronLeft
              size={24}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            Torna indietro
          </button>

          {/* Bottone Carrello */}
          <button
            onClick={() => navigate("/cart")} // Assicurati che il path sia corretto
            className="relative group flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl shadow-sm hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200 font-medium cursor-pointer"
          >
            <ShoppingCart size={20} />
            <span>Carrello</span>
          </button>
        </div>

        {/* Card Profilo Principale */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header/Cover */}
          <div className="h-40 bg-gradient-to-r from-emerald-500 to-teal-400 relative">
            <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider border border-white/30">
              Membro Premium
            </div>
          </div>

          <div className="px-8 pb-10">
            {/* Avatar */}
            <div className="relative flex justify-center -mt-20 mb-6">
              <div className="p-1.5 bg-white rounded-full shadow-lg">
                <img
                  src={user.linkAvatar}
                  alt="Profile"
                  className="w-36 h-36 rounded-full border-4 border-slate-50 object-cover bg-emerald-50"
                />
              </div>
            </div>

            {/* Info Principali */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
                  {user.username}
                </h2>
                <ShieldCheck size={22} className="text-emerald-500" />
              </div>

              <div className="max-w-lg mx-auto">
                <p className="text-slate-600 leading-relaxed italic">
                  "Appassionato di cucina e tecnologia. Mi piace sperimentare nuove ricette 
                  e condividere la mia passione con il mondo."
                </p>
              </div>

              <hr className="w-16 mx-auto border-emerald-100 border-2 rounded-full my-6" />

              {/* Dettagli di Contatto / Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-sm text-slate-700 font-medium truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <LinkIcon size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase">Website</p>
                    <a href={`https://${user.username}.com`} className="text-sm text-emerald-600 font-medium hover:underline">
                      {user.username}.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors md:col-span-2">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MapPin size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                    <p className="text-sm text-slate-700 font-medium text-pretty">
                      Italia, Pianeta Terra
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;