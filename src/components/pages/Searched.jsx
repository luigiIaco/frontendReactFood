import React, { useEffect, useState, useCallback } from "react";
import Loader from "../../ui/Loader";
import Card from "../../ui/Card";
import _ from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { getCousineComplexSearch } from "../../service/recipes/recipes.service";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Search, ArrowLeft } from "lucide-react";

const Searched = () => {
  const { searchValue } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [cartStatus, setCartStatus] = useState({});

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps',
    dragFree: true 
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    const getSearch = async () => {
      setLoading(true);
      const data = await getCousineComplexSearch(10, "", searchValue);
      setLoading(false);
      if (data && data.results) {
        setResults(data.results);
      }
    };
    getSearch();
  }, [searchValue]);

  const generaPrezzo = () => Number((Math.random() * (50 - 5) + 5).toFixed(2));

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header di Ricerca */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-emerald-500 hover:border-emerald-200 transition-all cursor-pointer"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-emerald-600 font-bold uppercase tracking-widest text-[10px] mb-1">
                Risultati della ricerca
              </p>
              <h1 className="text-3xl font-black text-slate-800 flex items-center gap-2 italic">
                <Search className="text-slate-300" size={28} />
                "{_.capitalize(searchValue)}"
              </h1>
            </div>
          </div>
          
          <div className="bg-white px-6 py-2 rounded-2xl shadow-sm border border-slate-100">
            <span className="text-slate-400 font-medium">Trovati: </span>
            <span className="text-emerald-600 font-black">{results.length} piatti</span>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="relative group">
            {/* Pulsanti Navigazione Esterni */}
            <button 
              onClick={scrollPrev}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6 py-4"> 
                {results.map((item) => (
                  <div key={item.id} className="flex-[0_0_85%] md:flex-[0_0_30%] min-w-0">
                    <div className="transform transition-transform duration-300 hover:scale-[1.02]">
                      <Card
                        item={item}
                        generaPrezzo={generaPrezzo}
                        cartStatus={cartStatus}
                        setCartStatus={setCartStatus}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={scrollNext}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-xl border border-slate-100 text-slate-600 hover:bg-emerald-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Nessun risultato</h2>
            <p className="text-slate-500">Non abbiamo trovato piatti corrispondenti a "{searchValue}".</p>
            <button 
              onClick={() => navigate("/home")}
              className="mt-8 text-emerald-600 font-bold hover:underline"
            >
              Torna a esplorare il menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searched;