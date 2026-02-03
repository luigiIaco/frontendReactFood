import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      {/* Header Aziendale */}
      <header className="hero-section" style={{textAlign:"center"}}>
        <h1 className="main-title">Sito di Cibo</h1>
        <p className="subtitle">La tradizione culinaria, consegnata con amore.</p>
        
        {/* AGGIUNTO: Link ai prodotti */}
        <Link to="/cucina/italian" className="btn-vai-prodotti">
          Vedi i nostri prodotti
        </Link>
      </header>

      {/* Card "Chi Siamo" */}
      <section className="info-card section-about">
        <h2>La Nostra Missione</h2>
        <p>
          Siamo nati con l'idea di connettere i piccoli produttori locali con chi ama il buon cibo. 
          Ogni ingrediente che vedi nel nostro menù è tracciato e selezionato per garantirti 
          il massimo della freschezza.
        </p>
      </section>

      {/* Sezione Caratteristiche */}
      <div className="features-wrapper">
        <div className="feature-item">
          <div className="icon-circle">🌱</div>
          <h3>100% Bio</h3>
        </div>
        <div className="feature-item">
          <div className="icon-circle">🚴</div>
          <h3>Consegna Eco</h3>
        </div>
        <div className="feature-item">
          <div className="icon-circle">👨‍🍳</div>
          <h3>Chef Esperti</h3>
        </div>
      </div>

      {/* Footer Contatti */}
      <section className="info-card contact-section">
        <h2>Dove Trovarci</h2>
        <p>📍 Via Roma 123, Milano</p>
        <p>📧 supporto@sitodicibo.it</p>
        <div className="social-links">
          <span>Instagram</span> | <span>Facebook</span>
        </div>
      </section>
    </div>
  );
};

export default Home;