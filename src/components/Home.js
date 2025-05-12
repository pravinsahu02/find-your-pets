// Home.js
import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
  const [featuredPets, setFeaturedPets] = useState([
    { name: 'Fluffy', image: '', loading: true },
    { name: 'Bruno', image: '', loading: true },
    { name: 'Luna', image: '', loading: true },
  ]);
  const [whyAdoptImage, setWhyAdoptImage] = useState({ image: '', loading: true });
  const [carouselImages, setCarouselImages] = useState(
    Array(10).fill().map((_, index) => ({ id: index, image: '', loading: true }))
  );

  const fallbackImage = 'https://picsum.photos/300/200?dog,fallback';

  // Fetch featured pets images
  const fetchFeaturedImages = async (pets) => {
    const newPets = [...pets];
    for (let i = 0; i < newPets.length; i++) {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data.status === 'success' && data.message) {
          newPets[i] = { ...newPets[i], image: data.message, loading: false };
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error(`Error fetching featured pet ${i + 1}:`, error);
        newPets[i] = { ...newPets[i], image: fallbackImage, loading: false };
      }
    }
    return newPets;
  };

  // Fetch why adopt image
  const fetchWhyAdoptImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      if (data.status === 'success' && data.message) {
        return { image: data.message, loading: false };
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching why adopt image:', error);
      return { image: fallbackImage, loading: false };
    }
  };

  // Fetch carousel images
  const fetchCarouselImages = async (images) => {
    const newImages = [...images];
    for (let i = 0; i < newImages.length; i++) {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await response.json();
        if (data.status === 'success' && data.message) {
          newImages[i] = { ...newImages[i], image: data.message, loading: false };
        } else {
          throw new Error('Invalid API response');
        }
      } catch (error) {
        console.error(`Error fetching carousel image ${i + 1}:`, error);
        newImages[i] = { ...newImages[i], image: fallbackImage, loading: false };
      }
    }
    return newImages;
  };

  useEffect(() => {
    const loadImages = async () => {
      const newFeaturedPets = await fetchFeaturedImages(featuredPets);
      const newWhyAdoptImage = await fetchWhyAdoptImage();
      const newCarouselImages = await fetchCarouselImages(carouselImages);

      setFeaturedPets(newFeaturedPets);
      setWhyAdoptImage(newWhyAdoptImage);
      setCarouselImages(newCarouselImages);
    };

    loadImages();
  }, []);

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Your perfect furry friend is just a click away!</h1>
        <p>Adopt, don't shop. Give a homeless dog the love it deserves.</p>
        <div className="featured-pets">
          {featuredPets.map((pet, index) => (
            <div key={index} className="featured-pet">
              {pet.loading ? (
                <div className="image-loading"></div>
              ) : (
                <img src={pet.image} alt={pet.name} className={pet.image === fallbackImage ? 'image-error' : ''} />
              )}
              <h4>{pet.name}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="why-adopt-section">
        <h2>Why Adopt a Dog?</h2>
        {whyAdoptImage.loading ? (
          <div className="image-loading"></div>
        ) : (
          <img
            src={whyAdoptImage.image}
            alt="Why adopt a dog"
            className={`why-adopt-image ${whyAdoptImage.image === fallbackImage ? 'image-error' : ''}`}
          />
        )}
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
          {[...carouselImages, ...carouselImages].map((item, index) => (
            <Link key={`${item.id}-${index}`} to="/pets">
              {item.loading ? (
                <div className="image-loading"></div>
              ) : (
                <img
                  src={item.image}
                  alt={`Dog ${item.id + 1}`}
                  className={`carousel-image ${item.image === fallbackImage ? 'image-error' : ''}`}
                />
              )}
            </Link>
          ))}
        </div>
        <Link to="/pets" className="view-more-link">View All Dogs</Link>
      </section>
    </div>
  );
}

export default Home;