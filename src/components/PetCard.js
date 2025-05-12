// PetCard.js
import React from 'react';
import '../App.css';

function PetCard({ name, dob, age, image, adoptLink }) {
  return (
    <div className="pet-card">
      <img src={image} alt={name} className={image.includes('fallback') ? 'image-error' : ''} />
      <h3>{name}</h3>
      <p><strong>DOB:</strong> {dob}</p>
      <p><strong>Age:</strong> {age}</p>
      <button className="adopt-button" onClick={adoptLink}>Adopt</button>
    </div>
  );
}

export default PetCard;