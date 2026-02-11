import React from "react";
import { Users, Heart, Leaf, UtensilsCrossed, ChevronLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Leaf className="text-emerald-600" size={28} />,
      title: "Ingredienti Bio",
      description: "Selezioniamo solo materie prime provenienti da agricoltura sostenibile e locale."
    },
    {
      icon: <Heart className="text-emerald-600" size={28} />,
      title: "Passione Vera",
      description: "Ogni ricetta è testata e amata dal nostro team prima di arrivare sulla vostra tavola."
    },
    {
      icon: <Users className="text-emerald-600" size={28} />,
      title: "Community",
      description: "Crediamo nel potere del cibo come collante sociale per unire le persone."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigazione */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-all mb-8 font-medium cursor-pointer"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          Torna alla Home
        </button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm">La nostra storia</span>
          <h1 className="text-5xl font-black text-slate-800 mt-4 mb-6 tracking-tight">
            Portiamo il gusto della <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              natura in cucina.
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Siamo nati con un'idea semplice: rendere la cucina di qualità accessibile a tutti, 
            senza scendere a compromessi con la salute e l'ambiente.
          </p>
        </div>

        {/* Immagine e Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-100 rounded-[3rem] -rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
              alt="Team in cucina" 
              className="relative rounded-[2.5rem] shadow-xl object-cover h-96 w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Perché lo facciamo?</h2>
            <p className="text-slate-600 leading-relaxed">
              Tutto è iniziato in una piccola cucina di provincia. Volevamo un modo per 
              trovare ingredienti genuini senza dover passare ore a leggere etichette indecipherabili.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Oggi, aiutiamo migliaia di persone a riscoprire il piacere di cucinare 
              piatti sani, veloci e incredibilmente saporiti.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-4 text-emerald-700 font-bold">
                <UtensilsCrossed size={20} />
                <span>Oltre 500+ Ricette Esclusive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Valori Card Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Finale */}
        <div className="bg-emerald-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500 rounded-full opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Pronto a cucinare con noi?</h2>
            <p className="mb-8 opacity-90 max-w-md mx-auto">
              Unisciti alla nostra community e ricevi ogni settimana nuovi spunti creativi.
            </p>
            <button 
              onClick={() => navigate('/cucina/italian')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              Esplora i Prodotti
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;