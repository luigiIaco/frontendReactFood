import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipesInformation } from "../../service/recipes/recipes.service";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../ui/Loader";
import { ChevronLeft, BookOpen, FileText, Timer, Users } from "lucide-react";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("instructions");

  useEffect(() => {
    const getDetails = async () => {
      setLoading(true);
      const data = await getRecipesInformation(id);
      if (data) setInformation(data);
      setLoading(false);
    };
    getDetails();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {information && (
        <div className="max-w-6xl mx-auto px-4 pt-8">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold mb-8 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} /> Torna ai risultati
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Sinistra: Immagine e Info Rapide */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="relative">
                <div className="absolute -inset-2 bg-emerald-100 rounded-[3rem] rotate-2 scale-95 opacity-50"></div>
                <img
                  src={information.image}
                  alt={information.title}
                  className="relative w-full aspect-square object-cover rounded-[2.5rem] shadow-2xl border-4 border-white"
                />
              </div>

              <div className="flex justify-center gap-8 p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                <div className="text-center">
                  <Timer className="mx-auto text-emerald-500 mb-1" size={24} />
                  <p className="text-xs text-slate-400 font-bold uppercase">Tempo</p>
                  <p className="font-bold text-slate-700">{information.readyInMinutes || "--"} min</p>
                </div>
                <div className="h-10 w-[1px] bg-slate-100"></div>
                <div className="text-center">
                  <Users className="mx-auto text-emerald-500 mb-1" size={24} />
                  <p className="text-xs text-slate-400 font-bold uppercase">Porzioni</p>
                  <p className="font-bold text-slate-700">{information.servings || "--"}</p>
                </div>
              </div>
            </motion.div>

            {/* Destra: Titolo e Tab Content */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <h1 className="text-4xl font-black text-slate-800 leading-tight mb-6">
                {information.title}
              </h1>

              {/* Tab Switcher */}
              <div className="flex p-1 bg-slate-200/50 rounded-2xl mb-8 w-fit">
                <button
                  onClick={() => setTab("instructions")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                    tab === "instructions" 
                    ? "bg-white text-emerald-600 shadow-sm scale-105" 
                    : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <BookOpen size={18} /> Istruzioni
                </button>
                <button
                  onClick={() => setTab("summary")}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all cursor-pointer ${
                    tab === "summary" 
                    ? "bg-white text-emerald-600 shadow-sm scale-105" 
                    : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <FileText size={18} /> Sommario
                </button>
              </div>

              {/* Animated Content Area */}
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="prose prose-slate prose-emerald max-w-none"
                  >
                    {tab === "instructions" ? (
                      <div 
                        className="text-slate-600 leading-relaxed font-medium"
                        dangerouslySetInnerHTML={{ __html: information.instructions }} 
                      />
                    ) : (
                      <div 
                        className="text-slate-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: information.summary }} 
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Details;