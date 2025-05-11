// Home.js
import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Your perfect furry friend is just a click away!</h1>
        <p>Adopt, don't shop. Give a homeless dog the love it deserves.</p>
        <div className="featured-pets">
          <div className="featured-pet">
            <img src="https://picsum.photos/200/160?dog,fluffy" alt="Fluffy" />
            <h4>Fluffy</h4>
          </div>
          <div className="featured-pet">
            <img src="https://picsum.photos/200/160?dog,bruno" alt="Bruno" />
            <h4>Bruno</h4>
          </div>
          <div className="featured-pet">
            <img src="https://picsum.photos/200/160?dog,luna" alt="Luna" />
            <h4>Luna</h4>
          </div>
        </div>
      </section>

      <section className="why-adopt-section">
        <h2>Why Adopt a Dog?</h2>
        <img src="https://picsum.photos/300/200?dog,adopt" alt="Why adopt a dog" className="why-adopt-image" />
        <ul>
          <li>Save a dog's life and reduce shelter overcrowding</li>
          <li>Enjoy loyal companionship and endless tail wags</li>
          <li>Promote ethical treatment of dogs</li>
        </ul>
      </section>

      <section className="pet-facts-section">
        <h2>Fun Dog Facts</h2>
        <div className="facts-grid">
          <div className="fact-card">Dogs can understand up to 250 words!</div>
          <div className="fact-card">Dogs love to play fetch and cuddle.</div>
          <div className="fact-card">Adopting a dog helps reduce stress.</div>
        </div>
      </section>

      <section className="carousel-section">
        <h2>More Adorable Dogs</h2>
        <div className="carousel-track">
          <Link to="/pets">
            <img src="https://picsum.photos/180/140?dog,1" className="carousel-image" alt="dog1" />
          </Link>
          <Link to="/pets">
            <img src="https://picsum.photos/180/140?dog,2" className="carousel-image" alt="dog2" />
          </Link>
          <Link to="/pets">
            <img src="https://picsum.photos/180/140?dog,3" className="carousel-image" alt="dog3" />
          </Link>
          <Link to="/pets">
            <img src="https://picsum.photos/180/140?dog,4" className="carousel-image" alt="dog4" />
          </Link>
          <Link to="/pets">
            <img src="https://picsum.photos/180/140?dog,5" className="carousel-image" alt="dog5" />
          </Link>
        </div>
        <Link to="/pets" className="view-more-link">View All Dogs</Link>
      </section>
    </div>
  );
}

export default Home;