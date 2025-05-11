// PetCard.js
import React from 'react';
import '../App.css';

function PetCard({ name, dob, age, image, adoptLink }) {
  return (
    <div className="pet-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p><strong>DOB:</strong> {dob}</p>
      <p><strong>Age:</strong> {age}</p>
      <a href={adoptLink} target="_blank" rel="noopener noreferrer" className="adopt-button">Adopt</a>
    </div>
  );
}

export default PetCard;