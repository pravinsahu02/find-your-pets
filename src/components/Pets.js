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

  return (
    <div className="pets-container">
      <h1>Available Dogs</h1>
      <div className="pets-grid">
        {loading
          ? Array(25).fill().map((_, index) => (
              <div key={index} className="pet-card">
                <div className="pet-card-loading"></div>
                <h3>Loading...</h3>
                <p><strong>DOB:</strong> Loading...</p>
                <p><strong>Age:</strong> Loading...</p>
                <a href="#" className="adopt-button">Adopt</a>
              </div>
            ))
          : pets.map((pet, index) => (
              <PetCard
                key={index}
                name={pet.name}
                dob={pet.dob}
                age={pet.age}
                image={pet.image}
                adoptLink={pet.adoptLink}
              />
            ))}
      </div>
    </div>
  );
}

export default Pets;