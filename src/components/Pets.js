// Pets.js
import React, { useState, useEffect } from 'react';
import PetCard from './PetCard';
import '../App.css';

// Utility function to generate random DOB (between 2018 and 2024)
const generateRandomDOB = () => {
  const start = new Date(2018, 0, 1);
  const end = new Date(2024, 11, 31);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// Utility function to calculate age from DOB
const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return `${age} ${age === 1 ? 'year' : 'years'}`;
};

function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // List of 25 unique dog names
  const dogNames = [
    'Max', 'Bella', 'Charlie', 'Lucy', 'Cooper', 'Luna', 'Buddy', 'Daisy',
    'Rocky', 'Molly', 'Duke', 'Sadie', 'Tucker', 'Zoe', 'Jake', 'Chloe',
    'Bear', 'Sophie', 'Milo', 'Maggie', 'Oliver', 'Lily', 'Rusty', 'Pepper', 'Finn'
  ];

  useEffect(() => {
    const fetchDogImages = async () => {
      setLoading(true);
      const newPets = [];
      const fallbackImage = 'https://picsum.photos/300/200?dog,fallback';

      for (let i = 0; i < 25; i++) {
        try {
          const response = await fetch('https://dog.ceo/api/breeds/image/random');
          const data = await response.json();
          if (data.status === 'success' && data.message) {
            const dob = generateRandomDOB();
            newPets.push({
              name: dogNames[i],
              dob: dob,
              age: calculateAge(dob),
              image: data.message,
              adoptLink: '#',
            });
          } else {
            throw new Error('Invalid API response');
          }
        } catch (error) {
          console.error(`Error fetching image for pet ${i + 1}:`, error);
          const dob = generateRandomDOB();
          newPets.push({
            name: dogNames[i],
            dob: dob,
            age: calculateAge(dob),
            image: fallbackImage,
            adoptLink: '#',
          });
        }
      }

      setPets(newPets);
      setLoading(false);
    };

    fetchDogImages();
  }, []);

  const handleAdoptClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPet(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Adoption inquiry submitted:', {
      pet: selectedPet.name,
      ...formData,
    });
    handleCloseModal();
  };

  return (
    <div className="pets-container">
      <h1>Available Dogs</h1>
      <div className="pets-grid">
        {loading
          ? Array(25).fill().map((_, index) => (
              <div key={index} className="pet-card">
                <div className="image-loading"></div>
                <h3>Loading...</h3>
                <p><strong>DOB:</strong> Loading...</p>
                <p><strong>Age:</strong> Loading...</p>
                <button className="adopt-button" disabled>Adopt</button>
              </div>
            ))
          : pets.map((pet, index) => (
              <PetCard
                key={index}
                name={pet.name}
                dob={pet.dob}
                age={pet.age}
                image={pet.image}
                adoptLink={() => handleAdoptClick(pet)}
              />
            ))}
      </div>

      {showModal && (
        <div className="adoption-modal">
          <div className="adoption-modal-content">
            <button className="modal-close-button" onClick={handleCloseModal}>
              ×
            </button>
            <h2>Adopt {selectedPet?.name}</h2>
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                aria-required="true"
              />
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Why would you like to adopt this dog?"
              />
              <button type="submit">Submit Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pets;