import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils, Leaf, Bike, MapPin, Mail, Instagram, Facebook } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      
      {/* HERO SECTION: Sfondo curato e layout centrato */}
      <header className="relative bg-indigo-900 py-24 px-6 text-center overflow-hidden">
        {/* Overlay decorativo per dare profondità */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Sito di <span className="text-indigo-400">Cibo</span>
          </h1>
          <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
            La tradizione culinaria, consegnata con amore direttamente a casa tua.
          </p>
          <Link 
            to="/cucina/italian" 
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl"
          >
            Esplora il Menù
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">

        {/* MISSIONE: Bordo sfumato (Gradient Border) */}
        <section className="relative p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
          <div className="bg-white rounded-[22px] p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-6 flex justify-center items-center gap-2">
              <Utensils className="text-indigo-500" /> La Nostra Missione
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Siamo nati con l'idea di connettere i piccoli produttori locali con chi ama il buon cibo. 
              Ogni ingrediente è tracciato e selezionato per garantirti il massimo della freschezza.
            </p>
          </div>
        </section>

        {/* FEATURES: Card con icone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Leaf className="text-green-500" />, title: "100% Bio", desc: "Solo prodotti certificati" },
            { icon: <Bike className="text-blue-500" />, title: "Consegna Eco", desc: "Rispettiamo l'ambiente" },
            { icon: <Utensils className="text-orange-500" />, title: "Chef Esperti", desc: "Passione in ogni piatto" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CONTATTI: Stile Glassmorphism leggero */}
        <section className="bg-white border border-gray-200 rounded-3xl p-10 shadow-sm" id='contatti'>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Dove Trovarci</h2>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center gap-3">
                  <MapPin size={20} className="text-indigo-500" /> Via Roma 123, Milano
                </p>
                <p className="flex items-center gap-3">
                  <Mail size={20} className="text-indigo-500" /> supporto@sitodicibo.it
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6">
              <h3 className="font-semibold text-gray-400 uppercase tracking-widest text-sm">Seguici sui social</h3>
              <div className="flex gap-4">
                <button className="p-4 bg-gray-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                  <Instagram size={24} />
                </button>
                <button className="p-4 bg-gray-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                  <Facebook size={24} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;